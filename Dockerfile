
FROM node:8

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

ADD . /app
WORKDIR /app

RUN echo Node `node --version` \
  && echo NPM `npm --version`

RUN rm -rf node_modules
RUN npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN \
  && npm install -g yarn@^1.13.0

RUN yarn install

RUN yarn test --colors
# -p 8080:80