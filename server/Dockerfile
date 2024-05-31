# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "Server.js"]
EXPOSE 3000