import { business } from './contact.js';

const drawings = {
  shop:'<path d="M4 10h24l-2-6H6l-2 6Z"/><path d="M6 14v14h20V14M11 28v-9h10v9M4 10v2a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0v-2"/>',
  growth:'<path d="M5 27V17h5v10M14 27V11h5v16M23 27V5h5v22M4 11l9-7m-6 0h6v6"/>',
  work:'<rect x="4" y="10" width="24" height="18" rx="4"/><path d="M11 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4M4 17c8 5 16 5 24 0M14 18h4v5h-4z"/>',
  seed:'<path d="M16 27V15M16 20C7 22 3 16 4 9c8-1 13 3 12 11ZM16 15C15 7 21 3 28 4c1 8-4 12-12 11ZM7 28h18"/>',
  chat:'<path d="M27 15c0 7-8 11-15 8l-7 4 2-7a10 10 0 0 1-3-7C5 1 27 2 27 15Z"/><path d="M10 14h.1M16 14h.1M22 14h.1"/>',
  check:'<rect x="5" y="5" width="22" height="24" rx="4"/><path d="M11 5V3h10v5H11zM10 16l4 4 8-8"/>',
  link:'<path d="m12 20-2 2a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 0M20 12l2-2a5 5 0 0 1 7 7l-6 6a5 5 0 0 1-7 0M11 21l10-10"/>',
};
const picture = name => `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name] || drawings.link}</svg>`;
const audience = [
  {icon:'shop',number:'01',title:'내 채널에<br>새로운 이야기를',text:'블로그·SNS·온라인몰에서 만나는 고객에게 생활에 맞는 렌탈 상품을 소개해보세요.',tag:'온라인 채널을 운영한다면'},
  {icon:'growth',number:'02',title:'고객과의 신뢰를<br>새로운 연결로',text:'매장과 현장에서 쌓은 고객과의 관계를 가전·인터넷 상담의 기회로 이어보세요.',tag:'고객을 가까이에서 만난다면'},
  {icon:'work',number:'03',title:'지금 하는 일에<br>또 하나의 가능성을',text:'현재 하고 있는 일과 함께 이어갈 수 있는 렌탈 제휴 방식을 상담해보세요.',tag:'다른 가능성도 열어두고 싶다면'},
  {icon:'seed',number:'04',title:'막연한 관심을<br>구체적인 계획으로',text:'상품을 고르는 기준부터 고객에게 설명할 내용까지, 세모가와 하나씩 살펴보세요.',tag:'렌탈 비즈니스가 궁금하다면'},
];

export function partnerPage(icon) {
  return `<main id="main" class="partner-page">
    <section class="partner-hero wrap" aria-labelledby="partner-title">
      <div class="partner-hero-copy"><span class="partner-eyebrow"><i></i> BUSINESS FOR PARTNER</span>
        <h1 id="partner-title">당신의 새로운 시작,<br><em>세모가와 함께.</em></h1>
        <p>가전 렌탈부터 인터넷까지.<br>함께 성장할 렌탈 파트너를 찾습니다.</p>
        <a class="primary-button partner-hero-button" href="#partner-inquiry">렌탈파트너 신청하기 ${icon('arrow',20)}</a>
        <a class="partner-hero-phone" href="${business.phoneHref}">렌탈 파트너 신청 문의 <strong>${business.phone}</strong></a>
      </div>
      <div class="partner-hero-art" aria-hidden="true">
        <div class="partner-orbit partner-orbit-one"></div><div class="partner-orbit partner-orbit-two"></div>
        <div class="partner-art-card"><span class="partner-art-label">GROW TOGETHER</span><div class="partner-art-logo"><img src="./assets/semoga-logo-original.png" alt=""/></div><p>함께 만드는<br><strong>더 큰 가능성</strong></p><svg class="partner-art-chart" viewBox="0 0 280 145" fill="none"><defs><linearGradient id="partner-bar" x2="1" y2="1"><stop stop-color="#9c8fff"/><stop offset="1" stop-color="#6550f4"/></linearGradient></defs><path d="M10 132h260M10 92h260M10 52h260" stroke="#eeecfc"/><rect x="25" y="100" width="37" height="32" rx="9" fill="#e7e1ff"/><rect x="86" y="76" width="37" height="56" rx="9" fill="#c7baff"/><rect x="147" y="46" width="37" height="86" rx="9" fill="#a28cff"/><rect x="208" y="14" width="37" height="118" rx="9" fill="url(#partner-bar)"/><path d="m30 69 61-24 55-15 70-21m-19-3 20 2-10 18" stroke="#6147ee" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="partner-art-float partner-art-float-one">${picture('link')}<div><small>PARTNERSHIP</small><b>함께, 더 멀리</b></div></div>
        <div class="partner-art-float partner-art-float-two"><span class="partner-art-check">${icon('check',18)}</span><div><small>RENTAL BUSINESS</small><b>새로운 기회의 시작</b></div></div>
      </div>
    </section>
    <section class="partner-intro wrap" aria-labelledby="partner-intro-title"><span class="partner-eyebrow">PREMIUM PARTNERSHIP SERVICE</span><h2 id="partner-intro-title">세모가, 당신의 <em>성공 파트너.</em></h2><p>일반 가전 렌탈 영업부터 온라인 사업까지,<br>새로운 가능성을 함께 만들어갈 파트너를 모십니다.<br>당신의 경험에 세모가의 렌탈 노하우를 더해보세요.</p><div class="partner-intro-tags"><span>가전 렌탈</span><span>인터넷·TV</span><span>온라인 비즈니스</span></div></section>
    <section class="partner-audience" aria-labelledby="partner-audience-title"><div class="wrap"><div class="partner-section-heading"><div><span class="partner-eyebrow">PARTNERSHIP STARTS WITH YOU</span><h2 id="partner-audience-title">고객을 만나는 당신의 방식에,<br><em>세모가의 렌탈을 더하세요.</em></h2></div><p>온라인에서, 매장에서, 일상 속에서.<br>고객과 만나는 접점이 제휴의 출발점이 됩니다.</p></div><div class="partner-audience-grid">${audience.map(item=>`<article class="partner-audience-card"><div class="partner-audience-top"><span class="partner-audience-icon">${picture(item.icon)}</span><span class="partner-card-number">${item.number}</span></div><span class="partner-card-tag">${item.tag}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join('')}</div></div></section>
    <section class="partner-support wrap" aria-labelledby="partner-support-title"><div class="partner-support-copy"><span class="partner-eyebrow">RENTAL, A NEW POSSIBILITY</span><h2 id="partner-support-title">소비자를 사로잡는,<br><em>렌탈 영업의 모든 것.</em><br>세모가와 알아보세요.</h2><p>소비의 변화가 가져온 키워드, 구독과 렌탈.<br>상품을 이해하는 첫 단계부터<br>나에게 맞는 영업 방향까지 함께 이야기합니다.</p><a href="#partner-inquiry">파트너 문의하기 ${icon('arrow',20)}</a></div><div class="partner-support-list"><div>${picture('shop')}<span><b>다양한 상품을 한곳에서</b><p>가전 렌탈과 인터넷·TV 상품을 살펴보세요.</p></span></div><div>${picture('check')}<span><b>렌탈 상품과 조건 이해하기</b><p>제품별 요금·약정·관리 조건을 함께 확인해요.</p></span></div><div>${picture('chat')}<span><b>나에게 맞는 운영 방향 찾기</b><p>운영 중인 채널과 계획을 바탕으로 상담해요.</p></span></div></div></section>
    <section id="partner-inquiry" class="partner-inquiry wrap" aria-labelledby="partner-inquiry-title"><div class="partner-inquiry-heading"><span class="partner-eyebrow">LET’S GROW TOGETHER</span><h2 id="partner-inquiry-title">세모가 파트너,<br class="partner-mobile-break"> 지금 시작해보세요.</h2><p>운영 중인 사업이나 준비 중인 계획을 편하게 말씀해 주세요.</p></div><div class="partner-contact-card"><div class="partner-contact-number"><span>렌탈 파트너 신청 문의</span><a href="${business.phoneHref}">${business.phone}</a><p>상담시간 ${business.hours}</p></div><div class="partner-contact-actions"><a class="partner-kakao" href="${business.kakaoUrl}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.8 5.2 4.5 6.6l-1.1 4 4.7-2.8c.6.1 1.3.1 1.9.1 5.5 0 10-3.5 10-7.9S17.5 3 12 3Z"/></svg>카카오톡으로 파트너 신청 ${icon('arrow',20)}</a><p>상담 시 <strong>“렌탈 파트너 신청”</strong>이라고 말씀해 주세요.</p></div></div><ol class="partner-process"><li><span>01</span><div><b>신청 문의</b><p>전화 또는 카카오톡으로 문의해 주세요.</p></div></li><li><span>02</span><div><b>파트너 상담</b><p>현재 운영 상황과 계획을 함께 이야기해요.</p></div></li><li><span>03</span><div><b>제휴 방향 안내</b><p>운영 방식과 제휴 조건을 안내해 드려요.</p></div></li></ol></section>
  </main>`;
}
