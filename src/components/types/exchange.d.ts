interface ExchangeReservation {
  id: string;
  userId: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  paymentDetails: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    bankName: string;
  };
}