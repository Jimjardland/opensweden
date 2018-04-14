FROM node:8.1.4

WORKDIR /app

# NPM.
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
ADD /scripts/config-overides.js /app/scripts/config-overides.js
ADD /public /app/public
ADD /src /app/src
RUN npm install -s

# Build frontend
RUN npm run build

# Remove dev/build stuff.
RUN rm -R node_modules
RUN rm -R /app/scripts

# Install production modules only
RUN npm install -s --production

# Code.
ADD ./lib /app/lib
ADD ./migrations /app/migrations
ADD ./mockdata.json /app/mockdata.json

# Run.
CMD npm start