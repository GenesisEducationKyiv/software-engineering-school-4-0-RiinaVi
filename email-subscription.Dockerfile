FROM node:20.11.1

WORKDIR /
COPY package*.json ./
COPY lerna.json ./
COPY constants ./constants
RUN npm install -g tsc
RUN npm install

WORKDIR /services/email-subscription
COPY services/email-subscription ./
RUN npm install

WORKDIR /
RUN npm run build --workspace=email-subscription-service

COPY . .
