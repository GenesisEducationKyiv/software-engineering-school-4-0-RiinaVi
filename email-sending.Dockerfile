FROM node:20.11.1

WORKDIR /
COPY package*.json ./
COPY lerna.json ./
COPY constants ./constants
RUN npm install -g tsc
RUN npm install

WORKDIR /services/email-sending
COPY services/email-sending ./
RUN npm install

WORKDIR /
RUN npm run build --workspace=email-sending-service

COPY . .
