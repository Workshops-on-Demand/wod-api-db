var express = require("express"),
  router = express.Router(),
  app = express(),
  cors = require("cors"),
  dotenv = require("dotenv"),

dotenv.config();

const fromEmailAddress = process.env.WODSENDER;
const toEmailAddress = process.env.TO_EMAIL_ADDRESS;
const sendGridAPIKey = process.env.WODSENDGRIDAPIKEY;

router.post("/sendmail", (req, res, next) => {
  if ((!sendGridAPIKey) || (sendGridAPIKey === "None")) {
	console.log('No sendgrid key defined');
  } else {
    var sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(sendGridAPIKey);
    var name = req.body.name;
    var email = req.body.email;
    var company = req.body.company;
    var notebookList = req.body.notebookList;
    var bookingPeriod = req.body.bookingPeriod;

    var content = ` Name: ${name}\n Email ID: ${email}\n Company: ${company}\n Notebook List: ${notebookList}\n Booking Period: ${bookingPeriod}\n `;
  
    var mail = {
      from: fromEmailAddress,
      to: toEmailAddress, // Change to email address that you want to receive messages on
      subject: `New notebooks booking request from ${name}`,
      text: content
    };

    sgMail.send(mail, (err, data) => {
      if (err) {
        res.send("fail");
      } else {
        res.send("success");
      }
    });
  }
});

app.use(cors());
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT || 3010;
app.listen(PORT, function() {
  console.log("Node.js server is running on port " + PORT);
});
