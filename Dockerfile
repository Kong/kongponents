FROM node:8

RUN apt-get update
RUN apt-get install apache2 -y
RUN apt-get install php  -y
ARG NPM_TOKEN=${NPM_TOKEN}

ADD . /kongponents
WORKDIR /kongponents

RUN echo Node `node --version` \
&& echo NPM `npm --version`

RUN npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN \
&& npm install -g yarn@^1.13.0

RUN npm install -g

RUN npm install
CMD php -S localhost:8000
# CMD yarn serve --mode ci
