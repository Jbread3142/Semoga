// Prices and available choices are derived only from the product's supplied plans.
export const conditionKey = plan => JSON.stringify([plan.care, plan.cycle || '', plan.care === 'other' ? plan.careLabel : '', ...(plan.installationType ? [plan.installationType] : []), ...(plan.rentalCompany ? [plan.rentalCompany] : [])]);
export const careDescription = plan => [plan.careLabel, plan.cycle ? `관리주기 ${plan.cycle}` : ''].filter(Boolean).join(' · ') || '관리 조건 상담 시 확인';
// Whole years display in years; durations such as 39 months retain months.
export const termKey = plan => plan.termUnit === 'month' ? `month:${plan.term}` : plan.term;
export const termLabel = key => {
  if (typeof key !== 'string' || !key.startsWith('month:')) return `${key}년`;
  const months=Number(key.slice(6));
  return months>0 && months%12===0 ? `${months/12}년` : `${key.slice(6)}개월`;
};
const termMonths = key => typeof key === 'string' ? Number(key.slice(6)) : key * 12;
export const planDescription = plan => plan ? [termLabel(termKey(plan))+' 약정', plan.rentalCompany, plan.installationType || (!plan.rentalCompany || plan.careLabel || plan.cycle ? careDescription(plan) : '')].filter(Boolean).join(' · ') : '렌탈 조건 상담 시 확인';
export function productPlans(product) {
  if (!product?.sample) return product?.rentalPlans || [];
  return [3, 5, 6, 7].flatMap(term => ['visit', 'self'].map(care => ({term, care, careLabel:care === 'visit' ? '방문관리' : '자가관리', cycle:care === 'visit' ? '4개월' : '6개월', monthlyPrice:Math.max(0, product.monthlyPrice + ({3:7000,5:2000,6:0,7:-2000}[term]) - (care === 'self' ? 2000 : 0))})));
}
export const availableTerms = product => [...new Set(productPlans(product).map(termKey))].sort((a,b) => termMonths(a)-termMonths(b));
export const hasConditionChoices = (product, term) => productPlans(product).some(plan => termKey(plan) === term && (product.category === 'TV' ? String(plan.installationType || '').trim() : String(plan.careLabel || '').trim() || String(plan.cycle || '').trim() || ['visit','self'].includes(plan.care)));
export const lowestPlan = product => productPlans(product).reduce((best, plan) => !best || plan.monthlyPrice < best.monthlyPrice ? plan : best, null);
export function choosePlan(product, term, preferredKey) {
  const plans = productPlans(product).filter(p => termKey(p) === term);
  return plans.find(p => conditionKey(p) === preferredKey) || plans.reduce((best, p) => !best || p.monthlyPrice < best.monthlyPrice ? p : best, null);
}
export const resolvePlan = (product, term, key) => productPlans(product).find(p => termKey(p) === term && conditionKey(p) === key) || null;

export const hasRentalCompanies = product => productPlans(product).some(plan => plan.rentalCompany);
// Compare each company's lowest supplied price for the selected term.
export function rankedCompanyPlans(product, term) {
  const companies = new Map();
  for (const plan of productPlans(product).filter(plan => termKey(plan) === term && plan.rentalCompany)) {
    const previous = companies.get(plan.rentalCompany);
    if (!previous || plan.monthlyPrice < previous.monthlyPrice) companies.set(plan.rentalCompany, plan);
  }
  return [...companies.values()].sort((a,b) => a.monthlyPrice-b.monthlyPrice || a.rentalCompany.localeCompare(b.rentalCompany,'ko'));
}
