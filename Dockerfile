FROM node:alpine as builder
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn add webpack
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist/
EXPOSE 4100
CMD ["node", "/app/dist/index.js"]
