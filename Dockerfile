FROM node:14.16.1-alpine    

WORKDIR /server

COPY . .
RUN npm install

EXPOSE 3000

CMD npm start