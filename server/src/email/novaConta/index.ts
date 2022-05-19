import NodeMailer from "nodemailer";
import { bodyNovaConta } from "./HTML";

class EmailNovaConta {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string
  ) {}

  async sendEmail() {
    const transporter = NodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "kaiquemdasd82@gmail.com",
        pass: "klealn1001",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailSent = await transporter.sendMail({
      text: "asdasdasdasd",
      subject: "Novo chamado.",
      from: "HELP_DESK",
      to: this.to,
      html: `
        <html>
        <body>
         ${bodyNovaConta(this.subject || "sem assunto", this.to || "sem email")}
        </body>
      </html> 
        `,
    });

    console.log(mailSent);
  }
}

export default EmailNovaConta;
