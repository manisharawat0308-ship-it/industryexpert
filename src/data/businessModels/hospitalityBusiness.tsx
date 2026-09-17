import type { BusinessModelData } from '../../components/BusinessModel'

export const HOSPITALITY_BUSINESS: BusinessModelData = {
  industryName: 'Hospitality',
  brandColor: '#B45309',
  tagline: 'Selling rooms and experiences — where a hotel can own the bricks, or just the brand.',
  // Hospitality is a service/asset business, not manufacturing — relabel sections.
  labels: {
    rawMaterials: 'Key Inputs & Assets',
    rawMaterialsSub: 'What it takes to run a hotel business.',
    process: 'How a Hotel Business Works (Ownership Models)',
    products: 'What They Sell',
    productsSub: 'The revenue streams of a hospitality business.',
    customers: 'Who Stays — Guests',
    customersSub: 'Where hotel demand comes from.',
    drivers: 'What Impacts the Business',
    economics: 'How the Money Works',
  },
  intro:
    'Hospitality is the business of hotels, resorts and food service — selling rooms, food and experiences. Like an airline, a hotel sells a perishable product: an unsold room-night is lost forever. The key thing to understand is the ownership model — a hotel company can own its properties (asset-heavy), or simply manage/franchise properties owned by others (asset-light, higher-return). Success is measured by how full the hotel is (occupancy), at what price (ADR), combined into RevPAR.',
  stats: [
    { label: 'Two Models', value: 'Own vs Manage' },
    { label: 'Key Metric', value: 'RevPAR (Occ × ADR)' },
    { label: 'Product', value: 'Perishable room-nights' },
    { label: 'Nature', value: 'Cyclical, experience-led' },
  ],
  rawMaterials: [
    { name: 'Real Estate / Property', note: 'The hotel building and land — the biggest capital item for asset-heavy players; asset-light brands avoid owning it.', source: 'Domestic' },
    { name: 'Brand & Loyalty Program', note: 'The name, standards and loyalty base that drive bookings and let asset-light companies earn fees.', source: 'Domestic' },
    { name: 'Skilled Staff', note: 'Chefs, front-desk, housekeeping and service teams — service quality is the product; labour is a major cost.', source: 'Domestic' },
    { name: 'Food & Beverage Supplies', note: 'Ingredients and consumables for restaurants, bars and banquets — a significant, perishable input.', source: 'Domestic' },
    { name: 'Utilities & Technology', note: 'Power, water and booking/property-management systems that run the operation.', source: 'Domestic' },
  ],
  processIntro: 'How a hotel business runs — and the ownership models that decide whether it earns from room revenue or from fees.',
  process: [
    { step: 'Owned / Asset-Heavy', keyFact: 'Own the property', output: 'Full room revenue', detail: 'The company owns the hotel and keeps all the revenue — but bears the huge property cost, debt and cyclical risk. High reward in good times, painful in downturns.' },
    { step: 'Leased', keyFact: 'Rent the building', output: 'Revenue − rent', detail: 'The operator leases the building and runs the hotel, paying rent. Lighter than owning, but fixed rent is risky when occupancy falls.' },
    { step: 'Managed', keyFact: 'Run for a fee', output: 'Management fees', detail: 'The owner keeps the asset; the hotel company runs it under its brand for a management fee (a % of revenue/profit). Asset-light, capital-efficient and scalable.' },
    { step: 'Franchised', keyFact: 'Licence the brand', output: 'Franchise fees', detail: 'An independent owner runs the hotel using the company\'s brand, systems and bookings, paying franchise fees. The most asset-light model — pure brand monetisation.' },
    { step: 'Selling the Room (Distribution)', keyFact: 'Direct + OTA', output: 'Booked room-nights', detail: 'Rooms are sold through the hotel\'s own channels, travel agents and online travel aggregators (OTAs). Direct bookings and loyalty members are cheaper and more profitable than OTA sales.' },
    { step: 'Delivering the Stay', keyFact: 'Service + F&B', output: 'Guest experience', detail: 'The actual stay — rooms, food and beverage, events and service — is delivered. Great experiences drive reviews, repeat visits and rate premiums.' },
  ],
  products: [
    { name: 'Room Revenue', note: 'The core product — selling room-nights; the biggest and highest-margin revenue stream.' },
    { name: 'Food & Beverage', note: 'Restaurants, bars, banquets and weddings — a large revenue source, especially for full-service hotels.' },
    { name: 'MICE & Events', note: 'Meetings, incentives, conferences and exhibitions — high-value, drives weekday occupancy.' },
    { name: 'Management & Franchise Fees', note: 'Fee income from running/licensing others\' hotels — the asset-light, high-return stream.' },
  ],
  customers: [
    { name: 'Leisure Travellers', note: 'Holiday, weekend and destination guests — driving resort and premium demand.', share: 40 },
    { name: 'Business Travellers', note: 'Corporate stays and events — steady weekday demand and higher rates.', share: 30 },
    { name: 'MICE / Groups', note: 'Conferences, weddings and group bookings — high-value block business.', share: 20 },
    { name: 'Foreign Tourists', note: 'Inbound international visitors — higher-yield, forex-earning guests.', share: 10 },
  ],
  drivers: [
    { factor: 'Occupancy & ADR (RevPAR)', effect: 'The core levers: filling rooms at the best rate. Small RevPAR moves swing profits hugely because costs are largely fixed.', type: 'demand' },
    { factor: 'Economic & Travel Cycle', effect: 'Travel is discretionary, so demand rises and falls sharply with the economy, business activity and events.', type: 'demand' },
    { factor: 'Supply of New Rooms', effect: 'A surge of new hotels in a city depresses rates for everyone; tight supply supports pricing power.', type: 'external' },
    { factor: 'Asset-Light Shift', effect: 'Moving to management/franchise contracts lifts return on capital and reduces cyclical risk.', type: 'demand' },
    { factor: 'OTA Commissions', effect: 'Online travel aggregators bring bookings but take commissions; growing direct/loyalty share protects margins.', type: 'cost' },
    { factor: 'Tourism Policy & Events', effect: 'Visa rules, infrastructure, and big events (G20, sports, festivals) shape inbound and city demand.', type: 'policy' },
  ],
  economics:
    'Hotel economics turn on RevPAR (occupancy × average daily rate) against a largely fixed cost base, so profits are highly operationally geared — once the hotel covers its fixed costs, extra room-nights are hugely profitable, and vice versa. The strategic shift is toward asset-light management and franchising, which earns steady fee income on others\' capital, smoothing the deep cyclicality of owning bricks-and-mortar.',
  insurerNote:
    'Hotels are high-footfall properties combining accommodation, kitchens (fire risk), pools and event spaces, so exposures include fire, property damage, and significant public/guest liability (slips, food safety, security incidents). Business interruption from a fire or a demand shock (as seen in the pandemic) is a major concern. Property, liability, BI and, increasingly, cyber cover for guest data are central to underwriting.',
}
