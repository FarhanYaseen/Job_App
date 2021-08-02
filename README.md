#This repository consists of a simplified version of job Application, which allows companies to order jobs consisting of shifts that talents (workers) can be booked for.


## How to start server
```sh
yarn run dev
```

### Create Job
```sh
curl --location --request POST 'http://localhost:3001/job' \
--header 'Content-Type: application/json' \
--data-raw '{
    "companyId": "caff5283-22bb-4892-b1a4-36edd3a796cc",
    "start": "2021-08-02T17:34:36.243Z",
    "end": "2021-08-03T01:22:29.917Z",
```
### Get Shifts by job Id
```sh
curl --location --request GET 'http://localhost:3001/shift/d9ddc26b-1d0d-44d1-b933-d69d367fff26'
```

### Delete job by job Id
```sh
curl --location --request DELETE 'http://localhost:3001/job/d9ddc26b-1d0d-44d1-b933-d69d367fff26'
```

### delete Shift by shift Id
```sh
curl --location --request DELETE 'http://localhost:3001/shift/c6732360-6697-4065-bd35-7c0e45d754c8'
```

### Add talent

```sh
curl --location --request PATCH 'http://localhost:3001/shift/c6732360-6697-4065-bd35-7c0e45d754c8/book' \
--header 'Content-Type: application/json' \
--data-raw '{
    "talent": "caff5283-22bb-4892-b1a4-36edd3a796cc"
}'
```

### Delete Shift by talent

```sh
curl --location --request DELETE 'http://localhost:3001/talent/null'
```