
FROM node:12

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

ADD . /app
WORKDIR /app

RUN echo Node `node --version` \
  && echo NPM `npm --version`

RUN npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN \
  && npm install -g

RUN yarn install
