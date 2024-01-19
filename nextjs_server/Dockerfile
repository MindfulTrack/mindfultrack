#
# CLIENT DOCKERFILE
#
FROM node:alpine


RUN mkdir /nextjs_server
COPY . /nextjs_server
COPY package.json /nextjs_server/package.json
WORKDIR /nextjs_server
RUN npm install

CMD ["./entrypoint.sh"]
