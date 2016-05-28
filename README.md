# email-service

## Installation
- install **mongodb**
- npm install
- bower install
- set environment (e.g. 'dev' for development)
- run **nodem server** or **nodemon server**


## Link to application
[Heroku server url] (https://mysterious-peak-75256.herokuapp.com/#/)


## Problem/Solution description (IMPROVE)
- Possibility to send emails, and to check/delete emails of the list of sent emails.
- The emails are stored in a queue initially as not processed (pendent). Only after sent the status is set as processed.
- Otherwise, in this case of the internet or one of the email providers fail the email continue pendent.
- To guarantee that the user has the email sent, two different email providers are used (e.g., sendgrid and mailgun). 
- If the first one fail the second one will be used. 
- Every second the process is called again to try to sent the pendent emails.

## Technical choices
- Focused in fullstack/backend.

#### Architecture 
- config with the possible environments available, with variables for the databases, ports, root url etc.
- there are available two environments: 
    -- dev for testing, sending emails for the test subjected inserted, 
    -- prod where the emails are sent for the real subject.
-- in a more professional case, more environment could be made available. for instance test and acceptance. For a test server and a acceptance server.
 
- Division between backend and frontend to separate the logic between them.
- backend consists of:
-- constants where are available error codes,
-- controllers where the controllers of the api are inserted
-- middleware, that could be access verification (available in case of more time), authorization (available in case of more time), other extra verifications that could occur before a api call can be done
-- process, which contains the mailer process itself and the main server that serves the page
-- routes with the api calls made available

- frontend
-- images, js files with controllers and services, libraries (resultant from bower install) and frontend views (several pages)
-- in this case i did not have time to create a gulp file to transform an sass file in the css file of the page. So I used directly an CSS file.

#### Database choice 
I decided to use mongodb to store the emails, because storing a email as json makes more sense that using a relational database.
With more time I would have also a relational database to manage users. This way, we could check emails by user. 
I would additional introduce oauth authentication to the service and use redis to store the session. 

### Provoke failure to test the functionality
### bunyan everywhere
### error handling front end, to check if the email is an email
### date in email
### store from and to

### um processo extra que ve a queu
### posso randomizar error para ver o que acontece se um falhar
### como tentamos a cada segundo 'e suf ir tentado assim

###create rantom factor para fazer o servidor de email falhar