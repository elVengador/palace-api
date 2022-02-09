FROM node:14-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn add webpack
RUN yarn build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/build /app/build/
EXPOSE 4100
CMD ["node", "/app/build/index.js"]
