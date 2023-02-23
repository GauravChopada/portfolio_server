"use strict"; // strict JS mode introduced in ES5

const express = require("express"); // web routing and resources application framework
const bodyParser = require("body-parser"); // for parsing HTTP requests and responses
const exphbs = require("express-handlebars"); // web template middleware engine
const path = require("path"); // core JS module for handling file paths
const nodemailer = require("nodemailer"); // module for handling emails
// const dotenv = require("dotenv"); // set up config for ".env" file
// dotenv.config();

const app = express(); // declare the application as an "express" web app

// Declare Static public resources directory
app.use("/public", express.static(path.join(__dirname, "public")));

// Declare view engine setup
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Explicitly declare routes ("express-handlebars" default route, from the root is "/views/layouts/")
app.get("/", (req, res) => {
	res.render("index", { layout: false }); // looks for the "/views/index.handlebars" file
});

// Handle the POST request sent to the "/sendEmail" route
app.post("/send", (req, res) => {
	// CREATE YOUR OWN EMBEDDED HTML TEMPLATE STRING WITH name, school, email, phone, and message CONTACT DETAILS
	const EMAIL_HTML_BODY = `
    <p><b>Name:</b> ${req.body.name}</p>
    <p><b>Email:</b> ${req.body.email}</p>
    <p><b>Message:</b> ${req.body.message}</p>`; // create the body of the email with embedded HTML

	const AUTH_ENV = {
		user: process.env.NM_EMAIL_ADDR,
		pass: process.env.NM_EMAIL_PASS,
	};

	// Create reusable transporter object defined with the NodeMailer module
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: AUTH_ENV,
	});

	// Setup email data object
	let mailOptions = {
		from: `"${req.body.name}" <${AUTH_ENV.user}>`, // sender address
		to: `${req.body.email}`, // comma separated list of receivers
		// cc: null, // carbon copy option address option
		// bcc: null, // blind carbon copy address option
		subject: "Using Nodemailer", // Subject line
		html: EMAIL_HTML_BODY, // html body
		// attachments: [], // list/array of objects ; can rename the file if desired
	};

	// Send mail with defined transport object
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
			res.render("index", {
				msg:
					'<div class="alert alert-danger" role="alert">Contact request email FAILED to send.</div>',
				layout: false,
			});
		} else {
			console.log("Message sent: %s", info.messageId);
			res.render("index", {
				msg:
					'<div class="alert alert-success" role="alert">Contact request email SUCCESSFULLY sent.</div>',
				layout: false,
			});
		}
	});
});

// START SEVER LISTENING ON PORT
let port = process.env.PORT || 5000;

// HERE
app.listen(port, () => console.log(`Listening on port ${port}`));
