# Experiment Session Common Service

A common service to store experiment sessions.

## Dependencies

This service depends on three services:

* Discovery Service
* Experiment Template Service
* Survey Template Service

## Quick Start

To run this package, first copy `.env.example` to `.env` by typing the following command

```bash
$ cp .env.example .env
```

Then edit `.env` file to match your local setup.

Finally, run `npm install && npm start` to run the development environment.


## Endpoints

### GET `/experimentSessions`

Get all experiment sessions

* Response
    * 200 OK - list of
        * _id: string - Session ID
        * surveyTemplateId: string - Survey template ID
        * experimentTemplateId: string - Experiment template ID
        * createdAt: string - Creation time (ISO)
        * updatedAt: string - Update time (ISO)

### POST `/experimentSessions`

Create new experiment session

* Payload
    * surveyTemplateId: string - Survey template ID
    * experimentTemplateId: string - Experiment template ID
        
* Response
    * 201 Created
        * _id: Session ID
    * 400 Bad Request
    * 404 Not Found

### GET `/experimentSessions/:id`

Get one experiment session by ID

* Response
    * 200 OK
        * _id: string - Session ID
        * surveyTemplateId: string - Survey template ID
        * experimentTemplateId: string - Experiment template ID
        * createdAt: string - Creation time (ISO)
        * updatedAt: string - Update time (ISO)
    * 404 Not Found
    

### DELETE `/experimentSessions/:id`

Delete one experiment session by ID
    
* Response
    * 200 OK
        * message: ok
    * 404 Not Found