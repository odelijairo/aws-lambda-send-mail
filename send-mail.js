const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_SES_REGION
})
const ses = new AWS.SES({ apiVersion: process.env.AWS_SES_API_VERSION })

module.exports = function sendEmail(event) {

  return new Promise((resolve, reject) => {
    // this must relate to a verified SES account
    const from = process.env.FROM_NAME + ' <' + process.env.FROM_EMAIL + '>'
    const params = {
      Source: from,
      Destination: { ToAddresses: [process.env.TO_EMAIL] },
      Message: {
        Subject: {
          Data: 'Mensagem recebida',
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: createEmailContent(event),
            Charset: 'UTF-8'
          }
        }
      }
    }
    console.log('e-mail params:', params)

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.error('Failed to send the email:', err.stack || err)
        reject(err)
      } else {
        console.log('e-mail sent:', data)
        resolve(data)
      }
    })
  })
}

const createEmailContent = event => {
  return `Mensagem recebida!

Nome: ${event.name}
E-mail: ${event.mail}
Telefone: ${event.phone}
Mensagem: ${event.message}`;
}
