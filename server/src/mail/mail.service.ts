import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MailService {

  private SERVICE_EMAIL: string;

  constructor(private readonly httpService: HttpService){
    this.SERVICE_EMAIL = 'swapucla@gmail.com';
  }

  async sendVerificationMail(recipient: string, verificationLink: string) {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    };
    const templateId = 'd-3aa0b3e384c3435885429a34a66df0c5';
    const data = {
      from: {
        email: this.SERVICE_EMAIL,
      },
      reply_to: {
        email: this.SERVICE_EMAIL,
      },
      personalizations: [
        {
          to: [
            {
              email: recipient,
            },
          ],
          subject: 'UCLA Swap Email Verification',
          dynamic_template_data: {
              link: verificationLink,
          },
        },
      ],
      template_id: templateId,
    };
    const res = await lastValueFrom(this.httpService.post(url, data, { headers }));
    // console.log(res);
    return res;
  }

  async sendPasswordResetMail(recipient: string, resetLink: string) {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    };
    const templateId = 'd-c6c69fa5ab864909bbe493ae67252740';
    const data = {
      from: {
        email: this.SERVICE_EMAIL,
      },
      reply_to: {
        email: this.SERVICE_EMAIL,
      },
      personalizations: [
        {
          to: [
            {
              email: recipient,
            },
          ],
          subject: 'UCLA Swap Email Verification',
          dynamic_template_data: {
              link: resetLink,
          },
        },
      ],
      template_id: templateId,
    };
    const res = await lastValueFrom(this.httpService.post(url, data, { headers }));
    // console.log(res);
    return res;
  }

}
