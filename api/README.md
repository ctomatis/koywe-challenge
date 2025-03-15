## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Authentication

```bash
curl --location 'http://localhost:3001/auth/login' \
--header 'Content-Type: application/json' \
--data '{"username": "john@gmail.com", "password": "changeme"}'
```

## Make your first call

Create a new quote
```bash
curl --location 'http://localhost:3001/quote' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE3NDIwNzE2NzYsImV4cCI6MTc0MjY3NjQ3Nn0.evL9K0EXZNcKH2BC-UQVMdEfGgG9VG-WFJp91Q1QfVw' \
--data '{
  "amount": 100,
  "from": "ETH",
  "to": "ARS"
}'
```
## And then
Find a quote by ``_id``
```bash
curl --location --request GET 'http://localhost:3001/quote/<_id>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>'
```