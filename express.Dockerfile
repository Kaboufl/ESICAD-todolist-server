FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./

# ENV DB_DATABASE=DBtodo
# ENV DB_HOST=a067b3164f3c
# ENV DB_USERNAME=todo
# ENV DB_PASSWORD=todo
# ENV DB_PORT=6603

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "node", "dist/index.js" ]
