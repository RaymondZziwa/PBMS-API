FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install 

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build


CMD ["npm", "run", "start:prod"]