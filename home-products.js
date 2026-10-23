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

// Prioritize the same brand representatives on the category page, preserving
// the current filters and keeping every other matching product in crawl order.
export function prioritizeWaterProducts(list, products, feature='전체') {
  const types=feature==='전체'?['냉온정수기','얼음정수기']:
    feature==='냉온정'?['냉온정수기']:feature==='얼음'?['얼음정수기']:[];
  if(!types.length)return list;
  const priority=new Map();
  for(const type of types)for(const product of homeWaterProducts(products,type)) {
    if(!priority.has(product.id))priority.set(product.id,priority.size);
  }
  return [...list].sort((a,b)=>(priority.get(a.id)??Infinity)-(priority.get(b.id)??Infinity));
}
