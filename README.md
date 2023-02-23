# Nodemailer

[![Run on Repl.it](https://replit.com/badge/)](https://replit.com/@oneminch/node-mailer?v=1#app.js)

This project uses [nodemailer](https://nodemailer.com/about/) to 'send' emails from an [Ethereal](https://ethereal.email) account to an email specified in the form input. Since Ethereal accounts are fake and for testing purposes, emails don't actually get delivered. But you can still see the email sent from the sender email inbox. To send emails that get delivered, use another email provider and you'll need to configure the `nodemailer.createTransport()` function in [app.js](https://github.com/oneminch/nodemailer/blob/master/app.js). 

**Note** I have also chosen to upload the `.env` file here for demo purposes. Obviously, this is not a good practice but in my case it doesn't contain any sensitive info. It holds the email address and password of an Ethereal account I created, and in case you want to deploy this on some cloud, you will probably need that file. To view sent messages, you'll need to create your own Ethereal account. You can do so [here](https://ethereal.email). 

**DON'T UPLOAD YOUR ENV FILE TO A PUBLIC REPO IF IT CONTAINS SENSITIVE INFO.**

Since this is a node project it needs to be run in a node environment.

### Locally

To run and test this locally, follow these steps (assuming you have Node.js installed):
1. Download/clone the project
2. In the project folder, on you terminal, run `npm install`
3. As described above, create an [Ethereal](https://ethereal.email) account (if you want to just test the project)
4. Copy and paste the email address (*NM_EMAIL_ADDR*) and password (*NM_EMAIL_PASS*) values to the `.env` file
5. To test as you code, run `npm run dev`. This will watch changes and run this project whenever you save at localhost on port 5000 - [localhost:5000](localhost:5000). 
6. To run the project, run `npm run start`. This is the same as above but would require restarting if you make any changes to app.js - [localhost:5000](localhost:5000).
7. Start sending those fake emails.
