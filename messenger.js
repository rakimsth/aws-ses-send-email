const config = require("config");
const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const ses = require("nodemailer-ses-transport");
const app_url = "your-website-url"; // change-it
const transporter = nodemailer.createTransport(
  ses({
    accessKeyId: "your-access-key",
    secretAccessKey: "your-secret-key"
  })
);

handlebars.registerHelper("host_url", () => app_url);

const Templates = {
//your email templates
  bloodRequest: {
    from: "Github <rakimsth@github.com>", //change it
    subject: "Email using SES!", //change it
    html: __dirname + "/../public/templates/email_template.htm" //change it
  }
};

class Messenger {
  constructor() {}

  getTemplate(name) {
    return Templates[name];
  }

  getHtmlBody(name, data) {
    let template = this.getTemplate(name);
    if (!template) return null;

    let text = fs.readFileSync(template.html, { encoding: "utf-8" });
    var hTemplate = handlebars.compile(text);
    return hTemplate(data);
  }

  send(payload) {
    let me = this;

    let template = this.getTemplate(payload.template);
    if (!template) throw new Error("No template is defined");
    if (!payload.to) throw new Error("No receipent was specified");

    if (payload.subject) {
      template.subject = payload.subject;
    }
    return transporter.sendMail({
      from: template.from,
      subject: template.subject,
      to: payload.to,
      html: me.getHtmlBody(payload.template, payload.data)
    });
  }
}

module.exports = new Messenger();
