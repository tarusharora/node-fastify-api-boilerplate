// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

const nodemailer = require('nodemailer');
const nconf = require('nconf');

// Set the region
AWS.config = new AWS.Config();
AWS.config.update({ region: nconf.get('keys.aws.region') });
AWS.config.accessKeyId = nconf.get('keys.aws.accessKeyId');
AWS.config.secretAccessKey = nconf.get('keys.aws.secretAccessKey');

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
  }),
});

// send some mail

const sendEmail = ({
  from, to, subject, message,
}) => new Promise((resolve, reject) => {
  transporter.sendMail({
    from,
    to,
    subject,
    html: message,
  }, (err, info) => {
    if (err) {
      reject(err);
    } else {
      resolve(info);
    }
  });
});


module.exports = {
  sendEmail,
};
