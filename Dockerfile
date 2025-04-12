FROM node:lts
WORKDIR /app
COPY . .
COPY package*.json .
RUN npm ci
CMD ["npm", "run", "dev"]
