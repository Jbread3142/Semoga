// Rates verified against the supplied screenshots and shform.kr/internet.php.
// Router pricing follows Semoga's requested rule: KT/SK +1,100; LG included.
export const internetProviders = {
  kt: {name:'KT', standalone:[22000,33000,38500], bundled:[22000,27500,33000], discountStandalone:[3300,11000,11000], discountBundled:[3300,5500,5500], tv:[{name:'베이직',channels:239,price:16500},{name:'라이트',channels:243,price:17600},{name:'에센스',channels:269,price:20900}]},
  lg: {name:'LG U+', standalone:[22000,33000,38500], bundled:[22000,27500,33000], discountStandalone:[5500,9900,13200], discountBundled:[5500,9900,13200], tv:[{name:'실속형',channels:219,price:17600},{name:'기본형',channels:225,price:18700},{name:'프리미엄',channels:255,price:20900}]},
  sk: {name:'SK telecom', standalone:[22000,33000,38500], bundled:[19800,27500,33000], discountStandalone:[4400,11000,13200], discountBundled:[3300,6600,8800], tv:[{name:'Btv 이코노미',channels:183,price:14300},{name:'Btv 스탠다드',channels:236,price:17600},{name:'Btv 스탠다드 플러스',channels:236,price:25300}]},
};
export const internetSpeeds=[{value:'100',unit:'Mbps',description:'가벼운 웹서핑'},{value:'500',unit:'Mbps',description:'여러 기기도 쾌적하게'},{value:'1',unit:'Gbps',description:'대용량 작업도 빠르게'}];
export function internetQuote({provider='kt',speed=1,router=false,tvIncluded=true,tv=0}={}){
  const p=internetProviders[provider];
  if(!p || !Number.isInteger(speed) || speed<0 || speed>2 || !Number.isInteger(tv) || !p.tv[tv])throw new Error('유효하지 않은 인터넷 요금제');
  const internet=p[tvIncluded?'bundled':'standalone'][speed];
  const routerFee=provider==='lg'?0:router?1100:0;
  const tvFee=tvIncluded?p.tv[tv].price:0;
  const discount=p[tvIncluded?'discountBundled':'discountStandalone'][speed];
  const total=internet+routerFee+tvFee;
  return {internet,routerFee,tvFee,discount,total,discounted:total-discount,routerIncluded:provider==='lg'||router};
}

export function internetPage(){return `<main id="main" class="internet-page wrap"><a class="internet-back" href="./">‹ <span>인터넷</span></a><section class="internet-hero"><img src="./assets/internet-hero.png" alt="파스텔 블루 공간의 와이파이 공유기" width="2048" height="768"/><div><h1>우리 집에 딱 맞는<br><em>인터넷</em></h1><p>요금부터 결합 혜택까지,<br>한눈에 비교하세요.</p></div></section><div id="internet-configurator"></div></main>`;}

export function mountInternet({openOverlay,icon,business}){
  const root=document.querySelector('#internet-configurator');
  if(!root)return;
  const state={provider:'kt',speed:1,router:false,tvIncluded:true,tv:0};
  const money=n=>n.toLocaleString('ko-KR');
  const selection=()=>{const p=internetProviders[state.provider],s=internetSpeeds[state.speed];return `${p.name} · ${s.value} ${s.unit}${state.tvIncluded?' · TV '+p.tv[state.tv].name:' · 인터넷 단독'}`;};
  function paint(focusName,focusValue){
    const p=internetProviders[state.provider],q=internetQuote(state);
    root.innerHTML=`<fieldset class="internet-section"><legend>통신사를 선택해 주세요</legend><div class="internet-cards provider-cards">${Object.entries(internetProviders).map(([key,item])=>`<label class="internet-choice provider-choice"><input type="radio" name="provider" value="${key}" ${key===state.provider?'checked':''}/><span class="internet-card"><img src="./assets/internet-${key}.png" alt=""/><span>${item.name}</span></span></label>`).join('')}</div></fieldset>
    <fieldset class="internet-section"><legend>인터넷 속도를 선택해 주세요</legend><div class="internet-cards">${internetSpeeds.map((s,i)=>`<label class="internet-choice"><input type="radio" name="speed" value="${i}" ${i===state.speed?'checked':''}/><span class="internet-card speed-card">${i===1?'<span class="internet-recommend">추천</span>':''}<span class="internet-speed"><b>${s.value}</b> ${s.unit}</span><span class="internet-description">${s.description}</span><span class="internet-card-price">월 <strong>${money(internetQuote({...state,speed:i}).internet+q.routerFee)}<small>원</small></strong></span></span></label>`).join('')}</div></fieldset>
    <div class="internet-addons"><label class="internet-toggle"><input type="checkbox" name="router" ${q.routerIncluded?'checked':''} ${state.provider==='lg'?'disabled':''}/><span class="internet-switch" aria-hidden="true"></span><span><b>와이파이 공유기</b><small>${state.provider==='lg'?'LG U+ 무료 기본 제공':'포함 시 월 1,100원 추가'}</small></span></label><label class="internet-toggle"><input type="checkbox" name="tvIncluded" ${state.tvIncluded?'checked':''}/><span class="internet-switch" aria-hidden="true"></span><span><b>TV 함께 이용</b><small>더 풍부한 즐거움을 한 번에</small></span></label></div>
    ${state.tvIncluded?`<fieldset class="internet-section"><legend>TV 요금제를 선택해 주세요</legend><div class="internet-cards">${p.tv.map((t,i)=>`<label class="internet-choice"><input type="radio" name="tv" value="${i}" ${i===state.tv?'checked':''}/><span class="internet-card tv-card"><b>${t.name}</b><span class="internet-description">${t.channels}채널</span><span class="internet-card-price">월 <strong>${money(t.price)}<small>원</small></strong></span></span></label>`).join('')}</div></fieldset>`:''}
    <section class="internet-summary" aria-label="선택한 요금 안내"><span class="internet-summary-label">선택한 상품</span><h2>${selection()}</h2><dl><div><dt>인터넷 요금${state.tvIncluded?' (TV 함께 이용)':''}</dt><dd>${money(q.internet)}원</dd></div>${q.routerIncluded?`<div><dt>와이파이 공유기</dt><dd>${q.routerFee?money(q.routerFee)+'원':'기본 제공'}</dd></div>`:''}${state.tvIncluded?`<div><dt>TV 요금</dt><dd>${money(q.tvFee)}원</dd></div>`:''}<div class="internet-subtotal"><dt>월 기본 요금</dt><dd>${money(q.total)}원</dd></div><div class="internet-discount"><dt>휴대폰 결합 할인</dt><dd>−${money(q.discount)}원</dd></div></dl><div class="internet-total" role="status" aria-live="polite" aria-atomic="true"><b>결합 적용 시 예상 월 요금</b><strong>${money(q.discounted)}<small>원</small></strong></div><p>부가세·TV 셋톱 임대료 포함. 결합 할인은 휴대폰 요금제와 가입 조건에 따라 달라질 수 있습니다.</p></section><button type="button" class="internet-apply">이 조건으로 상담 신청하기 ${icon('arrow',22)}</button><p class="internet-footnote">자세한 가입 조건은 상담 시 안내해 드립니다.</p>`;
    if(focusName)root.querySelector(`input[name="${focusName}"][value="${focusValue}"]`)?.focus({preventScroll:true});
  }
  root.addEventListener('change',event=>{
    const input=event.target;
    if(!(input instanceof HTMLInputElement))return;
    if(input.name==='provider'){state.provider=input.value;state.tv=0;}
    else if(input.name==='speed'||input.name==='tv')state[input.name]=Number(input.value);
    else if(input.name==='router'||input.name==='tvIncluded')state[input.name]=input.checked;
    else return;
    paint(input.name,input.value);
  });
  root.addEventListener('click',event=>{
    if(!event.target.closest('.internet-apply'))return;
    const q=internetQuote(state);
    openOverlay(`<div class="dialog-heading"><h2 id="dialog-title">인터넷 상담하기</h2><button class="icon-button" data-action="close" aria-label="닫기">${icon('close')}</button></div><div class="internet-consult-summary"><b>${selection()}</b><p>공유기 ${q.routerIncluded?(state.provider==='lg'?'기본 제공':'포함'):'미포함'}<br>월 기본 요금 ${money(q.total)}원<br>휴대폰 결합 시 예상 ${money(q.discounted)}원</p></div><p>아래 전화 또는 카카오톡으로 선택한 조건을 알려주세요.</p><div class="consult-contact"><a class="consult-phone" href="${business.phoneHref}"><span>대표번호 · 전화 상담</span><strong>${business.phone}</strong></a><p>상담시간 ${business.hours}</p></div><a class="kakao-button full" href="${business.kakaoUrl}" target="_blank" rel="noopener noreferrer">카카오톡 상담하기 ${icon('arrow',19)}</a><p class="consult-contact-note">상담 채널 연결 후 신청이 진행됩니다.</p>`);
  });
  paint();
}
