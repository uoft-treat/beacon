# Discovery Service

A common service used to find other service endpoints. Kind of like Netflix Eureka, but way less powerful.

By default this service runs on port `3030`, it is recommended that you don't change this setting if possible.

## Quick Start

To run this package, first copy `.env.example` to `.env` by typing the following command

```bash
$ cp .env.example .env
```

Then edit `.env` file to match your local setup.

Finally, run `npm install && npm start` to run the development environment.


## Endpoints
    
### GET `/apis`

Get a list of APIs available

* Response (list of)
    * 200 OK
        * name: string - API name
        * endpoints: string[] - List of available endpoints

### GET `/apis/:name`

Get a specific API by name

* Response
    * 200 OK
        * name: string - API name
        * endpoints: string[] - List of available endpoints
    * 404 Not Found
    
### POST `/apis/:name`

Get a specific API by name

* Payload
    * name: string - Required, API name
* Response
    * 200 OK
        * name: string - API name
    * 400 Bad Request
    * 409 Conflict
    
### DELETE `/apis/:name`

Remove a specific API by name

* Response
    * 200 OK
        * message: ok
    * 404 Not Found
    
### GET `/apis/:name/endpoints`

Get a specific API endpoints by name

* Response
    * 200 OK
        * list of strings
    * 404 Not Found
    
### POST `/apis/:name/endpoints`

Add a new endpoint to API.

* Payload
    * endpoint: string - Endpoint to add
* Response
    * 200 OK
        * message: ok
    * 404 Not Found
    * 409 Conflict


### POST `/apis/:name/endpoints/:endpoint`

Remove an endpoint from API.

* Response
    * 200 OK
        * message: ok
    * 404 Not Found
    