# email-service

## installation
- install **mongodb**
- install **gulp**
- npm install
- bower install
- set environment (e.g. 'dev')
- run **node init**
- run **nodem server** or **nodemon server**


## Link to application

## Problem description (IMPROVE)
- Email sending service with two email providers available.
- In case of failure of the first one, the other one is used.

## Solution (IMPROVE)
- Focused in backend.
- Consists in a mailer process running, checking every second (because mail services have to be fast) if there is new emails to send.
- In case of failure in mandrill, the email will be sent using send grid.

## Technical choices
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
-- routes with the api calls made available (MISSING)

-- frontend (MISSING)

#### Database choice 
I decided to use mongodb to store the emails, because storing a email as json makes more sense that using a relational database.
With more time I would have also a relational database to manage users. This way, we could check emails by user. 
I would additional introduce oauth authentication to the service and use redis to store the session. 

### Provoke failure to test the functionality
### bunyan everywhere
### gulp is not mine
### error handling front end, to check if the email is an email
### date in email
### store from and to