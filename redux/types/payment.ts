export interface IStripePay {
  courseId: number;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

export interface IPaymentState {
  isLoading: boolean;
  error: string;
}
