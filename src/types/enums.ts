/**
 * Supported payment wallet types in the NabooPay ecosystem
 */
export enum Wallet {
  WAVE = 'WAVE',
  ORANGE_MONEY = 'ORANGE_MONEY',
  FREE_MONEY = 'FREE_MONEY',
  BANK = 'BANK',
}

/**
 * Available transaction status states
 */
export enum TransactionStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  DONE = 'done',
  PART_PAID = 'part_paid',
}
