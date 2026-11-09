import { brandName } from './catalog-filters.js?v=f061f20626e84f74';
import { matchesWaterFilter } from './water-filters.js?v=bd681181a6ae7728';

// Keep this display order independent of catalog import order and rental prices.
export const homeWaterBrands = ['LG전자','SK매직','코웨이','쿠쿠','현대큐밍','현대유버스','청호나이스','세스코'];
export const homeWaterTypes = ['냉온정수기','얼음정수기','정수전용'];
// Curated from the models already imported into the catalog. No inferred launch
// dates or NEW labels: replace a model here when newer crawl data is approved.
const featuredModels = {
  냉온정수기: ['WD524VCT','WPU-MAC306SWH','CHP-7220N','CP-AMS100EWH','HQPD11CC0G','WHCD-96HN','WP-50C90621N','EWBD151'],
  얼음정수기: ['WD724RE','WPU-IAC606S','CHPI-7430N','CP-AQS100EWH','HQPI73CG0E','WHCI-25HN','WI-37C90720N','EWDD951'],
  정수전용: ['WD121MCB','WPU-GBC102S','P-6320L','CP-AKS011GB','HQPM15C','WPD24HU','WP-43C60000M','EW-210'],
};
export function matchesHomeWaterType(product,type) {
  if(product.category !== '정수기')return false;
  // Some crawl rows omit ice from function; the product name still identifies it.
  const ice = /얼음|아이스 스탠드/.test(`${product.function||''} ${product.name||''}`);
  if(type==='얼음정수기')return ice;
  if(type==='냉온정수기')return !ice && matchesWaterFilter(product,'feature','냉온정');
  if(type==='정수전용')return !ice && matchesWaterFilter(product,'feature','정수');
  return false;
}
export function homeWaterProducts(products,type=homeWaterTypes[0]) {
  const models=featuredModels[type];
  if(!models)return [];
  return homeWaterBrands.flatMap((brand,index)=>{
    const list=products.filter(p=>brandName(p.brand)===brand && matchesHomeWaterType(p,type));
    const product=list.find(p=>p.model===models[index])||list[0];
    return product?[product]:[];
  });
}

// Coway release announcements and product specifications, by catalog model.
// Month-only dates use day 00. Models with no confirmed date keep catalog order.
const cowayWaterReleaseDates = {
  'CHPCI-8400N':20260901,
  'CHP-7211N_V2':20260612, 'CP-7211N_V2':20260612,
  'CHPI-5820L':20260304,
  'CHP-7220N':20260212, 'CP-7220N':20260212,
  'CHPI-5830L':20251203,
  'CHP-5730L_WT':20250917, 'CHP-5730R_WT':20250917, 'CHP-5730N_WT':20250900,
  'P-2210N':20250900,
  'CHPI-7420N':20250821,
  'CHPI-7430N':20250724,
  'CHPI-7410N':20250709, 'CPI-7410N':20250709,
  'CHP-1111N':20250522,
  'CHP-7212N':20250514,
  'CHPI-7521L':20250422,
  'P-2200N':20250416,
  'CHP-5711L':20240300, 'CHP-5711R':20240300,
  'CHP-6340L':20230700, 'CP-6340L':20230700,
  'CHP-5720L':20221200,
  'CHPI-5810L':20220727,
  'CHPI-7400N':20220616, 'CPI-7400N':20220616,
  'CHP-8310L':20220104,
  'CHP-8210N':20211203,
  'CHP-8200N':20211102, 'CP-8200N':20211102,
  'CHP-3140N':20211029,
  'P-6320L':20210528,
  'CPSI-8510L':20200531,
  'CHPI-7511L':20200527, 'CPI-7511L':20200527,
  'CHPI-5801L':20180900,
  'CHP-5700R':20180814,
  'CHPI-620L':20161200,
  'CHP-264L':20160700, 'P-350N':20160700,
  'CHP-700L':20100100,
};

function cowayWaterShapeRank(product) {
  if (matchesWaterFilter(product,'shape','데스크형')) return 0;
  if (matchesWaterFilter(product,'shape','스탠드형')) return 1;
  return 2;
}

function newestCowayWaterProducts(list) {
  return [...list].sort((a,b) => cowayWaterShapeRank(a)-cowayWaterShapeRank(b) ||
    (cowayWaterReleaseDates[b.model] ?? 0)-(cowayWaterReleaseDates[a.model] ?? 0));
}

// Prioritize the same brand representatives on the category page, preserving
// the current filters and keeping every other matching product in crawl order.
export function prioritizeWaterProducts(list, products, feature='전체', brand='전체') {
  if (brandName(brand) === '코웨이') return newestCowayWaterProducts(list);
  const types=feature==='전체'?['냉온정수기','얼음정수기']:
    feature==='냉온정'?['냉온정수기']:feature==='얼음'?['얼음정수기']:[];
  if(!types.length)return list;
  const priority=new Map();
  for(const type of types)for(const product of homeWaterProducts(products,type)) {
    if(!priority.has(product.id))priority.set(product.id,priority.size);
  }
  return [...list].sort((a,b)=>(priority.get(a.id)??Infinity)-(priority.get(b.id)??Infinity));
}
