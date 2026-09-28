export const priceRanges = [
  {label:'전체',min:0,max:Infinity},
  {label:'1만원 미만',min:0,max:10000},
  {label:'1만원대',min:10000,max:20000},
  {label:'2만원대',min:20000,max:30000},
  {label:'3만원대',min:30000,max:40000},
  {label:'4만원대',min:40000,max:50000},
  {label:'5~7만원대',min:50000,max:80000},
  {label:'8~9만원대',min:80000,max:100000},
  {label:'10만원 이상',min:100000,max:Infinity},
];
export function brandName(value='') {
  const name=String(value).trim();
  return ['LG','LG전자','LG전자구독'].includes(name)?'LG전자':name;
}
export function matchesPrice(product, label) {
  if(label==='전체')return true;
  const range=priceRanges.find(r=>r.label===label);
  const price=Number(product.monthlyPrice);
  return !!range && Number.isFinite(price) && price>0 && price>=range.min && price<range.max;
}
