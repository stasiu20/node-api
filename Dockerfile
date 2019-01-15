
FROM node:10

RUN npm install -g nodemon

RUN mkdir -p /home/node/node_modules && chown -R node:node /home/node

WORKDIR /home/node

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

CMD [ "nodemon",  "playground/mongoos-queries.js"]

# żeby zbudować obraz po zmianach w package.json docker build -t test .
# żeby wystartiwać testy docker run -p 8000:3001 -v /home/michal/nodejs/node-test/:/home/node/app test