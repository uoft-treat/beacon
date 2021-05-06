# Data Collection Common Service

```
Author: Jun Zheng (me at jackzh dot com)
```

Micro-service to store arbitrary JSON data. Support collection management and schema validation.

## Quick Start

To run this package, first copy `.env.example` to `.env` by typing the following command

```bash
$ cp .env.example .env
```

Then edit `.env` file to match your local setup.

Finally, run `npm install && npm start` to run the development environment.

## API Reference

### Create a Collection

POST `/collections`

Request (schema key is optional)

```json
{
  "schema": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"title\":\"Product\",\"description\":\"A product from Acme's catalog\",\"type\":\"object\",\"properties\":{\"id\":{\"description\":\"The unique identifier for a product\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the product\",\"type\":\"string\"},\"price\":{\"type\":\"number\",\"minimum\":0,\"exclusiveMinimum\":true}},\"required\":[\"id\",\"name\",\"price\"]}"
}
```

Response

```json
{
    "_id": "5d1a7bf18455adcba1eac01a",
    "jsonSchema": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"title\":\"Product\",\"description\":\"A product from Acme's catalog\",\"type\":\"object\",\"properties\":{\"id\":{\"description\":\"The unique identifier for a product\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the product\",\"type\":\"string\"},\"price\":{\"type\":\"number\",\"minimum\":0,\"exclusiveMinimum\":true}},\"required\":[\"id\",\"name\",\"price\"]}",
    "__v": 0
}
```

### Get a Collection

GET `/collections/:id`

Response

```json
{
    "_id": "5d1a7bf18455adcba1eac01a",
    "jsonSchema": "{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"title\":\"Product\",\"description\":\"A product from Acme's catalog\",\"type\":\"object\",\"properties\":{\"id\":{\"description\":\"The unique identifier for a product\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the product\",\"type\":\"string\"},\"price\":{\"type\":\"number\",\"minimum\":0,\"exclusiveMinimum\":true}},\"required\":[\"id\",\"name\",\"price\"]}",
    "__v": 0
}
```

### Create a Blob

POST `/collections/:id/blobs`

Request

```json
{
	"body": "{\"id\": 123, \"name\": \"sample\", \"price\": 1}"
}
```

Response

```json
{
    "_id": "5d1a7c708455adcba1eac01b",
    "parentCollection": "5d1a7bf18455adcba1eac01a",
    "body": "{\"id\": 123, \"name\": \"sample\", \"price\": 1}",
    "__v": 0
}
```

### Get Blobs

GET `/collections/:id/blobs`

Response

```json
[
    {
        "_id": "5d1a7c708455adcba1eac01b",
        "parentCollection": "5d1a7bf18455adcba1eac01a",
        "body": "{\"id\": 123, \"name\": \"sample\", \"price\": 1}",
        "__v": 0
    },
    ...
]
```