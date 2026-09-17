// Dedicated analyst / owner for each industry. Some industries have two owners.
// Keyed by both the IndustryHub card id and the dashboard route slug so either
// can look it up. Industries without a dedicated owner are simply omitted.

const OWNERS: Record<string, string[]> = {
  // Hub card ids
  hospitality: ['Deepak Beniwal'],
  fmcg: ['Astha Jaiswal'],
  electronics: ['Divya Karmakar'],
  steel: ['Aditya Bhowmick'],
  sugar: ['Arvin Bakshi'],
  textile: ['Vineet Kumar'],
  'auto-ancillary': ['Manisha Rawat'],
  fertilizer: ['Sajal Bisen'],
  startups: ['Vaibhav Tyagi'],
  'automobile-oem': ['Kavya Tandon'],
  chemical: ['Vikrant Bhatia'],
  pharma: ['Warisha Khatun'],
  cement: ['Rishabh Chawla'],
  infrastructure: ['Siddharth Sinha'],
  aviation: ['Harshita Gupta'],
  paper: ['Satyaki Mandal'],
  tyre: ['Prabhanshu Maheshwari', 'Raghvendra Singh'],

  // Dashboard route slugs that differ from the hub id
  automobile: ['Kavya Tandon'], // /automobile route -> AutoDashboard (OEMs)
}

/** Returns the dedicated owner name(s) for an industry key, or [] if none. */
export function getIndustryOwners(key: string): string[] {
  return OWNERS[key] || []
}

/** Convenience: owner names joined for display, or '' if none. */
export function getIndustryOwnersLabel(key: string): string {
  return getIndustryOwners(key).join(' & ')
}
