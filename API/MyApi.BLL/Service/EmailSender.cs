using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace MyApi.BLL.Service
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public async Task SendEmailAsync(
            string email,
            string subject,
            string htmlMessage)
        {

            var mail = new MimeMessage();


            mail.From.Add(
                new MailboxAddress(
                    "Hotelio",
                    _configuration["EmailSettings:Email"]
                )
            );


            mail.To.Add(
                MailboxAddress.Parse(email)
            );


            mail.Subject = subject;


            mail.Body = new TextPart("html")
            {
                Text = htmlMessage
            };


            using var smtp = new SmtpClient();


            await smtp.ConnectAsync(
                "smtp.gmail.com",
                587,
                SecureSocketOptions.StartTls
            );


            await smtp.AuthenticateAsync(
                _configuration["EmailSettings:Email"],
                _configuration["EmailSettings:Password"]
            );


            await smtp.SendAsync(mail);


            await smtp.DisconnectAsync(true);
        }
    }
}