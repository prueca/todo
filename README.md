## Todo API

RESTful API for Todo App

### Requirements
1. Docker 20.10 or above
2. Node JS v16 or above

### Setup

> Note: Restart todo-api container after running as the database takes time to setup

```bash
$ cp .env.example .env
$ docker compose up --build -d
$ docker restart todo-api
```

### Endpoints

* Create: POST /api/todo
* Read: GET /api/todo/:id
* Update: PUT /api/todo/:id
* Delete: DELETE /api/todo/:id
* Read All: GET /api/todo
* Paginate: GET /api/todo/page?page=n&limit=n
