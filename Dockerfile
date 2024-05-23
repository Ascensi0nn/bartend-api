FROM node:21.7.3-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm i -D @types/cors @types/express @types/node nodemon typescript ts-node
COPY . .
EXPOSE 8080
CMD npm run dev
