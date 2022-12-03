import sendGrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

interface MailSenderDetail {
  to: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

/**
 *
 * @param details
 */
const sendMail = async (details: MailSenderDetail) => {
  const templateFile = fs.readFileSync(
    path.join(__dirname + `/mail-templates/${details.template}.templates.handlebars`),
    "utf-8",
  );
  const template = handlebars.compile(templateFile);

  sendGrid.setApiKey(process.env.MAIL_API_KEY);

  const detail: sendGrid.MailDataRequired = {
    from: process.env.MAIL_SENDER,
    to: details.to,
    subject: details.subject,
    html: template(details.data),
  };
  // return;
  try {
    const result = await sendGrid.send(detail);
    logger.success("Mail Sent Successfully", result);
  } catch (err) {
    logger.error("Send Mail Error", err);
  }
};

export default sendMail;
