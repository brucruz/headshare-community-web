import { PagarmeError } from '../dtos/PagarmeError';
import { PagarmeZipcodeResponse } from '../dtos/PagarmeZipcodeResponse';
import { connectToPagarMe } from './connectToPagarme';
import { handleErrorPagarme } from './handleErrorPagarme';

interface Response {
  address?: PagarmeZipcodeResponse;
  errors: PagarmeError[];
}

export async function addressFromZipcodePagarme(
  zipcode: string,
): Promise<Response> {
  const client = await connectToPagarMe();

  let address: PagarmeZipcodeResponse;

  try {
    address = await client.zipcodes.find({ zipcode });

    address.neighbourhood = address.neighborhood && address.neighborhood;

    return { address, errors: [] };
  } catch (err) {
    return { errors: await handleErrorPagarme(err) };
  }
}
