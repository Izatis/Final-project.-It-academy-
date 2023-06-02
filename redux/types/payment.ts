export interface IStripePay {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}

export interface IPaymentState {
  isLoading: boolean;
  error: string;
}
