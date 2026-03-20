import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await resend.emails.send({
      from: 'processing.arbitration@resend.dev',
      to,
      subject,
      html,
    });
    
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export function generateReservationEmail(data: {
  userName: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  exchangeDate: string;
  exchangeMethod: string;
  exchangeDetails: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Подтверждение бронирования обмена валюты</h2>
      
      <p>Уважаемый ${data.userName},</p>
      
      <p>Ваше бронирование обмена валюты успешно создано.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Детали обмена:</h3>
        <p>Отдаете: ${data.fromAmount} ${data.fromCurrency}</p>
        <p>Получаете: ${data.toAmount} ${data.toCurrency}</p>
        <p>Дата обмена: ${data.exchangeDate}</p>
        <p>Способ обмена: ${data.exchangeMethod}</p>
        <p>Детали: ${data.exchangeDetails}</p>
      </div>
      
      <p>Статус: <strong>В обработке</strong></p>
      
      <p style="color: #666; font-size: 14px;">
        С уважением,<br>
        Команда поддержки
      </p>
    </div>
  `;
}