export const waterFilterGroups = [
  {key:'feature',label:'기능',values:['냉온정','얼음','정수전용','냉정','온정','탄산','커피']},
  {key:'shape',label:'형태',values:['데스크형','스탠드형','언더싱크형']},
  {key:'method',label:'정수방식',values:['직수형','탱크형','워터팩형']},
];

export function matchesWaterFilter(product, key, value) {
  if (!value || value === '전체') return true;
  const features=(product.features || []).join(' ');
  if (key === 'shape') {
    const shape={'데스크형':'데스크탑','스탠드형':'스탠드','언더싱크형':'언더싱크'}[value] || value;
    return `${product.type || ''} ${features}`.replaceAll('테스크탑','데스크탑').includes(shape);
  }
  if (key === 'method') {
    const term={'직수형':'직수','탱크형':'탱크','워터팩형':'워터팩'}[value];
    return !!term && `${product.method || ''} ${features}`.includes(term);
  }
  if (key !== 'feature') return false;
  const text=`${product.function || ''} ${features}`;
  if(value === '얼음')return /얼음|아이스 스탠드/.test(`${text} ${product.name || ''}`);
  if(value === '정수전용' || value === '정수')return /(?:^|[\s,·/])정수(?:전용)?(?:$|[\s,·/])/.test(text);
  if(value === '온정')return text.replaceAll('냉온정','').includes('온정');
  return text.includes(value);
}
