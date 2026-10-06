import { classifyCommercialName } from './commercial-rules.js';
// The spreadsheet's 제품유형 values and the commercial directory use these labels.
export const commercialTypes = [
  '스탠드 냉장고', '테이블 냉장고', '반찬 냉장고', '김밥/토핑 냉장고',
  '서랍식 냉장고', '우유서랍 냉장고', '육수/슬러시 냉장고', '제빙기',
  '고기 숙성고', '김치 냉장고', '참치 냉동고', '튀김기', '기름정제기',
  '냉동 쇼케이스', '냉/온장 쇼케이스', '음식물처리기',
  '음료 쇼케이스', '제과/마카롱 쇼케이스', '블라스트칠러', '와인셀러',
  '식기세척기', '식기소독장', '가스레인지', '인덕션', '그리들/부침기',
  '구이기', '취반기/국솥', '오븐/발효기', '진공포장기', '라면 조리기',
  '김밥기계/절단기', '제과기계', '정수기', '공기청정기', '비데',
  '서빙/물류로봇', '청소로봇/청소기', '위생/방향기기', '핸드드라이어',
  '에어커튼', '콤프레샤', '프린터/복합기', '결제단말기/테이블오더',
];
export const isCommercialProduct = product => product.category === '업소용' || !!product.commercialType;
export function commercialProductType(product) {
  if (product.commercialType) return product.commercialType;
  if (product.category !== '업소용') return null;
  if (commercialTypes.includes(product.type)) return product.type;
  return classifyCommercialName(product.name);
}
export function normalizeCommercialProduct(product) {
  const type = commercialProductType(product);
  return type && !product.commercialType ? {...product, commercialType:type} : product;
}
export function matchesCommercialType(product, type = '전체') {
  return isCommercialProduct(product) && (type === '전체' || commercialProductType(product) === type);
}
export function commercialHref(type = '전체') {
  return `?page=catalog&category=${encodeURIComponent('업소용')}${type === '전체' ? '' : `&type=${encodeURIComponent(type)}`}`;
}
