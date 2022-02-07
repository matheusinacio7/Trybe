FROM node:14-alpine AS build
ENV NODE_ENV production
WORKDIR /app
RUN chown -R node:node .
USER node
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.16.0-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

LABEL maintainer="Matheus 'Set' Inacio <heyyset@gmail.com>"
