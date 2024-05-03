FROM node:20-alpine
WORKDIR /home/product-inventory-management-system

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .
CMD [ "npm", "run", "dev" ]