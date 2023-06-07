export interface IStripePay {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}

export interface IPaymentState {
  massage: string;
  isLoading: boolean;
  error: string;
}
