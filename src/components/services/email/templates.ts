export const reservationTemplate = (data: {
  userName: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  exchangeDate: string;
  exchangeMethod: string;
  exchangeDetails: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Подтверждение бронирования</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #333; margin-top: 0; margin-bottom: 20px; text-align: center;">
        Подтверждение бронирования обмена валюты
      </h2>
      
      <p style="color: #555;">Уважаемый ${data.userName},</p>
      
      <p style="color: #555;">Ваше бронирование обмена валюты успешно создано и находится в обработке.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Детали обмена:</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666;">Отдаете:</td>
            <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">
              ${data.fromAmount.toLocaleString('ru-RU')} ${data.fromCurrency}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Получаете:</td>
            <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">
              ${data.toAmount.toLocaleString('ru-RU')} ${data.toCurrency}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Дата обмена:</td>
            <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">
              ${data.exchangeDate}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Способ обмена:</td>
            <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">
              ${data.exchangeMethod}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Детали:</td>
            <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">
              ${data.exchangeDetails}
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;">
          <strong>Статус:</strong> В обработке
        </p>
      </div>
      
      <p style="color: #666; font-size: 14px; margin-top: 30px; text-align: center;">
        Если у вас возникли вопросы, пожалуйста, свяжитесь с нами:<br>
        Email: support@arbitration.finance<br>
        Телефон: +44 7467 191875
      </p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
        С уважением,<br>
        Команда Arbitration Finance
      </p>
    </div>
  </div>
</body>
</html>
`;