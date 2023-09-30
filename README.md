# portfolio_server

This project uses [nodemailer](https://nodemailer.com/about/) to 'send' emails from an Gmail account to an email specified in the form input.

Since this is a node project it needs to be run in a node environment.

### Locally

To run and test this locally, follow these steps (assuming you have Node.js installed):
1. Download/clone the project
2. In the project folder, on you terminal, run `npm install`
3. Copy and paste the email address (*NM_EMAIL_ADDR*) and password (*NM_EMAIL_PASS*) values to the `.env` file
4. To test as you code, run `npm run dev`. This will watch changes and run this project whenever you save at localhost on port 4000 - [localhost:4000](localhost:4000). 
5. To run the project, run `npm run start`. This is the same as above but would require restarting if you make any changes to app.js - [localhost:4000](localhost:4000).
6. Start sending those fake emails.
