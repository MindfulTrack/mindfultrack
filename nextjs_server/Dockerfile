#
# CLIENT DOCKERFILE
#

FROM node:alpine


RUN mkdir /nextjs_server
COPY . /nextjs_server
COPY package.json /nextjs_server/package.json
WORKDIR /nextjs_server
RUN npm install

## BUILD NEXTJS
RUN npm run build

## EXPOSE PORT 3000
EXPOSE 3000

# Start the Next.js app
CMD [ "npx", "next", "start", "-H", "0.0.0.0", "-p", "3000" ]

# CMD ["./entrypoint.sh"]
