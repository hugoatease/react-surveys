# Survey model reference

A survey has common properties and can contain an arbitrary number of answer fields.

This document aims to define a JSON format for storage of survey definitions, which
will be returned by the survey API and stored in a MongoDB database.

Survey fields
-------------
Fields that are common to every survey and providing basic information.

| Field name          | Description                                  |
| :-------------------|----------------------------------------------|
| `id`                | Survey ID |
| `name`                | Survey name                           |
| `description`         | Survey description (optional) |
| `author`              | Survey's author |
| `questions`           | Array of `question` object |

`question` object
----------------
A question has a randomly generated identifier, type, name and an optional description. Questions can be mandatory or optional.

Question format defines how the user should answer the question.
It can be a freeform input of text or choice types like radio buttons,
checkboxes and selects.

For choices input, a list of valid options is attached to the question, each option
having a unique identifier and name.

| Field name            | Description                                  |
| :---------------------|----------------------------------------------|
| `id`                  | Question unique ID                           |
| `name`                | Question name                                |
| `description`         | Question description (optional)              |
| `required`            | Should the answer be required. `true` or `false` |
| `type`                | `text` / `paragraph` / `radio` / `checkbox` / `select` |
| `options`             | If question is of type `radio`, `checkbox` or `select`, array of `option` object |

`option` object
---------------
If the question is of type `radio`, `checkbox` or `select`, valid options must
be attached to it.

| Field name          | Description                                  |
| :-------------------|----------------------------------------------|
| `id`                | Option unique ID                             |
| `name`              | Option name                                  |

Example survey JSON
-------------------
    {
      "id": "hJVYUldjnf",
      "name": "Music blind test",
      "description": "A sample survey for react-surveys",
      "author": "Hugo Caille <hugo.caille@isen-lille.fr>",
      "questions": [
        {
          "id": 1,
          "name": "Stop the world cause i wanna get off with you",
          "required": false,
          "type": "text"
        },
        {
          "id": 2,
          "name": "Interstate 8",
          "description": "Find the band singing this",
          "required": true,
          "type": "select",
          "options": [
            {
              "id": 1,
              "name": "Moderat"
            },
            {
              "id": 2,
              "name": "Modest Mouse"
            },
            {
              "id": 3,
              "name": "Parquet Courts"
            }
          ]
        },
        {
          "id": 3,
          "name": "How you'll rate Tame Impala's Lonerism",
          "type": "radio",
          "options": [
            {
              "id": 1,
              "name": "1"
            },
            {
              "id": 2,
              "name": "2"
            },
            {
              "id": 3,
              "name": "3"
            },
            {
              "id": 4,
              "name": "4"
            },
            {
              "id": 5,
              "name": "5"
            },
          ]
        }
      ]
    }
