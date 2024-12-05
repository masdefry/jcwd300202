import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'roomify.inc@gmail.com',
        pass: 'bashfpyvihylxiec'
    },
    tls: {
        rejectUnauthorized: false
    }

})