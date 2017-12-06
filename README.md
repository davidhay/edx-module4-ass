# edx-module4-ass
rest api implemented with node, express and mongoose

Installation 'npm install'

Running 'node server.js' - the server runs on port 3000.

Supported Endpoints

* GET /accounts
* GET /accounts/:id
* POST /accounts
* PUT  /accounts:id
* DELETE /accounts/:id

Mongo Database Name : 'edx-module4-ass-db'

Implementation Details - Used sandard mongoose callbacks. Used middleware for common code to find the account for GET(by id),PUT and DELETE.

