# email-service

## Installation
- install **mongodb**
- npm install
- bower install
- set environment (e.g. 'dev' for development)
- run **nodem server** or **nodemon server**


## Link to application
[Heroku server url] (https://mysterious-peak-75256.herokuapp.com/#/)


## Problem/Solution description
- Possibility to send emails, and to check/delete sent emails.
- The emails are stored in a queue as not processed (pendent). Only after sent the status is set as processed.
- In this case of the internet failure or one of the email providers fail the email continue pendent.
- To guarantee that the user has the email sent, two different email providers are used (e.g., sendgrid and mailgun). 
- If the first one fail the second one will be used. 
- Every second the process is called again to try to sent the pendent emails.

## Technical choices
- Focused in fullstack/backend.

#### Architecture 
- Backend consists of:
1) constants where are available error codes,
2) controllers where the controllers of the api are inserted
3) process, which contains the mailer process itself and the main server that serves the page
4) routes with the api calls made available

- Frontend structure: images, js files with controllers and services, libraries (resultant from bower install) and frontend views (several pages).
In this case I did not have time to create a gulp file to transform an sass file in the css file of the page. So I used directly an CSS file.

- Variable configurations per environment, as database variables, send emails or use a test mode, etc are based in config files. There are two enviroments available: 
    1) dev for testing, sending emails for the test subjected inserted, 
    2) prod where the emails are sent for the real subject.
In an professional context, more environment could be made available. For instance test and acceptance. For a test server and a acceptance server.
 
#### Database choice 
I decided to use mongodb to store the emails, this way I can store them with their original json format (no need of reational database).
With more time I would have also a relational database to manage users. This way, we could check emails by user. 
I would additional introduce oauth authentication to the service and use redis to store the session. 

## API summary
- **GET** /api/emails
- **POST** /api/emails
- **PUT** /api/emails
- **DELETE** /api/emails

## Interface
- simple and clean
- the user has a clear place to create a new email 
- and a view of the sent emails where it can check details of a specific email without losing the previous context

## Possible improvements
- extra funcionalities as: login, draft emails, etc
- backend security, verify if the user can access the data calls is trying to perform.
- random algorithm to provoke failure of the email providers, to use one or another. (I manually tested that)
- better error handling in front end (present informative messages to the users)
