import { commercialTypes } from './commercial.js';
export const categories = [
  {name:'정수기', key:'water', image:'water', color:'#edf3ff'},
  {name:'공기청정기', key:'air', image:'air.webp', color:'#fff0e4'},
  {name:'비데', key:'bidet', image:'bidet.jpg', color:'#fff0f5'},
  {name:'안마의자', key:'massage', image:'massage', color:'#f0ecff'},
  {name:'의류청정기', key:'clothing', image:'clothing.webp', color:'#e9f8f3'},
  {name:'인터넷', key:'internet', image:'internet.jpg', color:'#f0eeff'},
  {name:'에어컨', key:'ac', image:'category-aircon.jpg', color:'#e9f7f5'},
  {name:'냉난방기', key:'hvac', image:'category-hvac.jpg', color:'#eaf4ff'},
  {name:'세탁·건조기', key:'laundry', image:'laundry.webp', color:'#edf6f2'},
  {name:'음식물처리기', key:'food', image:'food.jpg', color:'#f8eef1'},
];
export const categoryTree = {
  '정수기':['전체 정수기','코웨이','LG전자구독','쿠쿠','SK매직','청호나이스','삼성','세라젬','현대큐밍','현대유버스','교원웰스','세스코','루헨스','풀무원'],
  '주방가전':['음식물처리기','식기세척기/건조기','커피머신','전기레인지','오븐/전자레인지','가스레인지','정수기','밥솥','주방후드','에어프라이어','블렌더/주서기','기타'],
  '생활가전':['무선청소기','로봇청소기','비데','반려동물용품','온수/전기매트','도어락','드라이기/헤어용품','미싱기','연수기'],
  '계절 / 환경':['공기청정기','공기살균기','환기가전','제습기','바이러스케어','향기컨설팅','가습기','집진기','서큘레이터'],
  '에어컨':['벽걸이','스탠드','2 in 1','창문형','천장형','이동형','산업용 에어컨'],
  '냉난방기':['벽걸이','스탠드','천장형','이동형'],
  '건강 / 뷰티':['헬스','안마의자','피부/미용기기','사우나/반신욕기','건강/의료기기','탈모치료기'],
  'TV / 디지털':['TV','전자칠판','노트북','컴퓨터','모니터','빔프로젝터','게임기/오락기','사운드바','프린터/복합기','액션캠'],
  '세탁가전':['세탁기','건조기','세탁기+건조기','의류관리기','신발관리기','다리미'],
  '냉장가전':['냉장고','김치냉장고','와인셀러','제빙기'],
  '레저 / 자동차':['전기자전거','전기스쿠터','피아노/전자드럼','캠핑용품','자동차용품'],
  '결합상품':['세탁기+건조기'],
  '가구 / 침대':['침대','소파','모션베드','건강침대','식탁/테이블','매트리스','침대프레임','책상/의자','수납가구'],
  '업소용':commercialTypes,
  '상조가전':['생활가전','계절/환경','가구/침대','냉장가전','건강/뷰티','주방가전','TV/디지털','세탁가전','레저/자동차','에어컨','냉난방기'],
  '인터넷':['인터넷 상담'],
};
export const products = [
  {id:'coway-icon', brand:'코웨이', name:'아이콘2 냉온정수기', model:'CHP-7211N_V2', tagline:'작은 공간에도, 깔끔하게', badge:'BEST 01', image:'water', thumbnails:['water'], category:'정수기', features:['냉온정','직수형','데스크탑'], colors:[{name:'글레이셔 화이트',hex:'#e7e8e6'},{name:'페블 그레이',hex:'#959594'}], monthlyPrice:21900, size:'180 × 340 × 385 mm', weight:'7.6 kg', function:'냉온정', type:'데스크탑', method:'직수형', detailImage:null, sample:true},
  {id:'lg-objet', brand:'LG전자', name:'퓨리케어 오브제컬렉션 정수기', model:'WD524VS', tagline:'주방의 분위기까지 생각한 정수기', badge:'BEST 02', image:'water-lg.webp', thumbnails:['water-lg.webp','water-lg-side.webp','water-lg-views.webp'], category:'정수기', features:['냉온정','직수형','방문관리'], colors:[{name:'카밍 베이지',hex:'#ded7c8'}], monthlyPrice:24900, size:null, weight:null, function:'냉온정', type:'데스크탑', method:'직수형', detailImage:null, sample:true},
  {id:'cuckoo-inspure', brand:'쿠쿠', name:'인스퓨어 미니100 정수기', model:'CP-AMS100EWH(S)', tagline:'매일 마시는 물, 더 산뜻하게', badge:'추천', image:'water-cuckoo.jpg', thumbnails:['water-cuckoo.jpg'], category:'정수기', features:['냉온정','직수형','슬림 디자인'], colors:[{name:'퓨어 화이트',hex:'#f0ede7'}], monthlyPrice:18900, size:null, weight:null, function:'냉온정', type:'데스크탑', method:'직수형', detailImage:null, sample:true},
  {id:'sk-magic', brand:'SK매직', name:'MEGA ICE 얼음정수기 mini', model:'WPUIAC606SNW', tagline:'우리 가족의 일상에 깨끗함을', badge:'추천', image:'water-sk', thumbnails:['water-sk'], category:'정수기', features:['얼음냉온정','직수형','방문관리'], colors:[{name:'화이트',hex:'#e8e8e7'}], monthlyPrice:22900, size:null, weight:null, function:'얼음냉온정', type:'데스크탑', method:'직수형', detailImage:null, sample:true},
];
