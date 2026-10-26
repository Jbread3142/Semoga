import { business } from './contact.js?v=1495fb2b982c0aa5';
import { isCommercialProduct } from './commercial.js?v=4a2a860e2aeb6419';
import { lowestPlan } from './rental.js?v=ce82df1a70f6d827';
import { rentalDescription } from './tv.js?v=e2f495faa5ff9342';

export const pagePaths = {partner:'/partners/'};
export const siteOrigin = 'https://semoga.kr';
export const homeTitle = '세모가렌탈 | 정수기·생활가전 렌탈·인터넷';
export const homeDescription = '정수기 렌탈부터 공기청정기·비데·안마의자·세탁건조기·에어컨, 업소용 가전과 인터넷까지. 세모가렌탈에서 브랜드별 요금과 약정·관리 조건을 비교하고 상담하세요.';
export const normalizeCategory = name => ({'피부/미용기기':'피부미용기기','빔프로젝트':'빔프로젝터'}[name]) || (name === '식기세척기/건조기' ? '식기세척기' : /^tv(?:\/디지털)?$/i.test(String(name || '').replace(/\s+/g,'')) ? 'TV' : name);
export const searchCategories = [
  ['정수기','water'], ['공기청정기','air'], ['비데','bidet'], ['안마의자','massage'],
  ['의류청정기','clothing'], ['인터넷','internet'], ['에어컨','aircon'],
  ['냉난방기','hvac'], ['세탁·건조기','laundry'], ['음식물처리기','food'], ['업소용','commercial'], ['TV','tv'], ['로봇청소기','robot-vacuum'], ['무선청소기','cordless-vacuum'], ['식기세척기','dishwasher'], ['전기레인지','electric-range'], ['헬스','fitness'], ['커피머신','coffee-machine'], ['냉장고','refrigerator'], ['김치냉장고','kimchi-refrigerator'],
  ['가스레인지','gas-range'], ['가습기','humidifier'], ['건강/의료기기','health-medical'], ['게임기/오락기','gaming'], ['공기살균기','air-sterilizer'], ['기타','other-kitchen'], ['노트북','laptop'], ['도어락','door-lock'], ['드라이기/헤어용품','hair-care'], ['모니터','monitor'], ['미싱기','sewing-machine'], ['바이러스케어','virus-care'], ['반려동물용품','pet-care'], ['밥솥','rice-cooker'], ['블렌더/주서기','blender-juicer'], ['빔프로젝터','projector'], ['사우나/반신욕기','sauna'], ['사운드바','soundbar'], ['서큘레이터','circulator'], ['에어프라이어','air-fryer'], ['연수기','water-softener'], ['오븐/전자레인지','oven-microwave'], ['온수/전기매트','heated-mat'], ['전자칠판','interactive-display'], ['제습기','dehumidifier'], ['주방후드','kitchen-hood'], ['집진기','dust-collector'], ['컴퓨터','computer'], ['탈모치료기','scalp-care'], ['프린터/복합기','printer'], ['피부미용기기','beauty'], ['향기컨설팅','fragrance'], ['환기가전','ventilation'],
  ['건강침대','health-bed'], ['다리미','iron'], ['매트리스','mattress'], ['모션베드','adjustable-bed'], ['소파','sofa'], ['수납가구','storage-furniture'], ['식탁/테이블','dining-table'], ['신발관리기','shoe-care'], ['액션캠','action-camera'], ['자동차용품','car-accessories'], ['전기스쿠터','electric-scooter'], ['전기자전거','electric-bicycle'], ['책상/의자','desk-chair'], ['침대','bed'], ['침대프레임','bed-frame'], ['캠핑용품','camping'], ['피아노/전자드럼','piano-drums'], ['와인셀러','wine-cellar'],
];
export const productPath = id => `/products/${encodeURIComponent(id)}/`;
export const categoryPath = name => {
  const found = searchCategories.find(([category]) => category === normalizeCategory(name));
  return found ? `/categories/${found[1]}/` : null;
};
export function searchRoute(location) {
  const params = new URLSearchParams(location.search);
  if (params.has('category')) params.set('category',normalizeCategory(params.get('category')));
  if (params.has('page')) return params;
  for (const [page,path] of Object.entries(pagePaths)) {
    if (location.pathname===path || location.pathname===path+'index.html') params.set('page',page);
  }
  const product = location.pathname.match(/^\/products\/([^/]+)(?:\/(?:index\.html)?)?$/);
  const category = location.pathname.match(/^\/categories\/([^/]+)(?:\/(?:index\.html)?)?$/);
  if (product) { params.set('page','product'); params.set('id',decodeURIComponent(product[1])); }
  if (category) {
    const found = searchCategories.find(([,key]) => key === category[1]);
    if (found) { params.set('page','catalog'); params.set('category',found[0]); }
  }
  return params;
}
export function matchesProductCategory(product, category) {
  const normalized=normalizeCategory(category);
  return normalizeCategory(product.category)===normalized || (product.additionalCategories||[]).some(name=>normalizeCategory(name)===normalized);
}
export function categoryProducts(category, products) {
  return products.filter(product => category === '업소용' ? isCommercialProduct(product) : matchesProductCategory(product,category));
}
export function searchMetadata(params, products) {
  const page = params.get('page');
  const product = page === 'product' ? products.find(p => p.id === params.get('id')) : null;
  const category = normalizeCategory(params.get('category') || '정수기');
  let title = homeTitle, description = homeDescription, path = '/', indexable = true;
  if (page === 'partner') {
    title = '렌탈파트너신청 | 세모가';
    description = '가전 렌탈부터 인터넷·TV까지, 세모가와 함께 성장할 파트너를 모십니다. 쇼핑몰 운영자·직장인 N잡·예비 창업자를 위한 파트너 상담. 신청 문의 1661-6566.';
    path = pagePaths.partner;
  } else if (product) {
    const name = product.name.includes(product.model) ? product.name : `${product.name} ${product.model}`;
    title = `${product.brand} ${name} 렌탈 | 세모가`;
    if (title.length > 60) title = `${product.brand} ${product.model} 렌탈 | 세모가`;
    description = `${product.brand} ${product.model} ${product.commercialType || product.category} 렌탈. 월 렌탈료와 약정기간·관리 조건을 확인하고 세모가에서 상담하세요.`;
    path = productPath(product.id);
  } else if (page === 'catalog' && !params.get('q') && categoryPath(category)) {
    title = category === '인터넷' ? '인터넷 가입 비교상담 | 세모가렌탈' : `${category === '업소용' ? '업소용 가전' : category} 렌탈 비교상담 | 세모가렌탈`;
    description = category === '업소용'
      ? '업소용 냉장고·제빙기·식기세척기·조리기기·서빙로봇·청소로봇 렌탈. 세모가렌탈에서 종류와 브랜드별 월 렌탈료·약정 조건을 비교하고 상담하세요.'
      : category === '인터넷'
        ? '인터넷·IPTV 가입과 결합상품 상담. 세모가렌탈에서 통신사별 요금제와 결합 조건을 살펴보고 설치 환경에 맞게 상담하세요.'
        : `${category} 렌탈을 세모가렌탈에서 비교하세요. 브랜드별 제품 사양, 월 렌탈료, 약정기간과 관리 조건을 확인하고 전화·카카오톡으로 상담하세요.`;
    path = categoryPath(category);
  } else if (page) {
    indexable = false;
    title = page === 'saved' ? '찜한 제품 | 세모가' : params.get('q') ? `${params.get('q')} 검색 결과 | 세모가` : '페이지 안내 | 세모가';
  }
  const keywords = product?.seoTags?.join(', ') || '';
  return {page, title, description, keywords, url:siteOrigin+path, image:'https://semoga.mr-jbread.chatgpt.site/assets/social-share-20260930.png', indexable, product, category:page === 'catalog' ? category : null};
}
// Describe the actual plan shown in the rental panel, never a sale price or a
// synthetic sample plan. Unknown/quote-only prices must not become free offers.
function rentalOffer(product, url, plan = lowestPlan(product)) {
  if (product.sample || !product.rentalPlans?.includes(plan) ||
      !Number.isFinite(plan?.monthlyPrice) || plan.monthlyPrice <= 0 ||
      !Number.isInteger(plan.term) || plan.term <= 0 ||
      (plan.termUnit != null && !['year','month'].includes(plan.termUnit))) return null;
  const months = plan.termUnit === 'month' ? plan.term : plan.term * 12;
  const conditions = rentalDescription(product, plan);
  return {
    '@type':'Offer', url,
    name:`${product.brand} ${product.model} 월 렌탈 · ${conditions}`,
    description:`월 렌탈료 ${plan.monthlyPrice.toLocaleString('ko-KR')}원 · ${conditions}. 실제 요금과 설치 가능 여부는 상담 시 확인해 주세요.`,
    businessFunction:'http://purl.org/goodrelations/v1#LeaseOut',
    // Google accepts priceSpecification.price for product snippets. Keep the
    // price here so a bare offers.price cannot override its rental context.
    priceSpecification:{
      '@type':'UnitPriceSpecification', price:plan.monthlyPrice, priceCurrency:'KRW',
      unitCode:'MON', unitText:'월', billingIncrement:1,
      // Contractual billing duration, not the interval between monthly bills.
      billingDuration:`P${months}M`,
    },
  };
}
export function searchStructuredData(meta, selectedPlan) {
  const organization = {
    '@type':'Organization', '@id':siteOrigin+'/#organization', name:'세모가', legalName:business.name,
    url:siteOrigin+'/', logo:siteOrigin+'/assets/semoga-logo-original.png',
    telephone:business.phone, email:business.email,
    address:{'@type':'PostalAddress', streetAddress:business.address, addressCountry:'KR'},
    sameAs:[business.kakaoUrl.replace(/^http:/,'https:')],
  };
  const graph = [organization, {
    '@type':'WebSite', '@id':siteOrigin+'/#website', url:siteOrigin+'/', name:'세모가',
    alternateName:'세모가 - 세상의 모든 가전', inLanguage:'ko-KR', publisher:{'@id':organization['@id']},
  }];
  if (meta.product) {
    const p = meta.product;
    const offer = rentalOffer(p, meta.url, selectedPlan);
    const images = (p.thumbnails || [p.image]).filter(Boolean).map(image => new URL(image,siteOrigin).href);
    if (offer) graph.push({'@type':'Product', '@id':meta.url+'#product', name:`${p.brand} ${p.name}`, model:p.model, sku:p.model,
      brand:{'@type':'Brand', name:p.brand}, category:p.commercialType || p.category,
      image:images, description:meta.description, url:meta.url, offers:offer,
      ...(p.seoTags?.length ? {keywords:p.seoTags.join(', ')} : {})});
    else graph.push({'@type':'WebPage', name:meta.title, description:meta.description,
      url:meta.url, inLanguage:'ko-KR', isPartOf:{'@id':siteOrigin+'/#website'}});
    graph.push({'@type':'BreadcrumbList', itemListElement:[
      {'@type':'ListItem', position:1, name:'세모가', item:siteOrigin+'/'},
      {'@type':'ListItem', position:2, name:p.category, item:siteOrigin+(categoryPath(p.category) || '/')},
      {'@type':'ListItem', position:3, name:p.name, item:meta.url},
    ]});
  } else if (meta.page === 'partner') {
    graph.push({'@type':'WebPage', name:meta.title, description:meta.description, url:meta.url, inLanguage:'ko-KR', isPartOf:{'@id':siteOrigin+'/#website'}});
  } else if (meta.category) {
    graph.push({'@type':'CollectionPage', name:meta.title, description:meta.description,
      url:meta.url, inLanguage:'ko-KR', isPartOf:{'@id':siteOrigin+'/#website'}});
  }
  return {'@context':'https://schema.org', '@graph':graph};
}
export function applySearchMetadata(params, products, document, selectedPlan) {
  const meta = searchMetadata(params,products);
  document.title = meta.title;
  const setMeta = (kind,key,value) => {
    let element = document.head.querySelector(`meta[${kind}="${key}"]`);
    if (!element) { element=document.createElement('meta'); element.setAttribute(kind,key); document.head.append(element); }
    element.setAttribute('content',value);
  };
  setMeta('name','description',meta.description);
  setMeta('name','keywords',meta.keywords);
  setMeta('name','robots',meta.indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow');
  for (const [key,value] of Object.entries({title:meta.title,description:meta.description,url:meta.url,image:meta.image})) setMeta('property','og:'+key,value);
  let canonical=document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical=document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.append(canonical); }
  canonical.setAttribute('href',meta.url);
  let data=document.getElementById('structured-data');
  if (!data) { data=document.createElement('script'); data.id='structured-data'; data.type='application/ld+json'; document.head.append(data); }
  data.textContent=JSON.stringify(searchStructuredData(meta, selectedPlan));
  // Point normal navigation at pages whose metadata and content are present in initial HTML.
  for (const link of document.querySelectorAll('#app a[href]')) {
    const href=link.getAttribute('href');
    if (href.startsWith('#')) {
      link.setAttribute('href',document.location.pathname+document.location.search+href);
      continue;
    }
    const url=new URL(href,document.baseURI);
    if (url.origin !== new URL(document.baseURI).origin) continue;
    const target=url.searchParams.get('page');
    const path=pagePaths[target] || (target === 'product' && products.some(p=>p.id===url.searchParams.get('id'))
      ? productPath(url.searchParams.get('id'))
      : target === 'catalog' && !url.searchParams.has('q') ? categoryPath(url.searchParams.get('category')) : null);
    if (!path) continue;
    ['page','category','id'].forEach(key=>url.searchParams.delete(key));
    const query=url.searchParams.toString();
    const local=document.location.hostname==='127.0.0.1'||document.location.hostname==='localhost';
    link.setAttribute('href',path+(local?'index.html':'')+(query?'?'+query:'')+url.hash);
  }
}
