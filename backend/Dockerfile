FROM node:18-alpine
# Set working directory (Railway already sets context to backend)
WORKDIR /app

COPY backend/package*.json ./
RUN npm install
COPY backend ./

# List files to debug (temporary)
RUN ls -la
EXPOSE 3000

#set env to production
ENV NODE_ENV=production

#start the application
CMD ["node", "server.js"]