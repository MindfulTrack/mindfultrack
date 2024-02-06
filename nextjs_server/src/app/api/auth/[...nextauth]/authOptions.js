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
      account["meta"] = response.data;
      return true;
    } catch (error) {
      return false;
    }
  }
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  providers: [
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
          console.log("URL: \n\n\n\n\n\n")
          console.log(process.env.NEXTAUTH_BACKEND_URL + "auth/login/")
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/login/",
            method: "post",
            data: credentials,
            headers: {
              'Content-Type': 'application/json'}
          });
          console.log("RESPONSE:")
          console.log(response)
          const data = response.data;
          if (data) return data;
        } catch (error) {
          console.log("ERROR")
          console.log(error)
          console.log("END ERROR")
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

      if (user && account) {
        let backendResponse = account.provider === "credentials" ? user : account.meta;
        console.log("BACKEND RESPONSE")
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
  }
};
