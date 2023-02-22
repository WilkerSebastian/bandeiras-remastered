
import nodemailer from "nodemailer"

export default class EmailManeger {

    private transporter

    constructor() {

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

    }

    public sendEmail(url:string , user:{nome:string,email:string}) {

        const {nome, email} = user

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `Confirmação de registro bandeiras`,
            text: `Olá, para finalizar seu cadastro no site bandeiras é necessario para acessar esse link para ativar sua conta. ${url + nome}`
        };

        this.transporter.sendMail(mailOptions)

    }

}