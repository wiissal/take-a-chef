FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

#set env to production
ENV NODE_ENV=production

#start the application
CMD ["node", "server.js"]