FROM node:alpine
WORKDIR /app
COPY /nextjs_server/package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","start"]

