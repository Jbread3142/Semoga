import { business } from './contact.js';
import { isCommercialProduct } from './commercial.js';

export const siteOrigin = 'https://semoga.kr';
export const homeTitle = '세모가렌탈 | 정수기·생활가전 렌탈·인터넷';
export const homeDescription = '정수기 렌탈부터 공기청정기·비데·안마의자·세탁건조기·에어컨, 업소용 가전과 인터넷까지. 세모가렌탈에서 브랜드별 요금과 약정·관리 조건을 비교하고 상담하세요.';
export const searchCategories = [
  ['정수기','water'], ['공기청정기','air'], ['비데','bidet'], ['안마의자','massage'],
  ['의류청정기','clothing'], ['인터넷','internet'], ['에어컨','aircon'],
  ['냉난방기','hvac'], ['세탁·건조기','laundry'], ['음식물처리기','food'], ['업소용','commercial'],
];
export const productPath = id => `/products/${encodeURIComponent(id)}/`;
export const categoryPath = name => {
  const found = searchCategories.find(([category]) => category === name);
  return found ? `/categories/${found[1]}/` : null;
};
export function searchRoute(location) {
  const params = new URLSearchParams(location.search);
  if (params.has('page')) return params;
  const product = location.pathname.match(/^\/products\/([^/]+)(?:\/(?:index\.html)?)?$/);
  const category = location.pathname.match(/^\/categories\/([^/]+)(?:\/(?:index\.html)?)?$/);
  if (product) { params.set('page','product'); params.set('id',decodeURIComponent(product[1])); }
  if (category) {
    const found = searchCategories.find(([,key]) => key === category[1]);
    if (found) { params.set('page','catalog'); params.set('category',found[0]); }
  }
  return params;
}
export function categoryProducts(category, products) {
  return products.filter(product => category === '업소용' ? isCommercialProduct(product) : product.category === category);
}
export function searchMetadata(params, products) {
  const page = params.get('page');
  const product = page === 'product' ? products.find(p => p.id === params.get('id')) : null;
  const category = params.get('category') || '정수기';
  let title = homeTitle, description = homeDescription, path = '/', indexable = true;
  if (product) {
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
  return {title, description, url:siteOrigin+path, image:"https://semoga.mr-jbread.chatgpt.site/assets/social-share-20260930.png", indexable, product, category:page === 'catalog' ? category : null};
}
export function searchStructuredData(meta) {
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
    const images = (p.thumbnails || [p.image]).filter(Boolean).map(image => new URL(image,siteOrigin).href);
    graph.push({'@type':'Product', name:`${p.brand} ${p.name}`, model:p.model, sku:p.model,
      brand:{'@type':'Brand', name:p.brand}, category:p.commercialType || p.category,
      image:images, description:meta.description, url:meta.url});
    graph.push({'@type':'BreadcrumbList', itemListElement:[
      {'@type':'ListItem', position:1, name:'세모가', item:siteOrigin+'/'},
      {'@type':'ListItem', position:2, name:p.category, item:siteOrigin+(categoryPath(p.category) || '/')},
      {'@type':'ListItem', position:3, name:p.name, item:meta.url},
    ]});
  } else if (meta.category) {
    graph.push({'@type':'CollectionPage', name:meta.title, description:meta.description,
      url:meta.url, inLanguage:'ko-KR', isPartOf:{'@id':siteOrigin+'/#website'}});
  }
  return {'@context':'https://schema.org', '@graph':graph};
}
export function applySearchMetadata(params, products, document) {
  const meta = searchMetadata(params,products);
  document.title = meta.title;
  const setMeta = (kind,key,value) => {
    let element = document.head.querySelector(`meta[${kind}="${key}"]`);
    if (!element) { element=document.createElement('meta'); element.setAttribute(kind,key); document.head.append(element); }
    element.setAttribute('content',value);
  };
  setMeta('name','description',meta.description);
  setMeta('name','robots',meta.indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow');
  for (const [key,value] of Object.entries({title:meta.title,description:meta.description,url:meta.url,image:meta.image})) setMeta('property','og:'+key,value);
  let canonical=document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical=document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.append(canonical); }
  canonical.setAttribute('href',meta.url);
  let data=document.getElementById('structured-data');
  if (!data) { data=document.createElement('script'); data.id='structured-data'; data.type='application/ld+json'; document.head.append(data); }
  data.textContent=JSON.stringify(searchStructuredData(meta));
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
    const path=target === 'product' && products.some(p=>p.id===url.searchParams.get('id'))
      ? productPath(url.searchParams.get('id'))
      : target === 'catalog' && !url.searchParams.has('q') ? categoryPath(url.searchParams.get('category')) : null;
    if (!path) continue;
    ['page','category','id'].forEach(key=>url.searchParams.delete(key));
    const query=url.searchParams.toString();
    const local=document.location.hostname==='127.0.0.1'||document.location.hostname==='localhost';
    link.setAttribute('href',path+(local?'index.html':'')+(query?'?'+query:'')+url.hash);
  }
}
