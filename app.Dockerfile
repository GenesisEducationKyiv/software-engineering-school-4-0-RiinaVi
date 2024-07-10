FROM node:20.11.1

WORKDIR /
COPY package*.json ./
COPY lerna.json ./
COPY constants ./constants
RUN npm install -g tsc
RUN npm install

WORKDIR /services/app
COPY services/app ./
RUN npm install

WORKDIR /
RUN npm run build --workspace=app-service

COPY . .
