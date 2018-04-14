FROM node:8.1.4

WORKDIR /app

# NPM.
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm install -s

# Build frontend
RUN npm run build

# Remove dev/build stuff.
RUN rm -R node_modules
RUN rm gulpfile.js
RUN rm -R /app/lib/assets

# Install production modules only
RUN npm install -s --production

# Code.
ADD ./.eslintrc /app/.eslintrc
ADD ./lib /app/lib

# Run.
CMD npm start