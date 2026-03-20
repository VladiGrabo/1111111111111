import { Resend } from 'resend';
import { EMAIL_CONFIG } from '../../config/email';
import { reservationTemplate } from './templates';

const resend = new Resend(EMAIL_CONFIG.resendApiKey);

interface EmailData {
  userName: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  exchangeDate: string;
  exchangeMethod: string;
  exchangeDetails: string;
}

// Максимальное количество попыток отправки
const MAX_RETRIES = 3;
// Задержка между попытками (в миллисекундах)
const RETRY_DELAY = 1000;

// Функция для задержки
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendEmail(to: string, subject: string, html: string) {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_CONFIG.senderEmail,
        to: [to],
        subject,
        html,
        reply_to: EMAIL_CONFIG.supportEmail,
        headers: {
          'X-Entity-Ref-ID': crypto.randomUUID(),
          'X-Attempt': attempt.toString(),
        }
      });

      if (error) {
        throw new Error(error.message || 'Ошибка API Resend');
      }

      if (!data?.id) {
        throw new Error('Не получен ID отправленного письма');
      }

      // Если успешно, возвращаем результат
      return true;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Неизвестная ошибка');
      console.warn(`Attempt ${attempt} failed:`, lastError.message);

      // Если это не последняя попытка, ждем перед следующей
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY * attempt); // Увеличиваем задержку с каждой попыткой
        continue;
      }
    }
  }

  // Если все попытки неудачны, логируем ошибку и возвращаем false
  console.error('All email sending attempts failed:', lastError);
  return false;
}

export function generateReservationEmail(data: EmailData) {
  return reservationTemplate(data);
}