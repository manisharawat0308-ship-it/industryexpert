import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Timer, Zap, Trophy, Star, XCircle, CheckCircle2 } from 'lucide-react'

const allQuestions = [
  // STEEL (10 questions)
  { industry: 'Steel', question: "What is India's rank in global crude steel production?", options: ['1st', '2nd', '3rd', '5th'], correct: 1, fact: 'India produces 152 MT — 2nd after China (1,005 MT).' },
  { industry: 'Steel', question: "Which company is India's largest steel producer?", options: ['JSW Steel', 'Tata Steel', 'SAIL', 'AMNS India'], correct: 1, fact: 'Tata Steel: 34.6 MTPA capacity — India\'s #1 by revenue.' },
  { industry: 'Steel', question: "What is India's per capita steel consumption?", options: ['45 kg', '60 kg', '86 kg', '120 kg'], correct: 2, fact: 'India: ~86 kg vs global avg 230 kg — massive growth potential.' },
  { industry: 'Steel', question: "Which steelmaking route produces ~55% of India's steel?", options: ['EAF', 'BF-BOF', 'DRI-EAF', 'Induction Furnace'], correct: 1, fact: 'BF-BOF route produces 55% of crude steel; balance via EAF/IF route.' },
  { industry: 'Steel', question: "What is India's installed steel capacity (FY25)?", options: ['120 MTPA', '160 MTPA', '180 MTPA', '210 MTPA'], correct: 2, fact: '~171 MTPA installed capacity with 80% utilization rate.' },
  { industry: 'Steel', question: "Which state has the highest steel capacity?", options: ['Jharkhand', 'Karnataka', 'Odisha', 'Chhattisgarh'], correct: 2, fact: 'Odisha: 40+ MTPA — largest due to iron ore reserves and port access.' },
  { industry: 'Steel', question: "What % of India's steel is flat products?", options: ['35%', '44%', '55%', '65%'], correct: 1, fact: '~44% flat (HRC/CRC/GP/GC) and 56% long products (TMT/wire rod/rails).' },
  { industry: 'Steel', question: "Which company is the largest stainless steel producer in India?", options: ['SAIL', 'JSW Steel', 'Jindal Stainless', 'AMNS India'], correct: 2, fact: 'Jindal Stainless: 1.9 MTPA — India\'s only integrated stainless producer.' },
  { industry: 'Steel', question: "India's National Steel Policy targets capacity of ___ by 2030?", options: ['200 MT', '250 MT', '300 MT', '350 MT'], correct: 2, fact: 'NSP 2017 targets 300 MT capacity and 255 MT production by 2030.' },
  { industry: 'Steel', question: "What is the carbon intensity of Indian steel (per tonne)?", options: ['1.2 T CO2', '1.8 T CO2', '2.5 T CO2', '3.2 T CO2'], correct: 2, fact: '~2.5 T CO2/T steel — higher than global avg (1.9T) due to coal dependence.' },
  // CEMENT (10 questions)
  { industry: 'Cement', question: "What % of India's cement capacity uses dry process?", options: ['65%', '78%', '93%', '99%'], correct: 2, fact: '93% of Indian cement uses energy-efficient dry process.' },
  { industry: 'Cement', question: "Which is India's largest cement company?", options: ['Ambuja', 'UltraTech', 'Shree Cement', 'ACC'], correct: 1, fact: 'UltraTech: 130 MTPA capacity — largest single cement company.' },
  { industry: 'Cement', question: "What is India's total cement installed capacity?", options: ['380 MTPA', '420 MTPA', '590 MTPA', '700 MTPA'], correct: 2, fact: '~590 MTPA — 2nd largest globally after China.' },
  { industry: 'Cement', question: "Which state is the top cement producer?", options: ['Andhra Pradesh', 'Rajasthan', 'Tamil Nadu', 'Karnataka'], correct: 1, fact: 'Rajasthan leads with ~18% of India\'s installed cement capacity.' },
  { industry: 'Cement', question: "India's per capita cement consumption is?", options: ['150 kg', '200 kg', '270 kg', '400 kg'], correct: 2, fact: '~270 kg vs China\'s 1,600 kg — significant growth runway.' },
  { industry: 'Cement', question: "What is the dominant cement type in India?", options: ['OPC', 'PPC', 'PSC', 'White Cement'], correct: 1, fact: 'PPC (Portland Pozzolana Cement) is 65%+ of production — uses fly ash.' },
  { industry: 'Cement', question: "Which group acquired Ambuja & ACC in 2022?", options: ['Tata Group', 'Adani Group', 'Birla Group', 'JSW Group'], correct: 1, fact: 'Adani Group acquired Ambuja+ACC from Holcim for $10.5 Billion.' },
  { industry: 'Cement', question: "What is India's global rank in cement production?", options: ['1st', '2nd', '3rd', '5th'], correct: 1, fact: 'India is 2nd largest cement producer (390 MT/year) after China.' },
  { industry: 'Cement', question: "Cement industry contributes what % to India's CO2 emissions?", options: ['3%', '5%', '7%', '12%'], correct: 2, fact: '~7% of India\'s total CO2 emissions come from cement manufacturing.' },
  { industry: 'Cement', question: "What raw material is the primary input for cement?", options: ['Silica', 'Limestone', 'Gypsum', 'Bauxite'], correct: 1, fact: 'Limestone (calcium carbonate) is 80% of raw material in cement clinker.' },
  // PAPER (10 questions)
  { industry: 'Paper', question: "What is India's per capita paper consumption?", options: ['5 kg', '16 kg', '35 kg', '57 kg'], correct: 1, fact: 'India: 16 kg vs Global avg 57 kg — huge growth headroom.' },
  { industry: 'Paper', question: "What % of Indian paper uses recycled waste paper?", options: ['30%', '50%', '70%', '90%'], correct: 2, fact: '70% uses recycled waste paper — India is world\'s largest importer.' },
  { industry: 'Paper', question: "India's total paper production capacity?", options: ['10 MTPA', '18 MTPA', '26 MTPA', '35 MTPA'], correct: 2, fact: '~26 MTPA capacity — India is 5th largest paper producer globally.' },
  { industry: 'Paper', question: "Which is India's largest paper company?", options: ['ITC (PSPD)', 'JK Paper', 'Ballarpur (BILT)', 'Tamil Nadu Newsprint'], correct: 0, fact: 'ITC PSPD division is largest with 8 Lakh TPA capacity.' },
  { industry: 'Paper', question: "What segment has highest paper demand in India?", options: ['Newsprint', 'Writing & Printing', 'Packaging Board', 'Tissue'], correct: 2, fact: 'Packaging board is 50%+ of demand driven by e-commerce & FMCG.' },
  { industry: 'Paper', question: "India's rank in global paper production?", options: ['3rd', '5th', '7th', '10th'], correct: 1, fact: 'India is 5th largest paper producer after China, USA, Japan, Germany.' },
  { industry: 'Paper', question: "Which raw material accounts for 70% of Indian paper production?", options: ['Wood pulp', 'Bamboo', 'Recycled waste paper', 'Bagasse'], correct: 2, fact: 'Recycled waste paper dominates due to limited forest availability.' },
  { industry: 'Paper', question: "What is the growth rate of Indian paper industry?", options: ['3-4%', '6-7%', '9-10%', '12-13%'], correct: 1, fact: '6-7% CAGR driven by packaging, education, and e-commerce.' },
  { industry: 'Paper', question: "India imports what % of its waste paper requirement?", options: ['15%', '30%', '50%', '70%'], correct: 2, fact: '~50% of waste paper is imported — mainly from USA and Europe.' },
  { industry: 'Paper', question: "Which Indian state is the largest paper producer?", options: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Tamil Nadu'], correct: 1, fact: 'Maharashtra leads with multiple mills — Ballarpur, Seshasayee units.' },
  // AUTOMOBILE (10 questions)
  { industry: 'Automobile', question: "How many vehicles did India produce in FY25?", options: ['15M', '25.6M', '30.6M', '40M'], correct: 2, fact: '30.6M units produced — India is 3rd largest auto market.' },
  { industry: 'Automobile', question: "What is India's EV penetration rate?", options: ['2.5%', '4.2%', '6.8%', '10%'], correct: 2, fact: '6.8% EV penetration in FY25 — 2.1M EV units sold.' },
  { industry: 'Automobile', question: "Which is India's largest car manufacturer?", options: ['Tata Motors', 'Maruti Suzuki', 'Hyundai', 'Mahindra'], correct: 1, fact: 'Maruti Suzuki: 42% passenger vehicle market share.' },
  { industry: 'Automobile', question: "What emission norm does India currently follow?", options: ['BS-IV', 'BS-V', 'BS-VI', 'Euro 7'], correct: 2, fact: 'India leapfrogged from BS-IV to BS-VI in April 2020.' },
  { industry: 'Automobile', question: "India's auto industry contributes what % to GDP?", options: ['3.5%', '7.1%', '12%', '15%'], correct: 1, fact: '~7.1% of GDP — one of the key economic drivers.' },
  { industry: 'Automobile', question: "Which company leads India's commercial vehicle segment?", options: ['Ashok Leyland', 'Tata Motors', 'Mahindra', 'Eicher'], correct: 1, fact: 'Tata Motors: 44% CV market share — dominant in trucks & buses.' },
  { industry: 'Automobile', question: "What is FAME II scheme related to?", options: ['Safety ratings', 'EV subsidies', 'Fuel efficiency', 'Emission testing'], correct: 1, fact: 'FAME II: ₹10,000 Cr for EV demand incentives — extended to 2024.' },
  { industry: 'Automobile', question: "India's two-wheeler market is ___ largest globally?", options: ['1st', '2nd', '3rd', '5th'], correct: 0, fact: 'India is world\'s largest 2-wheeler market: 18M+ units/year.' },
  { industry: 'Automobile', question: "Which Indian company is largest tractor manufacturer globally?", options: ['TAFE', 'Mahindra', 'Sonalika', 'John Deere India'], correct: 1, fact: 'Mahindra: world\'s largest tractor company by volume — 300K+ units.' },
  { industry: 'Automobile', question: "India's auto component industry size?", options: ['$30B', '$57B', '$75B', '$100B'], correct: 1, fact: '$57 Billion auto component industry — exports $20B+.' },
  // TYRE (10 questions)
  { industry: 'Tyre', question: "Which company has the highest market share in Indian tyres?", options: ['Apollo', 'MRF', 'CEAT', 'JK Tyre'], correct: 1, fact: 'MRF leads with 24% market share and Rs 24,000 Cr revenue.' },
  { industry: 'Tyre', question: "What is India's tyre industry global rank?", options: ['2nd', '3rd', '5th', '7th'], correct: 1, fact: 'India is 3rd largest tyre producer globally after China and USA.' },
  { industry: 'Tyre', question: "India's total tyre production capacity?", options: ['100M units', '150M units', '200M units', '250M units'], correct: 2, fact: '~200M units/year capacity across all segments.' },
  { industry: 'Tyre', question: "What % of India's tyre market is replacement segment?", options: ['40%', '50%', '60%', '75%'], correct: 2, fact: 'Replacement market is 60% of volumes — more profitable than OEM.' },
  { industry: 'Tyre', question: "Natural rubber accounts for what % of tyre raw material cost?", options: ['15%', '25%', '35%', '50%'], correct: 2, fact: 'Natural rubber is 30-35% of cost — India imports 40% of requirement from Thailand/Indonesia.' },
  { industry: 'Tyre', question: "Which is India's most expensive tyre stock (by share price)?", options: ['Apollo', 'MRF', 'CEAT', 'Balkrishna'], correct: 1, fact: 'MRF: highest-priced stock on BSE at ₹1.2 Lakh+ per share.' },
  { industry: 'Tyre', question: "What segment dominates Indian tyre demand?", options: ['Passenger car', 'Truck & Bus', 'Two-wheeler', 'Farm/OTR'], correct: 1, fact: 'Truck & Bus Radial (TBR) is ~55% of revenue due to higher value per tyre.' },
  { industry: 'Tyre', question: "India's tyre industry CAGR (last 5 years)?", options: ['4-5%', '8-10%', '12-14%', '16-18%'], correct: 1, fact: '8-10% revenue CAGR driven by radialisation and premiumisation.' },
  { industry: 'Tyre', question: "What is radialisation rate in Indian passenger car tyres?", options: ['60%', '75%', '90%', '98%'], correct: 3, fact: '~98% radialisation in car segment; TBR segment at 75%.' },
  { industry: 'Tyre', question: "Which state has the most tyre manufacturing plants?", options: ['Tamil Nadu', 'Gujarat', 'Kerala', 'Maharashtra'], correct: 0, fact: 'Tamil Nadu: Chennai belt has MRF, Apollo, CEAT, Michelin plants.' },
  // PHARMA (10 questions)
  { industry: 'Pharma', question: "What % of global generic drugs does India supply?", options: ['8%', '12%', '20%', '35%'], correct: 2, fact: 'India supplies 20% of global generics — "Pharmacy of the World".' },
  { industry: 'Pharma', question: "India's pharma export value in FY25?", options: ['$12B', '$18B', '$27.9B', '$35B'], correct: 2, fact: '$27.9B — record high pharma exports in FY25.' },
  { industry: 'Pharma', question: "How many US FDA approved plants does India have?", options: ['200+', '500+', '700+', '1000+'], correct: 2, fact: '700+ US FDA approved manufacturing facilities — highest outside USA.' },
  { industry: 'Pharma', question: "Which is India's largest pharma company by revenue?", options: ['Sun Pharma', 'Cipla', 'Dr Reddy\'s', 'Lupin'], correct: 0, fact: 'Sun Pharma: ₹50,000+ Cr revenue — India\'s #1 pharma company.' },
  { industry: 'Pharma', question: "India's pharma market size?", options: ['$30B', '$50B', '$65B', '$80B'], correct: 1, fact: '~$50 Billion domestic market — 3rd largest by volume globally.' },
  { industry: 'Pharma', question: "What % of India's pharma is generic drugs?", options: ['50%', '60%', '70%', '80%'], correct: 2, fact: '~70% of domestic market is generic drugs — affordability focus.' },
  { industry: 'Pharma', question: "Which city is India's pharma capital?", options: ['Mumbai', 'Ahmedabad', 'Hyderabad', 'Bangalore'], correct: 2, fact: 'Hyderabad: largest pharma cluster — Genome Valley, 200+ bulk drug units.' },
  { industry: 'Pharma', question: "India supplies what % of world's vaccines?", options: ['20%', '40%', '60%', '80%'], correct: 2, fact: '60% of global vaccines come from India — Serum Institute is world\'s largest producer.' },
  { industry: 'Pharma', question: "India's pharma industry CAGR?", options: ['5-6%', '8-10%', '12-15%', '18-20%'], correct: 2, fact: '12-15% CAGR — target $130B by 2030.' },
  { industry: 'Pharma', question: "What is PLI scheme budget for pharma?", options: ['₹5,000 Cr', '₹15,000 Cr', '₹25,000 Cr', '₹35,000 Cr'], correct: 1, fact: '₹15,000 Cr PLI for bulk drugs + medical devices — reduce import dependence.' },
  // FMCG (10 questions)
  { industry: 'FMCG', question: "Which is India's largest FMCG company by revenue?", options: ['ITC', 'HUL', 'Nestle', 'Dabur'], correct: 1, fact: 'HUL (Hindustan Unilever) leads with Rs 60,000+ Cr revenue.' },
  { industry: 'FMCG', question: "India's FMCG market size?", options: ['$100B', '$155B', '$220B', '$300B'], correct: 2, fact: '$220B market — 4th largest globally.' },
  { industry: 'FMCG', question: "What % of FMCG sales come from rural India?", options: ['25%', '36%', '45%', '55%'], correct: 1, fact: '~36% of FMCG revenue from rural markets — growing faster than urban.' },
  { industry: 'FMCG', question: "Which segment is largest within Indian FMCG?", options: ['Food & Beverages', 'Personal Care', 'Household Care', 'Healthcare'], correct: 0, fact: 'Food & Beverages: 45% of FMCG market — led by packaged foods growth.' },
  { industry: 'FMCG', question: "India's FMCG industry growth rate?", options: ['5-6%', '8-10%', '12-14%', '16-18%'], correct: 1, fact: '8-10% volume growth — premiumisation driving value growth higher.' },
  { industry: 'FMCG', question: "Which FMCG company has the widest distribution in India?", options: ['HUL', 'ITC', 'Britannia', 'P&G'], correct: 0, fact: 'HUL reaches 9 million retail outlets — deepest distribution network.' },
  { industry: 'FMCG', question: "D2C brands contribute what % to FMCG sales?", options: ['2%', '5%', '8%', '12%'], correct: 2, fact: '~8% of FMCG via D2C channel — Mamaearth, Boat, Sugar Cosmetics leading.' },
  { industry: 'FMCG', question: "India's FMCG e-commerce penetration?", options: ['5%', '10%', '15%', '22%'], correct: 1, fact: '~10% of FMCG sold online — fastest growing channel at 30%+ CAGR.' },
  { industry: 'FMCG', question: "Which company is India's largest biscuit maker?", options: ['Parle', 'Britannia', 'ITC', 'Sunfeast'], correct: 0, fact: 'Parle: 26% market share — Parle-G is world\'s largest selling biscuit.' },
  { industry: 'FMCG', question: "India's FMCG global rank by consumption?", options: ['2nd', '4th', '6th', '8th'], correct: 1, fact: '4th largest FMCG market globally — projected #2 by 2030.' },
  // AVIATION (10 questions)
  { industry: 'Aviation', question: "What is IndiGo's domestic market share?", options: ['42%', '52%', '62%', '72%'], correct: 2, fact: 'IndiGo carries 62% of domestic passengers — dominant leader.' },
  { industry: 'Aviation', question: "How many passengers does India fly annually?", options: ['100M', '150M', '220M', '300M'], correct: 2, fact: '220M passengers annually — 3rd largest domestic aviation market.' },
  { industry: 'Aviation', question: "How many operational airports does India have?", options: ['80', '130', '157', '200'], correct: 2, fact: '157 operational airports — target 220 by 2030 under UDAN scheme.' },
  { industry: 'Aviation', question: "India's aviation market global rank?", options: ['2nd', '3rd', '5th', '7th'], correct: 1, fact: '3rd largest domestic + 7th largest international aviation market.' },
  { industry: 'Aviation', question: "Which airline has the largest fleet in India?", options: ['Air India', 'IndiGo', 'SpiceJet', 'Vistara'], correct: 1, fact: 'IndiGo: 350+ aircraft (A320neo family) — largest fleet in India.' },
  { industry: 'Aviation', question: "India's aircraft order book is approximately?", options: ['500', '800', '1,200+', '2,000+'], correct: 2, fact: '1,200+ aircraft on order — IndiGo alone ordered 500 from Airbus.' },
  { industry: 'Aviation', question: "What is UDAN scheme's full form?", options: ['Ude Desh ka Aam Naagrik', 'Urban Domestic Air Network', 'Universal Domestic Aviation Network', 'Unified Air Navigation'], correct: 0, fact: 'UDAN: Regional connectivity scheme — ₹4,500 cap for 1-hour flights.' },
  { industry: 'Aviation', question: "Air India was acquired by which group in 2022?", options: ['Adani', 'Tata Group', 'IndiGo', 'Singapore Airlines'], correct: 1, fact: 'Tata Group acquired Air India for ₹18,000 Cr — back after 70 years.' },
  { industry: 'Aviation', question: "India's aviation ATF (fuel) cost is what % of operating costs?", options: ['20%', '30%', '40%', '50%'], correct: 2, fact: '~40% of airline costs — ATF in India is 60% more expensive due to taxes.' },
  { industry: 'Aviation', question: "How many MRO (Maintenance) facilities does India have?", options: ['10', '25', '50', '80'], correct: 1, fact: '~25 MRO facilities — India spends $2.5B on MRO, 80% sent abroad.' },
  // BFSI (10 questions)
  { industry: 'BFSI', question: "How many monthly UPI transactions does India process?", options: ['5 Billion', '10 Billion', '16 Billion', '25 Billion'], correct: 2, fact: '16B+ monthly — world\'s largest real-time payment system.' },
  { industry: 'BFSI', question: "India's banking asset size?", options: ['$1.2T', '$1.8T', '$2.3T', '$3.0T'], correct: 2, fact: '$2.3 Trillion — 5th largest banking system globally.' },
  { industry: 'BFSI', question: "Which is India's largest bank by market cap?", options: ['SBI', 'HDFC Bank', 'ICICI Bank', 'Kotak Mahindra'], correct: 1, fact: 'HDFC Bank: $160B+ market cap — world\'s most valuable banking brand.' },
  { industry: 'BFSI', question: "India's insurance penetration rate?", options: ['2.5%', '4.2%', '5.5%', '7.0%'], correct: 1, fact: '4.2% insurance penetration vs global avg 6.8% — massive underinsurance.' },
  { industry: 'BFSI', question: "How many banks operate in India?", options: ['50+', '80+', '100+', '150+'], correct: 2, fact: '100+ scheduled commercial banks (12 PSU + 22 private + 46 foreign + others).' },
  { industry: 'BFSI', question: "India's mutual fund AUM size?", options: ['₹30 Lakh Cr', '₹45 Lakh Cr', '₹65 Lakh Cr', '₹80 Lakh Cr'], correct: 2, fact: '₹65 Lakh Cr+ AUM — 20%+ CAGR over 5 years.' },
  { industry: 'BFSI', question: "What is India's current NPA ratio?", options: ['1.8%', '2.8%', '4.5%', '6.2%'], correct: 1, fact: 'Gross NPA at ~2.8% — lowest in 12 years, improved from 11.2% (2018).' },
  { industry: 'BFSI', question: "Which fintech segment is largest in India?", options: ['Lending', 'Payments', 'Insurance', 'Wealth'], correct: 1, fact: 'Digital payments: $3T+ annually — Paytm, PhonePe, GPay dominant.' },
  { industry: 'BFSI', question: "India's credit-to-GDP ratio?", options: ['35%', '55%', '75%', '95%'], correct: 1, fact: '~55% credit-to-GDP vs China (180%) — huge lending headroom.' },
  { industry: 'BFSI', question: "How many Jan Dhan accounts have been opened?", options: ['20 Cr', '35 Cr', '52 Cr', '70 Cr'], correct: 2, fact: '52+ Cr Jan Dhan accounts — world\'s largest financial inclusion drive.' },
  // STARTUPS (10 questions)
  { industry: 'Startups', question: "How many unicorns does India have?", options: ['50+', '80+', '112+', '150+'], correct: 2, fact: '112+ unicorns — 3rd largest startup ecosystem globally.' },
  { industry: 'Startups', question: "Which city is India's startup capital?", options: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'], correct: 2, fact: 'Bangalore: 38,000+ startups, 50+ unicorns, India\'s Silicon Valley.' },
  { industry: 'Startups', question: "How many DPIIT-registered startups does India have?", options: ['40,000+', '60,000+', '1,00,000+', '1,40,000+'], correct: 3, fact: '1,40,000+ DPIIT registered startups as of 2025.' },
  { industry: 'Startups', question: "Which is India's most valued startup?", options: ['Flipkart', 'Byju\'s', 'Swiggy', 'PhonePe'], correct: 0, fact: 'Flipkart at $35B+ valuation — highest valued Indian startup.' },
  { industry: 'Startups', question: "India's total startup funding in 2024?", options: ['$5B', '$10B', '$15B', '$22B'], correct: 1, fact: '~$10B in 2024 — recovery from 2023 funding winter.' },
  { industry: 'Startups', question: "What is the Startup India initiative launched year?", options: ['2014', '2016', '2018', '2020'], correct: 1, fact: 'Startup India launched Jan 2016 — tax holidays, self-certification, Fund of Funds.' },
  { industry: 'Startups', question: "Which sector has the most Indian startups?", options: ['EdTech', 'FinTech', 'HealthTech', 'E-commerce'], correct: 1, fact: 'FinTech: 2,100+ startups — India is world\'s 3rd largest fintech ecosystem.' },
  { industry: 'Startups', question: "India's startup ecosystem global rank?", options: ['2nd', '3rd', '4th', '5th'], correct: 1, fact: '3rd largest globally after USA and China by number of unicorns.' },
  { industry: 'Startups', question: "What is the average failure rate of Indian startups?", options: ['50%', '70%', '80%', '90%'], correct: 3, fact: '~90% of Indian startups fail within 5 years — capital burn & PMF issues.' },
  { industry: 'Startups', question: "How many Indian startups IPO'd in 2021-2024?", options: ['15+', '30+', '50+', '80+'], correct: 2, fact: '50+ startup IPOs — Zomato, Paytm, Nykaa, PolicyBazaar, Delhivery and more.' },
  // HOSPITALITY (10 questions)
  { industry: 'Hospitality', question: "India's hotel industry market size?", options: ['$15B', '$25B', '$40B', '$55B'], correct: 1, fact: '~$25 Billion — growing at 12% CAGR driven by tourism + business travel.' },
  { industry: 'Hospitality', question: "Which is India's largest hotel chain by rooms?", options: ['ITC Hotels', 'Taj (IHCL)', 'OYO', 'Lemon Tree'], correct: 2, fact: 'OYO: 1.5 Lakh+ rooms across 800+ cities — largest by inventory.' },
  { industry: 'Hospitality', question: "India's foreign tourist arrivals in 2024?", options: ['5M', '10M', '18M', '25M'], correct: 2, fact: '18M+ foreign tourists — earning $30B+ in forex revenue.' },
  { industry: 'Hospitality', question: "Average hotel occupancy rate in India?", options: ['45%', '55%', '65%', '75%'], correct: 2, fact: '~65% average occupancy — metro cities at 72%+, highest since 2019.' },
  { industry: 'Hospitality', question: "Which Indian hotel company is the oldest (heritage)?", options: ['ITC', 'Taj (IHCL)', 'Oberoi', 'Leela'], correct: 1, fact: 'IHCL (Taj): Founded 1903 — India\'s oldest and most iconic hotel brand.' },
  { industry: 'Hospitality', question: "India's branded hotel room supply?", options: ['50,000', '1,00,000', '1,80,000', '3,00,000'], correct: 2, fact: '1,80,000 branded rooms — only 8% of total hotel supply is branded.' },
  { industry: 'Hospitality', question: "What % of India's GDP comes from tourism?", options: ['3%', '5%', '7%', '10%'], correct: 1, fact: '~5% direct + indirect GDP contribution from travel & tourism.' },
  { industry: 'Hospitality', question: "India's tourism industry employment?", options: ['20M', '40M', '80M', '120M'], correct: 2, fact: '~80 Million jobs (direct+indirect) — 2nd largest employer after agriculture.' },
  { industry: 'Hospitality', question: "Which state gets the most domestic tourists?", options: ['Rajasthan', 'Tamil Nadu', 'Uttar Pradesh', 'Kerala'], correct: 2, fact: 'Uttar Pradesh: 350M+ domestic tourists — Agra, Varanasi, Lucknow, Mathura.' },
  { industry: 'Hospitality', question: "Average Revenue Per Available Room (RevPAR) growth in India?", options: ['5%', '12%', '18%', '25%'], correct: 1, fact: '12% RevPAR growth in FY25 — driven by limited new supply + strong demand.' },
]

const industryOptions = ['All Industries', 'Steel', 'Cement', 'Paper', 'Automobile', 'Tyre', 'Pharma', 'FMCG', 'Aviation', 'BFSI', 'Startups', 'Hospitality']

const correctMessages = ['⚡ Brilliant!', '🔥 On Fire!', '💪 Nailed It!', '🎯 Bullseye!', '✨ Perfect!', '🚀 Unstoppable!']
const wrongMessages = ['😅 Close one!', '🤔 Tricky!', '📚 Now you know!', '💡 Good try!']

export default function IndustryQuiz() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro')
  const [playerName, setPlayerName] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries')
  const [questions, setQuestions] = useState(allQuestions.slice(0, 10))
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [answers, setAnswers] = useState<('correct' | 'wrong' | 'timeout' | 'skipped')[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const [showFact, setShowFact] = useState(false)
  const [reaction, setReaction] = useState('')
  const [shakeWrong, setShakeWrong] = useState(false)
  // Lifelines
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false)
  const [usedExtraTime, setUsedExtraTime] = useState(false)
  const [usedSkip, setUsedSkip] = useState(false)
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([])

  // Timer
  useEffect(() => {
    if (phase !== 'playing' || answered) return
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, phase, answered])

  const handleTimeout = useCallback(() => {
    setAnswered(true)
    setAnswers(a => [...a, 'timeout'])
    setStreak(0)
    setReaction('⏰ Time\'s up!')
  }, [])

  // Lifeline: 50:50
  const useFiftyFifty = () => {
    if (usedFiftyFifty || answered) return
    setUsedFiftyFifty(true)
    const correct = questions[currentQ].correct
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== correct)
    // Remove 2 random wrong options
    const shuffled = wrongIndices.sort(() => Math.random() - 0.5)
    setEliminatedOptions([shuffled[0], shuffled[1]])
  }

  // Lifeline: +10 seconds
  const useExtraTime = () => {
    if (usedExtraTime || answered) return
    setUsedExtraTime(true)
    setTimeLeft(t => t + 10)
  }

  // Lifeline: Skip
  const useSkip = () => {
    if (usedSkip || answered) return
    setUsedSkip(true)
    setAnswered(true)
    setAnswers(a => [...a, 'skipped'])
    setReaction('⏭️ Skipped!')
  }

  const handleAnswer = (idx: number) => {
    if (answered || eliminatedOptions.includes(idx)) return
    setSelectedAnswer(idx)
    setAnswered(true)
    const correct = idx === questions[currentQ].correct
    if (correct) {
      const timeBonus = timeLeft > 10 ? 5 : timeLeft > 5 ? 2 : 0
      const streakBonus = streak * 2
      setScore(s => s + 10 + timeBonus + streakBonus)
      setStreak(s => { const n = s + 1; if (n > maxStreak) setMaxStreak(n); return n })
      setAnswers(a => [...a, 'correct'])
      setReaction(correctMessages[Math.floor(Math.random() * correctMessages.length)])
    } else {
      setStreak(0)
      setAnswers(a => [...a, 'wrong'])
      setReaction(wrongMessages[Math.floor(Math.random() * wrongMessages.length)])
      setShakeWrong(true)
      setTimeout(() => setShakeWrong(false), 500)
    }
    setShowFact(true)
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1)
      setSelectedAnswer(null)
      setAnswered(false)
      setTimeLeft(20)
      setShowFact(false)
      setReaction('')
      setEliminatedOptions([])
    } else {
      // Save score
      const history = JSON.parse(localStorage.getItem('quizHistory') || '[]')
      history.unshift({ name: playerName, gender, score, correct: answers.filter(a => a === 'correct').length, industry: selectedIndustry, date: new Date().toLocaleDateString() })
      localStorage.setItem('quizHistory', JSON.stringify(history.slice(0, 20)))
      setPhase('result')
    }
  }

  const handleStart = () => {
    if (playerName.trim().length >= 2 && gender) {
      let pool = selectedIndustry === 'All Industries' ? allQuestions : allQuestions.filter(q => q.industry === selectedIndustry)
      // Shuffle and take 10 (or all if less than 10)
      const shuffled = [...pool].sort(() => Math.random() - 0.5)
      setQuestions(shuffled.slice(0, Math.min(10, shuffled.length)))
      setPhase('playing')
    }
  }

  const handleReset = () => {
    setPhase('intro'); setCurrentQ(0); setScore(0); setStreak(0); setMaxStreak(0)
    setAnswers([]); setSelectedAnswer(null); setAnswered(false); setTimeLeft(20); setShowFact(false); setReaction('')
    setUsedFiftyFifty(false); setUsedExtraTime(false); setUsedSkip(false); setEliminatedOptions([])
  }

  const timerColor = timeLeft > 10 ? 'bg-green-500' : timeLeft > 5 ? 'bg-amber-500' : 'bg-red-500'
  const charEmoji = gender === 'female' ? '👩‍💼' : '👨‍💼'

  // INTRO
  if (phase === 'intro') {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]')
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f7f9fc' }}>
        <div className="max-w-md w-full">
          <button onClick={() => navigate('/hub')} className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-700 mb-4"><ArrowLeft size={14} /> Back to Hub</button>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🧠</div>
              <h2 className="text-2xl font-black text-gray-900">Industry IQ Challenge</h2>
              <p className="text-xs text-gray-500 mt-1">10 questions • 1 from each industry • 20s timer</p>
            </div>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Your Name</label>
                <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Enter name..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Gender</label>
                <div className="flex gap-3">
                  <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl text-2xl transition ${gender === 'male' ? 'bg-blue-100 border-2 border-blue-500 scale-105' : 'bg-gray-50 border-2 border-gray-200'}`}>👨‍💼</button>
                  <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl text-2xl transition ${gender === 'female' ? 'bg-pink-100 border-2 border-pink-500 scale-105' : 'bg-gray-50 border-2 border-gray-200'}`}>👩‍💼</button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Select Industry</label>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {industryOptions.map(ind => (
                    <button key={ind} onClick={() => setSelectedIndustry(ind)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition ${selectedIndustry === ind ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{ind}</button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleStart} disabled={playerName.trim().length < 2 || !gender} className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]">🚀 Start Challenge</button>
            {history.length > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">🏆 Recent Scores</p>
                <div className="space-y-1">
                  {history.slice(0, 3).map((h: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{h.name}</span>
                      <span className="font-bold text-blue-700">{h.score} pts ({h.correct}/10)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // RESULT
  if (phase === 'result') {
    const correct = answers.filter(a => a === 'correct').length
    const pct = Math.round(correct / 10 * 100)
    const grade = pct >= 80 ? '🏆 Expert' : pct >= 60 ? '⚡ Champion' : pct >= 40 ? '💡 Rising Spark' : '📚 Trainee'
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f7f9fc' }}>
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="text-5xl mb-2">{charEmoji}</div>
            <h2 className="text-xl font-black text-gray-900 mb-1">Challenge Complete!</h2>
            <p className="text-sm text-gray-500 mb-4">{playerName}, here are your results:</p>
            <div className="text-4xl font-black text-blue-700 mb-1">{score} <span className="text-lg text-gray-400">pts</span></div>
            <div className="text-base font-bold text-purple-600 mb-4">{grade}</div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="p-2 bg-green-50 rounded-lg"><div className="text-base font-bold text-green-600">{correct}/10</div><div className="text-[8px] text-gray-500">Correct</div></div>
              <div className="p-2 bg-orange-50 rounded-lg"><div className="text-base font-bold text-orange-600">{maxStreak}🔥</div><div className="text-[8px] text-gray-500">Streak</div></div>
              <div className="p-2 bg-blue-50 rounded-lg"><div className="text-base font-bold text-blue-600">{pct}%</div><div className="text-[8px] text-gray-500">Accuracy</div></div>
              <div className="p-2 bg-purple-50 rounded-lg"><div className="text-base font-bold text-purple-600">{score}</div><div className="text-[8px] text-gray-500">Score</div></div>
            </div>
            {/* Answer dots */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {answers.map((a, i) => (
                <div key={i} className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${a === 'correct' ? 'bg-green-500' : a === 'wrong' ? 'bg-red-500' : 'bg-gray-400'}`}>
                  {a === 'correct' ? '✓' : a === 'wrong' ? '✗' : '—'}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleReset} className="flex-1 py-3 rounded-xl font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition">🔄 Play Again</button>
              <button onClick={() => navigate('/hub')} className="flex-1 py-3 rounded-xl font-bold text-white bg-gray-900 hover:bg-gray-800 transition">← Hub</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // PLAYING
  const q = questions[currentQ]

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#f7f9fc' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{charEmoji}</span>
            <span className="text-xs font-bold text-gray-700">{playerName}</span>
            {streak > 1 && <span className="text-xs font-bold text-orange-600 animate-pulse">🔥{streak}</span>}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg"><Zap size={12} className="inline" /> {score} pts</span>
            <span className="text-xs font-bold text-gray-500">{currentQ + 1}/{questions.length}</span>
            <button onClick={handleReset} className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg hover:bg-red-100 transition" title="Exit Quiz">✕ Exit</button>
          </div>
        </div>

        {/* Lifelines */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Lifelines:</span>
          <button onClick={useFiftyFifty} disabled={usedFiftyFifty || answered}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition ${usedFiftyFifty ? 'bg-gray-100 text-gray-400 border-gray-200 line-through cursor-not-allowed' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'}`}>
            🎯 50:50 {usedFiftyFifty && '✗'}
          </button>
          <button onClick={useExtraTime} disabled={usedExtraTime || answered}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition ${usedExtraTime ? 'bg-gray-100 text-gray-400 border-gray-200 line-through cursor-not-allowed' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`}>
            ⏱️ +10s {usedExtraTime && '✗'}
          </button>
          <button onClick={useSkip} disabled={usedSkip || answered}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition ${usedSkip ? 'bg-gray-100 text-gray-400 border-gray-200 line-through cursor-not-allowed' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'}`}>
            ⏭️ Skip {usedSkip && '✗'}
          </button>
        </div>

        {/* Timer */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><Timer size={12} /> {timeLeft}s</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{q.industry}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${timerColor} ${timeLeft <= 5 ? 'animate-pulse' : ''}`} style={{ width: `${(timeLeft / 20) * 100}%` }}></div>
          </div>
        </div>

        {/* Question */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-4 ${shakeWrong ? 'animate-[shake_0.5s]' : ''}`}>
          <h3 className="text-base font-bold text-gray-900 mb-5 leading-relaxed">{q.question}</h3>
          <div className="grid grid-cols-1 gap-2.5">
            {q.options.map((opt, i) => {
              const isEliminated = eliminatedOptions.includes(i)
              let cls = 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:scale-[1.01]'
              if (isEliminated) cls = 'bg-gray-100 border-dashed border-gray-300 text-gray-300 line-through cursor-not-allowed'
              else if (answered && i === q.correct) cls = 'bg-green-50 border-green-500 text-green-800 scale-[1.02]'
              else if (answered && i === selectedAnswer) cls = 'bg-red-50 border-red-400 text-red-700'
              else if (answered) cls = 'bg-gray-50 border-gray-200 text-gray-400'
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered || isEliminated}
                  className={`p-4 rounded-xl border-2 text-left font-semibold text-sm transition-all ${cls} ${!answered && !isEliminated ? 'active:scale-[0.98] cursor-pointer' : 'cursor-default'}`}>
                  <span className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center text-xs font-bold ${isEliminated ? 'border-gray-200 text-gray-300' : 'border-gray-200 text-gray-500'}`}>{String.fromCharCode(65 + i)}</span>
                    {opt}
                    {answered && i === q.correct && <CheckCircle2 size={18} className="text-green-500 ml-auto" />}
                    {answered && i === selectedAnswer && i !== q.correct && <XCircle size={18} className="text-red-500 ml-auto" />}
                    {isEliminated && <span className="ml-auto text-xs text-gray-300">✗</span>}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Reaction + Fact */}
        {answered && (
          <div className="space-y-3">
            {reaction && <div className="text-center text-lg font-black">{reaction}</div>}
            {showFact && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <p className="text-xs text-blue-800">💡 {q.fact}</p>
              </div>
            )}
            <button onClick={handleNext} className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition shadow-md active:scale-[0.98]">
              {currentQ < 9 ? `→ Next: ${questions[currentQ + 1].industry}` : '🏆 See Results'}
            </button>
          </div>
        )}
      </div>

      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`}</style>
    </div>
  )
}
