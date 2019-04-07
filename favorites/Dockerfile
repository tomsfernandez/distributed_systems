FROM node:lts-alpine
WORKDIR server
COPY package*.json ./
RUN npm install --prod
COPY . .
ENTRYPOINT ["node","server.js"]