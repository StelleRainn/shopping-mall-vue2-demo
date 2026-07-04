FROM node:22-alpine AS build

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ARG VUE_APP_PUBLIC_BASE_URL=/shopping-mall/
ENV VUE_APP_PUBLIC_BASE_URL=$VUE_APP_PUBLIC_BASE_URL

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
