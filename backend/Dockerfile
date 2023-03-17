FROM node:17.0.1

ENV MONGODB_URL="mongodb+srv://chuong200115:chuong123@backend.pup32.mongodb.net/DSV_intern"
ENV JWT_ACCESS_KEY='chuong200115'
ENV PORT=80

WORKDIR /app
COPY package*.json ./

RUN npm install npm@8.5.3 -g
RUN npm install

COPY . .

CMD ["npm","start"]