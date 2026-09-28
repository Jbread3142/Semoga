// Prices and available choices are derived only from the product's supplied plans.
export const conditionKey = plan => JSON.stringify([plan.care, plan.cycle || '', plan.care === 'other' ? plan.careLabel : '']);
export const careDescription = plan => [plan.careLabel, plan.cycle ? `관리주기 ${plan.cycle}` : ''].filter(Boolean).join(' · ') || '관리 조건 상담 시 확인';
// Legacy plans without termUnit are years. Month terms retain their source unit.
export const termKey = plan => plan.termUnit === 'month' ? `month:${plan.term}` : plan.term;
export const termLabel = key => typeof key === 'string' && key.startsWith('month:') ? `${key.slice(6)}개월` : `${key}년`;
const termMonths = key => typeof key === 'string' ? Number(key.slice(6)) : key * 12;
export const planDescription = plan => plan ? `${termLabel(termKey(plan))} 약정 · ${careDescription(plan)}` : '렌탈 조건 상담 시 확인';
export function productPlans(product) {
  if (!product?.sample) return product?.rentalPlans || [];
  return [3, 5, 6, 7].flatMap(term => ['visit', 'self'].map(care => ({term, care, careLabel:care === 'visit' ? '방문관리' : '자가관리', cycle:care === 'visit' ? '4개월' : '6개월', monthlyPrice:Math.max(0, product.monthlyPrice + ({3:7000,5:2000,6:0,7:-2000}[term]) - (care === 'self' ? 2000 : 0))})));
}
export const availableTerms = product => [...new Set(productPlans(product).map(termKey))].sort((a,b) => termMonths(a)-termMonths(b));
export const lowestPlan = product => productPlans(product).reduce((best, plan) => !best || plan.monthlyPrice < best.monthlyPrice ? plan : best, null);
export function choosePlan(product, term, preferredKey) {
  const plans = productPlans(product).filter(p => termKey(p) === term);
  return plans.find(p => conditionKey(p) === preferredKey) || plans.reduce((best, p) => !best || p.monthlyPrice < best.monthlyPrice ? p : best, null);
}
export const resolvePlan = (product, term, key) => productPlans(product).find(p => termKey(p) === term && conditionKey(p) === key) || null;
