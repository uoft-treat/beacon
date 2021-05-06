# Experiment Template Common Service

A common service to store experiment templates, which is simply links to web apps.

## Dependencies

This service depends on one service:

* Discovery Service

## Quick Start

To run this package, first copy `.env.example` to `.env` by typing the following command

```bash
$ cp .env.example .env
```

Then edit `.env` file to match your local setup.

Finally, run `npm install && npm start` to run the development environment.


## Endpoints

### GET `/experimentTemplates`

Get all experiment templates

* Response
    * 200 OK - list of
        * _id: string - Template ID
        * name: string - Template name
        * description?: string - Template description
        * link: string - Template URL

### POST `/experimentTemplates`

Create new experiment template

* Payload
    * name: string - Required, template name
    * description: string - Optional, template description
    * link: string - Required, template link
        
* Response
    * 201 Created
        * _id: Template ID
    * 400 Bad Request

### GET `/experimentTemplates/:id`

Get one experiment template by ID

* Response
    * 200 OK
        * _id: string - Template ID
        * name: string - Template name
        * description?: string - Template description
        * link: string - Template URL
    * 404 Not Found
    

### PATCH `/experimentTemplates/:id`

Update one experiment template by ID

* Payload
    * name: string - Optional, template name
    * description: string - Optional, template description
    * link: string - Optional, template link
    
* Response
    * 200 OK
        * _id: string - Template ID
    * 404 Not Found

### DELETE `/experimentTemplates/:id`

Delete one experiment template by ID
    
* Response
    * 200 OK
        * message: ok
    * 404 Not Found