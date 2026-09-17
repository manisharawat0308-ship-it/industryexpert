import type { BusinessModelData } from '../../components/BusinessModel'

export const SUGAR_BUSINESS: BusinessModelData = {
  industryName: 'Sugar',
  brandColor: '#CA8A04',
  industryKey: 'sugar',
  tagline: 'Squeezing sweetness — and power, and ethanol — out of sugarcane.',
  intro:
    'The sugar industry crushes sugarcane to extract juice, which is boiled and crystallised into sugar. But a modern sugar mill is really a three-in-one business: besides sugar, it makes ethanol from molasses (blended into petrol) and generates power from bagasse (the leftover cane fibre). It is a highly regulated, seasonal, agriculture-linked business where cane price, sugar price and ethanol policy decide profitability.',
  stats: [
    { label: 'India Rank', value: '#1 producer' },
    { label: 'By-products', value: 'Ethanol · Power' },
    { label: 'Key Driver', value: 'Cane price + policy' },
    { label: 'Nature', value: 'Seasonal, regulated' },
  ],
  rawMaterials: [
    { name: 'Sugarcane', note: 'The single raw material — 70%+ of cost. Mills buy cane from farmers within a fixed command area at a government-set price (FRP/SAP).', source: 'Domestic' },
    { name: 'Water', note: 'Large volumes used for washing, extraction and boilers; effluent management is a key compliance area.', source: 'Domestic' },
    { name: 'Lime & Sulphur', note: 'Process chemicals used to clarify and purify the cane juice.', source: 'Domestic' },
    { name: 'Bagasse (own by-product)', note: 'The fibrous residue after crushing — burnt in boilers to run the mill and export surplus power.', source: 'Domestic' },
    { name: 'Molasses (own by-product)', note: 'The thick residual syrup left after crystallisation — feedstock for the distillery to make ethanol.', source: 'Domestic' },
  ],
  processIntro: 'From cane field to sugar bag, with two valuable by-product streams — ethanol from molasses and power from bagasse.',
  process: [
    { step: '1. Cane Crushing', keyFact: 'Milling tandem', output: 'Cane juice + bagasse', detail: 'Harvested cane is washed and crushed through heavy rollers to squeeze out the sweet juice. The dry fibrous residue, bagasse, is set aside as boiler fuel.' },
    { step: '2. Juice Clarification', keyFact: 'Lime + heat', output: 'Clear juice', detail: 'The raw juice is treated with lime and sulphur/heat to remove mud and impurities, which settle out — leaving a clear juice ready for concentration.' },
    { step: '3. Evaporation', keyFact: 'Multiple-effect evaporators', output: 'Thick syrup', detail: 'Clear juice is boiled in a series of evaporators to drive off most of the water, concentrating it into a thick syrup.' },
    { step: '4. Crystallisation', keyFact: 'Vacuum pans', output: 'Sugar + molasses', detail: 'The syrup is boiled under vacuum until sugar crystals form. The mixture of crystals and mother liquor (massecuite) is spun in centrifuges to separate sugar from molasses.' },
    { step: '5. Drying & Grading', keyFact: 'Sugar finishing', output: 'White sugar', detail: 'The wet sugar crystals are dried, cooled and graded by size, then bagged for sale. Molasses is diverted to the distillery.' },
    { step: '6. By-products (Ethanol & Power)', keyFact: 'Distillery + co-gen', output: 'Ethanol, exported power', detail: 'Molasses (or cane juice directly) is fermented and distilled into ethanol for petrol blending; bagasse is burnt in a co-generation plant to power the mill and sell surplus electricity to the grid.' },
  ],
  products: [
    { name: 'White / Refined Sugar', note: 'The core product, sold to households, FMCG and bulk industrial buyers.' },
    { name: 'Ethanol', note: 'Made from molasses/juice for petrol blending — increasingly the profit driver thanks to the government blending programme.' },
    { name: 'Power (Co-generation)', note: 'Electricity from bagasse, used in-house and exported to the grid — a steady, higher-margin revenue stream.' },
    { name: 'Molasses & Other By-products', note: 'Sold to distilleries/cattle-feed makers when not used captively; press mud used as fertilizer.' },
  ],
  customers: [
    { name: 'Households (Retail)', note: 'Everyday consumer sugar via retail and kirana.', share: 35 },
    { name: 'FMCG & Food Processors', note: 'Beverages, confectionery, dairy and bakery — bulk industrial demand.', share: 30 },
    { name: 'Oil Marketing Companies', note: 'Buy ethanol for petrol blending under fixed-price contracts.', share: 22 },
    { name: 'Power Grid / DISCOMs', note: 'Purchase surplus co-generated electricity.', share: 8 },
    { name: 'Exports & Others', note: 'Sugar exports (policy-dependent) and by-product buyers.', share: 5 },
  ],
  drivers: [
    { factor: 'Cane Price (FRP/SAP)', effect: 'Government-set cane prices are the biggest cost and are politically sensitive; high cane prices squeeze mill margins and cause farmer dues.', type: 'policy' },
    { factor: 'Sugar Price & Stock Limits', effect: 'The government controls minimum sale price, monthly release quotas and export policy — directly setting realisations.', type: 'policy' },
    { factor: 'Ethanol Blending Policy', effect: 'Higher ethanol blending targets and attractive ethanol prices divert molasses/juice from sugar to fuel, lifting profitability.', type: 'policy' },
    { factor: 'Monsoon & Cane Yield', effect: 'Rainfall and cane acreage decide how much cane is available and its sugar content (recovery %).', type: 'demand' },
    { factor: 'Global Sugar Prices', effect: 'World prices and export policy determine whether surplus sugar can be profitably exported.', type: 'external' },
    { factor: 'By-product Realisation', effect: 'Ethanol and power increasingly cushion the cyclical, low-margin sugar business.', type: 'demand' },
  ],
  economics:
    'Sugar economics hinge on the "cane-to-sugar" spread minus a fixed high cane price — a thin, cyclical margin. What increasingly makes mills profitable is the by-product mix: ethanol (policy-supported, better-priced) and power (steady). Recovery rate (sugar per tonne of cane), capacity utilisation during the crushing season, and how much output is steered toward ethanol are the key levers.',
  insurerNote:
    'Sugar mills combine agricultural feedstock, boilers/co-gen power plants and distilleries (flammable ethanol), so exposures include fire/explosion (bagasse dust, ethanol storage), boiler and machinery breakdown, and business interruption. The seasonal crushing cycle concentrates risk into a few months. Property, MB and BI cover plus liability around the distillery are central to underwriting.',
}
