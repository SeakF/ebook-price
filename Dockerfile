FROM node:18.18.0-alpine as development

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci 

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

FROM node:18.18.0-alpine as production

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]

