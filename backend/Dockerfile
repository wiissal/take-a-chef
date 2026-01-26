FROM node:18-alpine
# Set working directory (Railway already sets context to backend)
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

#set env to production
ENV NODE_ENV=production

#start the application
CMD ["node", "server.js"]