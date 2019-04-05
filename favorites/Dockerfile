FROM node:lts-alpine
WORKDIR server
COPY . .
RUN npm install --prod
ENTRYPOINT ["node","server.js"]