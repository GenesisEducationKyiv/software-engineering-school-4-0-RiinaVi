FROM node:20.11.1

WORKDIR /
COPY package*.json ./
COPY lerna.json ./
COPY constants ./constants
RUN npm install -g tsc
RUN npm install

WORKDIR /services/currency-exchange-rate
COPY services/currency-exchange-rate ./
RUN npm install

WORKDIR /
RUN npm run build --workspace=currency-exchange-rate-service

COPY . .
