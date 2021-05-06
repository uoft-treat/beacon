# Survey Questions Common Service

Provide services related to survey question storage.

## Dependencies

This service does not depend on any other services.


## Quick Start

To run this package, first copy `.env.example` to `.env` by typing the following command

```bash
$ cp .env.example .env
```

Then edit `.env` file to match your local setup.

Finally, run `npm install && npm start` to run the development environment.

## Endpoints
    
### GET `/surveyQuestions`

List all survey questions.

* Response (list of)
    * 200 OK
        *  _id: string - ID of the question
        * title: string - Title of the question
        * description?: string - Description of the question
        * questionType: string - Type of the question
        * choices?: string[] - List of choices
        * lockedAt?: string - Lock date
        * createdAt: string - Creation date
        * updatedAt: string - Update date
        
    
### GET `/surveyQuestions/:id`

Get one question.

* Response
    * 200 OK
        *  _id: string - ID of the question
        * title: string - Title of the question
        * description?: string - Description of the question
        * questionType: string - Type of the question
        * choices?: string[] - List of choices
        * lockedAt?: string - Lock date
        * createdAt: string - Creation date
        * updatedAt: string - Update date
    * 404 Not Found

### POST `/surveyQuestions`

Create a new survey question.

* Payload
    * title: string - Required, title of the question
    * description: string - Optional description
    * questionType: string - Required, type of the question, can be SINGLE_CHOICE or SHORT_ANSWER
    * choices: string[] - If SINGLE_CHOICE then required list of choices
* Response
    * 201 Created
        * _id: string - ID of created question
    * 400 Bad Request

### DELETE `/surveyQuestions/:id`

Delete one question.

* Response
    * 200 OK
        * message: ok
    * 404 Not Found
    * 409 Conflict
    
### PATCH `/surveyQuestions/:id`

Update one question.

* Payload
    * title: string - Optional, title of the question
    * description: string - Optional description
    * questionType: string - Optional, type of the question, can be SINGLE_CHOICE or SHORT_ANSWER
    * choices: string[] - If SINGLE_CHOICE then required list of choices
* Response
    * 200 OK
        * _id: string - ID of updated question
    * 404 Not Found
    * 400 Bad Request
    * 409 Conflict
    
### POST `/surveyQuestions/:id/lock`

Lock a survey question (so it cannot be deleted or updated).

* Response
    * 200 OK
        * message: ok
    * 404 Not Found

### DELETE `/surveyQuestions/:id/lock`

Unlock a survey question.

* Response
    * 200 OK
        * message: ok
    * 404 Not Found
