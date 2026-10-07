import { productPlans, planDescription, termLabel, termKey } from './rental.js';

export const isTV = product => product?.category === 'TV';
export const screenInches = product => Number(product?.screenInches) || Number(product?.name?.match(/(\d+(?:\.\d+)?)\s*인치/)?.[1]) || null;
export const screenLabel = product => screenInches(product) ? `${screenInches(product)}인치` : '';
export const tvName = product => isTV(product) ? product.name.replace(/\s*\d+(?:\.\d+)?\s*인치/g,'').trim() : product.name;
export const installationTypes = product => [...new Set(productPlans(product).map(plan => plan.installationType).filter(Boolean))];
export const inchRanges = products => [...new Set(products.map(screenInches).filter(Boolean).map(size => Math.floor(size/10)*10))].sort((a,b) => a-b);
export const inchRangeLabel = start => `${start}~${Number(start)+9}인치`;
export const matchesInches = (product, start) => !start || start === '전체' || (screenInches(product) !== null && screenInches(product) >= Number(start) && screenInches(product) < Number(start)+10);
export const matchesInstallation = (product, type) => !type || type === '전체' || installationTypes(product).includes(type);
export const rentalDescription = (product, plan) => isTV(product) && plan ? `${termLabel(termKey(plan))} 약정 · ${plan.installationType || '설치방식 상담 시 확인'}` : planDescription(plan);
