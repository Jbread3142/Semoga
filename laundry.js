export const laundryTypes = ['세탁기', '건조기', '세탁기+건조기'];
export const isLaundryCategory = category => ['세탁·건조기', '세탁가전', ...laundryTypes].includes(category);

export function laundryType(product) {
  if (laundryTypes.includes(product.type)) return product.type;
  const text = [product.name, product.subcategory, product.type].filter(Boolean).join(' ');
  const washer = /세탁|미니워시/.test(text);
  const dryer = /건조/.test(text);
  if ((washer && dryer) || /워시타워|워시콤보|워시 콤보/.test(text)) return '세탁기+건조기';
  if (washer) return '세탁기';
  if (dryer) return '건조기';
  return null;
}
