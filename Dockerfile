FROM node:18-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /discord.js-v14-template
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install
# Copy app files
COPY . .
# Start the app
CMD [ "npm", "run", "dev" ]