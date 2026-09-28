export const airconTypes = ['벽걸이','스탠드','2 in 1','창문형','천장형','이동형','산업용 에어컨','냉난방기'];
export const isAirconCategory = category => ['에어컨','냉난방기','에어컨-냉난방기'].includes(category);

export function matchesAirconCategory(product, category) {
  if (!isAirconCategory(product.category)) return false;
  if (category === '에어컨-냉난방기') return true;
  const heating = matchesAirconType(product, '냉난방기');
  return category === '냉난방기' ? heating : category === '에어컨' && !heating;
}

// Keep imported categories intact; classify from explicit metadata and product names.
export function matchesAirconType(product, type) {
  if (type === '전체') return true;
  const text = [product.name, product.type, product.subcategory, product.function, ...(product.features || [])].filter(Boolean).join(' ');
  const patterns = {
    '벽걸이': /벽걸이/,
    '스탠드': /스탠드/,
    '2 in 1': /2\s*in\s*1|투인원/i,
    '창문형': /창문형/,
    '천장형': /천장형/,
    '이동형': /이동형|이동식/,
    '산업용 에어컨': /산업용|코끼리|특수형/,
    '냉난방기': /냉난방|냉온풍/,
  };
  return (type === '냉난방기' && product.category === '냉난방기') || !!patterns[type]?.test(text);
}
