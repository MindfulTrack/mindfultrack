// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS = {
  "credentials": async (user, account, profile, email, credentials) => {
    return true;
  },
  "google": async (user, account, profile, email, credentials) => {
    try {
      const response = await axios({
        method: "post",
        url: process.env.NEXTAUTH_BACKEND_URL + "auth/google/",
        data: {
          access_token: account["access_token"],
          id_token: account["id_token"]
        },
      });
      console.log(response)
      account["meta"] = response.data;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    //   }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username/Email", type: "text"},
        password: {label: "Password", type: "password"}
      },
      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials, req) {
        // console.log(credentials)
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/login/",
            method: "post",
            data: credentials,
            headers: {
              'Content-Type': 'application/json'}
          });
          console.log(response)
          const data = response.data;
          console.log(data)
          if (data) return data;
        } catch (error) {
          console.log(error.response.data.non_field_errors);
          console.log(error.response.data.non_field_errors[0])
          // console.error(error);
          return {'error': error.response.data.non_field_errors[0]}
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      console.log("START\n\n\n\n")
      console.log(user)
      console.log("END\n\n\n\n")
      if (user['error']){
        return '/signin/'+user['error']
      }
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      
      return SIGN_IN_HANDLERS[account.provider](
        user, account, profile, email, credentials
      );
    },
    async jwt({user, token, account}) {
      // If `user` and `account` are set that means it is a login event
      console.log(token)   

      if (user && account) {
        let backendResponse = account.provider === "credentials" ? user : account.meta;
        console.log(backendResponse)
        token["user"] = backendResponse.user;
        token["access_token"] = backendResponse.access;
        token["refresh_token"] = backendResponse.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        
        return token;
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > token["ref"]) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          data: {
            refresh: token["refresh_token"],
          },
        });
        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({token}) {
      return token;
    },
    // async redirect({ url, baseUrl }) {
    //   const isRelativeUrl = url.startsWith("/");
    //   if (isRelativeUrl) {
    //     return `${baseUrl}${url}`;
    //   }

    //   const isSameOriginUrl = new URL(url).origin === baseUrl;
    //   const alreadyRedirected = url.includes('callbackUrl=')
    //   if (isSameOriginUrl && alreadyRedirected) {
    //     const originalCallbackUrl = decodeURIComponent(url.split('callbackUrl=')[1]);

    //     return originalCallbackUrl;
    //   }

    //   if (isSameOriginUrl) {
    //     return url;
    //   }

    //   return baseUrl;
    // }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};