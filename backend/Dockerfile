FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p pdfs

EXPOSE 3000

CMD ["node", "server.js"]
