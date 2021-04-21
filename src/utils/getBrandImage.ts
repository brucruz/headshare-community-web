import creditCardBrands, { GENERIC } from '../constants/creditCardBrands';

export function getBrandImage(brand: string): string {
  const brandsUrls = [] as { brand: string; url: string }[];

  // Object.assign(brandsURLObj, forEach())
  Object.keys(creditCardBrands).forEach(key => {
    const obj = {} as { brand: string; url: string };

    Object.assign(obj, {
      brand: key as keyof typeof creditCardBrands,
      url: creditCardBrands[key as keyof typeof creditCardBrands],
    });

    brandsUrls.push(obj);
  });

  const brandUrl = brandsUrls.find(item => item.brand === brand.toUpperCase());

  const url = brandUrl ? brandUrl.url : GENERIC;

  return url;
}
