import NodeMailer from "nodemailer";
import { bodyChamado } from "./HTML";

class EmailNovoChamado {
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
         ${bodyChamado(this.subject || "sem resumo")}
        </body>
      </html> 
        `,
    });

    console.log(mailSent);
  }
}

export default EmailNovoChamado;
