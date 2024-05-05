import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { generateWelcomeEmail } from '../template/welcome_email';
import { env } from 'process';
import { requestUserAccessKeyEmail } from '../template/grant_access_key';

@Injectable()
export class MailService {
  private readonly transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        ciphers:
          'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256',
      },
      authMethod: 'PLAIN',
    });
  }

  async sendWelcomeEmail(name: string, to: string) {
    const emailTemplate: string = generateWelcomeEmail(name);
    const mailOptions = {
      to,
      subject: 'Welcome To ProfBioresearch',
      text: emailTemplate,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendAccessKeyEmail(name: string, accessKey: string, to: string) {
    const emailTemplate: string = requestUserAccessKeyEmail(name, accessKey);
    const mailOptions = {
      from: env.SMTP_USER,
      to,
      subject: 'Your authentication access key',
      text: emailTemplate,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  // async sendPasswordResetEmail(
  //   to: string,
  //   names: string,
  //   encryptionKey: string,
  // ) {
  //   const emailTemplate: string = await generateResetPasswordEmailTemplate(
  //     names,
  //     encryptionKey,
  //   );
  //   const mailOptions = {
  //     from: env.SMTP_USER,
  //     to,
  //     subject: 'YOUR ACCOUNT PASSWORD RESET INSTRUCTIONS.',
  //     text: emailTemplate,
  //   };

  //   return await this.transporter.sendMail(mailOptions);
  // }
}
