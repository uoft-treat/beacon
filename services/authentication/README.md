# Authentication Common Service

Provides authentication services.

Dev `https://dev-authentication-common-service.treatproject.tk/`

## API Reference

### Create User

POST `/users`

Request

```json
{
	"username": "me@jakczh.com",
	"password": "securepassword"
}
```

Response

```json
{
    "roles": [
        "ADMIN"
    ],
    "_id": "5d1a4b8dba180f9cd1daba5d",
    "username": "me@jakczh.com",
    "password": "64e936713937610581039f9a00bba386425c96c431b311d61496c04a7f39ae1c",
    "source": "LOCAL",
    "__v": 0
}
```

### List Users

GET `/users`

Response

```json
[
  {
      "roles": [
          "ADMIN"
      ],
      "_id": "5d1a4b8dba180f9cd1daba5d",
      "username": "me@jakczh.com",
      "password": "64e936713937610581039f9a00bba386425c96c431b311d61496c04a7f39ae1c",
      "source": "LOCAL",
      "__v": 0
  },
  ...
]
```


### Create Token

POST `/tokens`

Request

```json
{
	"username": "me@jakczh.com",
	"password": "securepassword"
}
```

Response

```
{
    "_id": "5d1a51def76ddba0c557d4c6",
    "user": {
        "roles": [
            "ADMIN"
        ],
        "_id": "5d1a4b8dba180f9cd1daba5d",
        "username": "me@jakczh.com",
        "password": "64e936713937610581039f9a00bba386425c96c431b311d61496c04a7f39ae1c",
        "source": "LOCAL",
        "__v": 0
    },
    "body": "3adfb205-1bf9-445d-b15a-c310deb6a923",
    "__v": 0
}
```

### Get User by Token

GET `/tokens/:body`

Response

```json
{
    "roles": [
        "ADMIN"
    ],
    "_id": "5d1a4b8dba180f9cd1daba5d",
    "username": "me@jakczh.com",
    "password": "64e936713937610581039f9a00bba386425c96c431b311d61496c04a7f39ae1c",
    "source": "LOCAL",
    "__v": 0
}
```