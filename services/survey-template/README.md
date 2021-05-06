# Survey Template Common Service

A common service to manage survey templates, which is a collection of survey questions with some extra metadata.

## Dependencies

This service depends on two other services:

* Discovery Service
* Survey Question Common Service

## Quick Start

To run this package, first copy `.env.example` to `.env` by typing the following command

```bash
$ cp .env.example .env
```

Then edit `.env` file to match your local setup.

Finally, run `npm install && npm start` to run the development environment.


## Endpoints

### GET `/surveyTemplates`

Get all survey templates

* Response
    * 200 OK - list of
        * name: string - Survey name
        * description?: string - Survey description
        * questions - list of
            * surveyQuestionId: string - ID for survey question service
            * required: boolean - If this question is required

### POST `/surveyTemplates`

Create new survey template

* Payload
    * name: string - Required, template name
    * description: string - Optional, template description
    * questions: list of
        * surveyQuestionId: string - Required, question ID obtained from survey question service
        * required: boolean - Required, true if this question must be answered
        
* Response
    * 201 Created
        * _id: Template ID
    * 400 Bad Request
    * 404 Not Found


### GET `/surveyTemplates/:id`

Get one survey template by ID

* Response
    * 200 OK
        * name: string - Survey name
        * description?: string - Survey description
        * questions - list of
            * surveyQuestionId: string - ID for survey question service
            * required: boolean - If this question is required
    * 404 Not Found