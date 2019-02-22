const mongoose = require('mongoose');
const handlebars = require('handlebars');

const { generateEmailVerifyURL } = require('../utils/urlBuild');
const { EMAIL_TEMPLATE_NOTFOUND, EMAIL_VERIFY_TEMPLATE_ERROR } = require('../models/Errors');

const emailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

async function insertTemplates() {
  const templates = [
    {
      name: 'welcome',
      subject: 'Welcome',
      message: `{{userName}},
          <p>
            Thanks for signing up on our website
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>         
        `,
    },
    {
      name: 'invitation',
      subject: 'You are invited to join a Team at .com',
      message: `You've been invited to join <b>{{teamName}}</b>.
          <br/>Click here to accept the invitation: {{invitationURL}}
        `,
    },
    {
      name: 'email-verification',
      subject: 'Thanks for signing up at .com. Your are just one click away from verification',
      message: ` {{ userName }},
      <br />
      <p>
      Thanks for signing up. You have made a great choice.
      </p>
        <br/>Click here to verify your email {{emailVerificationURL}}
        `,
    },
  ];

  templates.forEach(async (t) => {
    if ((await EmailTemplate.countDocuments({ name: t.name })) === 0) {
      EmailTemplate.create(
        Object.assign({}, t, { message: t.message.replace(/\n/g, '').replace(/[ ]+/g, ' ') }),
      );
    }
  });
}

insertTemplates();

const getEmailTemplate = async (name, params) => {
  const source = await EmailTemplate.findOne({ name });
  if (!source) {
    throw new Error(EMAIL_TEMPLATE_NOTFOUND);
  }

  return {
    message: handlebars.compile(source.message)(params),
    subject: handlebars.compile(source.subject)(params),
  };
};

const generateEmailVerifyEmail = async ({ userName, email, token }) => {
  try {
    const emailVerificationURL = generateEmailVerifyURL(token);
    const emailTemplate = await getEmailTemplate('email-verification', { userName, emailVerificationURL });
    return {
      sender: '',
      recipient: email,
      subject: emailTemplate.subject,
      mailContent: emailTemplate.message,

    };
  } catch (err) {
    throw new Error(EMAIL_VERIFY_TEMPLATE_ERROR);
  }
};

module.exports = {
  EmailTemplate,
  getEmailTemplate,
  generateEmailVerifyEmail,
};
