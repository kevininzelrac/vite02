FROM node:alpine as build
WORKDIR /client
COPY package*.json /client
RUN npm install
COPY . /client
RUN npm run build

FROM nginx:alpine
COPY --from=build /client/dist /var/www/html
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off;"]
