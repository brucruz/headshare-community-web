export function removeFormatCardNumber(formattedCardNumber: string): string {
  const cardNumber = formattedCardNumber.replace(' ', '').trim();

  return cardNumber;
}
