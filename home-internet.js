import { internetProviders, internetQuote } from './internet.js?v=20261006-seo-copy';

export function internetShowcase(icon) {
  const cards = ['kt', 'sk', 'lg'].map(provider => {
    const plan = internetProviders[provider];
    const quote = internetQuote({provider, speed:1, router:false, tvIncluded:true, tv:0});
    const name = provider === 'sk' ? 'SK' : plan.name;
    return `<article class="internet-showcase-card" data-provider="${provider}"><div class="internet-showcase-brand"><img src="./assets/internet-${provider}.png" alt="${plan.name}" width="180" height="100" loading="lazy"/><span>${provider === 'lg' ? '공유기 포함' : '결합 혜택'}</span></div><div class="internet-showcase-plan"><h3>${name} 500메가 + TV</h3><p>${provider === 'lg' ? 'U+tv ' : ''}${plan.tv[0].name} 기준</p></div><div class="internet-showcase-price"><span>월</span><strong>${quote.discounted.toLocaleString('ko-KR')}<small>원</small></strong></div></article>`;
  }).join('');
  return `<section class="internet-showcase wrap" id="internet-showcase" aria-labelledby="home-internet-title"><div class="internet-showcase-heading"><span class="eyebrow">SEMOGA INTERNET</span><h2 id="home-internet-title">인터넷 상품 <em>한눈에 보기</em></h2><p>500메가 + TV · 휴대폰 결합 기준, 통신사별 요금을 비교해보세요.</p></div><div class="internet-showcase-cards" aria-label="통신사별 결합 적용 시 예상 월 요금">${cards}</div><p class="internet-showcase-basis">부가세·TV 셋톱 임대료 포함 · KT/SK 공유기 미포함 · LG U+ 공유기 기본 제공</p><div class="internet-showcase-footer"><p><span aria-hidden="true">ⓘ</span>실제 요금은 약정, 휴대폰 결합, 설치 환경에 따라 달라질 수 있습니다.</p><a href="?page=catalog&category=${encodeURIComponent('인터넷')}">인터넷 요금 비교하기 ${icon('arrow',22)}</a></div></section>`;
}
