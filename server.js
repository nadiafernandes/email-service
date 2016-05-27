'use strict';

switch (process.argv[2]) {
    case 'mailer':
        require('./backend/process/mailer');
    default:
        require('./backend/process/webserver');
}
