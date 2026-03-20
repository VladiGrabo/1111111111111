interface FirebaseUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'client' | 'admin';
  createdAt: string;
  updatedAt?: string;
}

interface FirebaseReservation {
  id: string;
  userId: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentDetails: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    bankName: string;
  };
  createdAt: string;
  updatedAt?: string;
}