import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MailService {
  constructor(private readonly httpService: HttpService){}

  async sendVerificationMail(recipient: string, verificationLink: string) {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    };
    const sender = 'swapucla@gmail.com'
    const templateId = 'd-3aa0b3e384c3435885429a34a66df0c5';
    const data = {
      from: {
        email: sender,
      },
      reply_to: {
        email: sender,
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
}
