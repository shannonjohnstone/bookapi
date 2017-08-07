# base image to build from
FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# install you apps dependencies
COPY package.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
