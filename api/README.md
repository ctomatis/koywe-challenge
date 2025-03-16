## Instalación

Ver [README](https://github.com/ctomatis/koywe-challenge?tab=readme-ov-file#configur%C3%A1-las-variables-de-entorno-de-cada-aplicaci%C3%B3n) para configuración de variables de entorno.

```bash
$ npm i
```

## Compilar y ejecutar

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Autenticación

### Crear nuevo usuario
```bash
curl --location 'http://localhost:3001/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@gmail.com",
    "password": "123456",
    "first_name": "John",
    "last_name": "Doe"
}'
```

### Login

```bash
curl --location 'http://localhost:3001/auth/login' \
--header 'Content-Type: application/json' \
--data '{"email": "user@gmail.com", "password": "123456"}'

# {"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."}
```

### Cotización

[POST] Crear una cotización

```bash
curl --location 'http://localhost:3001/quote' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data '{
  "amount": 100,
  "from": "ETH",
  "to": "ARS"
}'
```

[GET] Buscar una cotización por ``_id``
```bash
curl --location --request GET 'http://localhost:3001/quote/<_id>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>'
```