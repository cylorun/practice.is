FROM node:20
LABEL authors="cylorun"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

RUN npm run build

CMD ["npm", "start", "--", "-p", "5001"]
