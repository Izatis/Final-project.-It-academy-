export interface IStripePay {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}

export interface IPaymentState {
  message: string;
  isLoading: boolean;
  error: string;
}
