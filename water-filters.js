export const waterFilterGroups = [
  {key:'feature',label:'기능',values:['냉정','온정','냉온정','정수','살균','얼음','탄산','커피']},
  {key:'shape',label:'형태',values:['스탠드','데스크탑','언더싱크']},
  {key:'method',label:'정수방식',values:['직수형','탱크형']},
];

export function matchesWaterFilter(product, key, value) {
  if (!value || value === '전체') return true;
  const features=(product.features || []).join(' ');
  if (key === 'shape') return `${product.type || ''} ${features}`.replaceAll('테스크탑','데스크탑').includes(value);
  if (key === 'method') return `${product.method || ''} ${features}`.includes(value === '직수형' ? '직수' : '탱크');
  if (key !== 'feature') return false;
  const text=`${product.function || ''} ${features}`;
  if(value === '정수')return /(?:^|[\s,·/])정수(?:전용)?(?:$|[\s,·/])/.test(text);
  if(value === '온정')return text.replaceAll('냉온정','').includes('온정');
  return text.includes(value);
}
