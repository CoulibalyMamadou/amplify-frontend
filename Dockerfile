# Stage 1
# FROM node:8 as react-build
# WORKDIR /app
# COPY . ./
# RUN yarn
# RUN yarn build

# # Stage 2 - the production environment
# FROM nginx:alpine
# # COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=react-build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]



FROM node:14 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.*json ./

RUN npm i

# RUN npm install react-scripts@3.4.0 -g --silent

COPY . ./

# RUN npm run build
#
# FROM nginx:stable-alpine
#
# COPY --from=build /app/build /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

CMD [ "npm", "run", "start" ]
# CMD ["nginx","-g","daemon off;"]