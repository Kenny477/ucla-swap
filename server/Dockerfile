# Base image
FROM node:18-alpine as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

FROM node:18-alpine as main

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist/
COPY --from=build /usr/src/app/node_modules ./node_modules/
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/.env.prod ./.env.prod

# Start the server using the production build
CMD [ "node", "dist/main.js" ]