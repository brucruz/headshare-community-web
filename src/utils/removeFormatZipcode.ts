export function removeFormatZipcode(formattedZipcode: string): string {
  const zipcode = formattedZipcode.replace('-', '').trim();

  return zipcode;
}
