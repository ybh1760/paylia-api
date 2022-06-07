export interface ITossPayment {
  mId: string;
  version: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  currency: string;
  method: string;
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED';
  requestedAt: Date;
  approvedAt: Date;
  useEscrow: boolean;
  cultureExpense: boolean;
  card: {
    company: string;
    number: string;
    installmentPlanMonths: number;
    isInterestFree: boolean;
    interestPayer: null;
    approveNo: string;
    useCardPoint: boolean;
    cardType: string;
    ownerType: string;
    acquireStatus: string;
    receiptUrl: string;
  };
  virtualAccount: {
    accountType: '일반' | '고정';
    accountNumber: string;
    bank: string;
    customerName: string;
    dueDate: Date;
    refundStatus:
      | 'NONE'
      | 'FAILED'
      | 'PENDING'
      | 'PARTIAL_FAILED'
      | 'COMPLETED';
    expired: boolean;
    settlementStatus: 'INCOMPLETE' | 'COMPLETE';
  };
  secret: string;
  type: string;
  easyPay: string;
  country: string;
  failure: {
    code: string;
    message: string;
  };
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
}
