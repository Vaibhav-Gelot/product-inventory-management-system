# Product Inventory Management System

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

## Assumtion

- Each Product has only on supplier.

## Project Structure

- 📂 \product\-inventory\-management\-system
  - 📄 [Dockerfile](Dockerfile)
  - 📄 [README.md](README.md)
  - 📄 [docker\-compose.yml](docker-compose.yml)
  - 📂 **env**
  - 📄 [node_modules](node_modules)
  - 📄 [nodemon.json](nodemon.json)
  - 📄 [package\-lock.json](package-lock.json)
  - 📄 [package.json](package.json)
  - 📂 **postman_collection**
    - 📄 [product\-inventory\-management\-system.postman_collection.json](postman_collection/product-inventory-management-system.postman_collection.json)
  - 📂 **src**
    - 📄 [app.js](src/app.js)
    - 📂 **db**
      - 📄 [migrationRunner.js](src/db/migrationRunner.js)
      - 📂 **migrations**
        - 📄 [20240502091402\-create\-products\-table.js](src/db/migrations/20240502091402-create-products-table.js)
        - 📄 [20240502093005\-create\-suppliers\-table.js](src/db/migrations/20240502093005-create-suppliers-table.js)
        - 📄 [20240502094033\-add\-suppliers\-products\-foreign\-key.js](src/db/migrations/20240502094033-add-suppliers-products-foreign-key.js)
      - 📄 [postgres.js](src/db/postgres.js)
      - 📄 [psqlModel.js](src/db/psqlModel.js)
    - 📂 **helpers**
      - 📄 [Logger.js](src/helpers/Logger.js)
      - 📄 [errorTypes.js](src/helpers/errorTypes.js)
      - 📄 [exception.js](src/helpers/exception.js)
      - 📄 [handlerReqRes.js](src/helpers/handlerReqRes.js)
    - 📂 **module**
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
      - 📄 [utils.js](src/utils/utils.js)
      - 📄 [validation.js](src/utils/validation.js)

## Dev CMD

- Creaate Migration -> `npx sequelize-cli migration:create --name users`
