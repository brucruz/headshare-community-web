export interface BinSearch {
  bank?: {
    name: string;
    phone: string;
    url: string;
  };
  country?: {
    alpha2: string;
    currency: string;
    emoji: string;
    latitude: number;
    longitude: number;
    name: string;
    numeric: string;
  };
  number?: {
    length: string;
    luhn: string;
  };
  type?: string;
  brand?: string;
  prepaid?: boolean;
  scheme?: string;
}

interface Response {
  cardBin?: BinSearch;
  error?: 'Cartão inválido';
}

export async function fetchCardBinData(cardNumber: string): Promise<Response> {
  try {
    const response = await fetch(`https://lookup.binlist.net/${cardNumber}`, {
      method: 'GET',
      headers: { 'Accept-Version': '3' },
    });

    return { cardBin: await response.json() };
  } catch (err) {
    return { error: 'Cartão inválido' };
  }
}
