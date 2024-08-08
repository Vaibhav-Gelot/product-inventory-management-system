# Product Inventory Management System

## About

- Building a service that can allow suppliers to manage their products on marketplace.

## Note

- Auth :
  - JWT Token Based Auth for login/signup : ✔️
  - Manage refresh token with server-side(redis) to improve security : 🕒
- Suppliers :
  - Add/Get supplier API : ✔️
- Products :
  - CRUD Operation on products : ✔️
  - Qty up/down with transaction controls : ✔️
- CI/CD & Monitoring :

  - add docker for deployment services : ✔
  - monitoring tools -> elk-stack, grafana, : 🕒

- Phase - 2 : cooming soon...

## Assumtion

- Each Product has only on supplier.

## Routes

#### Suppliers

- Get Supplier

  - GET http://localhost:3000/api/v1/suppliers/:id

- Add Supplier
  - POST http://localhost:3000/api/v1/suppliers

#### Products

- Get Product List

  - GET http://localhost:3000/api/v1/products?price_from=:q1&price_to=:q2&supplier_name=:q3

- Get Product

  - GET http://localhost:3000/api/v1/products/:id

- Add Product

  - POST http://localhost:3000/api/v1/products/

- Upadate Product

  - PUT http://localhost:3000/api/v1/products/:id

- Delete Product

  - DELETE http://localhost:3000/api/v1/products/:id

- Increment Product Stock

  - PUT http://localhost:3000/api/v1/products/:id/stock/:qty/increment

- Decrement Product Stock

  - PUT http://localhost:3000/api/v1/products/:id/stock/:dty/decrement

## Run command

### local(machine)

- prerequisite postgres database

```bash
 1  npm install
 2  npm run local
```

### docker

```bash
 1  docker-compose up
```

## Project Structure

- 📂 \product\-inventory\-management\-system
  - 📄 [Dockerfile](Dockerfile)
  - 📄 [README.md](README.md)
  - 📂 **config**
    - 📂 **elk_stack**
      - 📄 [filebeat.yml](config/elk_stack/filebeat.yml)
      - 📄 [kibana.yml](config/elk_stack/kibana.yml)
      - 📄 [logstash.conf](config/elk_stack/logstash.conf)
      - 📄 [logstash.yml](config/elk_stack/logstash.yml)
    - 📂 **redis**
      - 📄 [redis.conf](config/redis/redis.conf)
  - 📄 [docker\-compose.yml](docker-compose.yml)
  - 📂 **env**
  - 📂 **logs**
  - 📄 [node_modules](node_modules)
  - 📄 [nodemon.json](nodemon.json)
  - 📄 [package\-lock.json](package-lock.json)
  - 📄 [package.json](package.json)
  - 📂 **postman_collection**
    - 📄 [product\-inventory\-management\-system.postman_collection.json](postman_collection/product-inventory-management-system.postman_collection.json)
  - 📂 **src**
    - 📄 [app.js](src/app.js)
    - 📂 **db**
      - 📂 **postgres**
        - 📄 [index.js](src/db/postgres/index.js)
        - 📄 [migrationRunner.js](src/db/postgres/migrationRunner.js)
        - 📂 **migrations**
          - 📄 [20240502091402\-create\-products\-table.js](src/db/postgres/migrations/20240502091402-create-products-table.js)
          - 📄 [20240502093005\-create\-suppliers\-table.js](src/db/postgres/migrations/20240502093005-create-suppliers-table.js)
          - 📄 [20240502094033\-add\-suppliers\-products\-foreign\-key.js](src/db/postgres/migrations/20240502094033-add-suppliers-products-foreign-key.js)
          - 📄 [20240616174429\-create\-users\-table.js](src/db/postgres/migrations/20240616174429-create-users-table.js)
        - 📄 [psqlModel.js](src/db/postgres/psqlModel.js)
      - 📂 **redis**
        - 📄 [index.js](src/db/redis/index.js)
        - 📄 [redisModel.js](src/db/redis/redisModel.js)
    - 📂 **helpers**
      - 📄 [errorTypes.js](src/helpers/errorTypes.js)
      - 📄 [exception.js](src/helpers/exception.js)
      - 📄 [logger.js](src/helpers/logger.js)
    - 📂 **middleware**
      - 📄 [index.js](src/middleware/index.js)
      - 📄 [requesrParser.js](src/middleware/requesrParser.js)
      - 📄 [responseBuilder.js](src/middleware/responseBuilder.js)
      - 📄 [validateAccessToken.js](src/middleware/validateAccessToken.js)
    - 📂 **module**
      - 📂 **auth**
        - 📄 [auth.controller.js](src/module/auth/auth.controller.js)
        - 📄 [auth.js](src/module/auth/auth.js)
        - 📄 [auth.sql.model.js](src/module/auth/auth.sql.model.js)
      - 📄 [index.js](src/module/index.js)
      - 📂 **product**
        - 📄 [products.controller.js](src/module/product/products.controller.js)
        - 📄 [products.js](src/module/product/products.js)
        - 📄 [products.sql.model.js](src/module/product/products.sql.model.js)
      - 📂 **supplier**
        - 📄 [supplier.controller.js](src/module/supplier/supplier.controller.js)
        - 📄 [suppliers.js](src/module/supplier/suppliers.js)
        - 📄 [suppliers.sql.model.js](src/module/supplier/suppliers.sql.model.js)
    - 📂 **utils**
      - 📄 [constants.js](src/utils/constants.js)
      - 📄 [jwt.js](src/utils/jwt.js)
      - 📄 [utils.js](src/utils/utils.js)
      - 📄 [validation.js](src/utils/validation.js)

## Dev CMD

- Creaate Migration -> `npx sequelize-cli migration:create --name users`
- Generate Project Structure -> `md-file-tree -e`
