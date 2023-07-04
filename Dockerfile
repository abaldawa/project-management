FROM node:18-alpine
WORKDIR /usr/src/project-management/server
COPY ./server/package*.json ./
RUN npm i
WORKDIR /usr/src/project-management/client
COPY ./client/package*.json ./
RUN npm i
WORKDIR /usr/src/project-management
COPY . .
WORKDIR /usr/src/project-management/client
RUN npm run build
WORKDIR /usr/src/project-management/server
EXPOSE 3000
CMD ["npm", "start"]