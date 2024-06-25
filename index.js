"use strict"; // strict JS mode introduced in ES5

const express = require("express"); // web routing and resources application framework
const bodyParser = require("body-parser"); // for parsing HTTP requests and responses
const path = require("path"); // core JS module for handling file paths
const nodemailer = require("nodemailer"); // module for handling emails
const dotenv = require("dotenv"); // set up config for ".env" file
const cors = require("cors");
dotenv.config();

const app = express(); // declare the application as an "express" web app

// Declare Static public resources directory
app.use("/public", express.static(path.join(__dirname, "public")));

const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Explicitly declare routes ("express-handlebars" default route, from the root is "/views/layouts/")
app.get("/", (req, res) => {
	res.status(200).send('I am GRooT ☘️ \n version: 1.3'); // looks for the "/views/index.handlebars" file
});

app.post("/send", (req, res) => {

	if (req.body.name === undefined || req.body.name === null || req.body.name === '' || req.body.email === undefined || req.body.email === null || req.body.email === '' || req.body.message === undefined || req.body.message === null || req.body.message === '' || req.body.subject === undefined || req.body.subject === null || req.body.subject === '' || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.email) === false) {
		res.status(401).send({ message: 'invalid params', errors: [err] })
	}

	// CREATE YOUR OWN EMBEDDED HTML TEMPLATE STRING WITH name, school, email, phone, and message CONTACT DETAILS
	const EMAIL_HTML_BODY = `
    <p><b>Name:</b> ${req.body.name}</p>
    <p><b>Email:</b> ${req.body.email}</p>
    <p><b>Via:</b> Via Accuwrap Website</p>
    <p><b>Message:</b> ${req.body.message}</p>`; // create the body of the email with embedded HTML

	// Create reusable transporter object defined with the NodeMailer module
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.NM_EMAIL_ADDR,
			pass: process.env.NM_EMAIL_PASS
		}
	});

	// Setup email data object
	let mailOptions = {
		from: `"Accuwrap Website" <${process.env.NM_EMAIL_ADDR}>`,
		to: 'gauravrchopada65@gmail.com, Bhavyaantala02@gmail.com, accuwrap.packaging@gmail.com, viralprajapati2401@gmail.com',
		subject: `${req.body.subject}`,
		html: EMAIL_HTML_BODY,
	};

	// Send mail with defined transport object
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: 'something went wrong', errors: [err] })
		} else {
			console.log("Message sent: %s", info.messageId);
			res.status(200).send('mail sent successfully')
		}
	});
});

// START SEVER LISTENING ON PORT
let port = process.env.PORT || 4000;

// HERE
app.listen(port, () => console.log(`Listening on port ${port}`));
