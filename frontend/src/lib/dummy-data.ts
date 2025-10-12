import type { Weather, HistoricalOutcome, MarketPrice, GovernmentScheme } from '@/lib/types';

export const dummyWeather: Weather = {
  currentTemperature: 28,
  humidity: 75,
  weatherCondition: 'Partly Cloudy',
  temperatureForecast: [
    { date: '2024-08-01', temperature: 30 },
    { date: '2024-08-02', temperature: 32 },
    { date: '2024-08-03', temperature: 29 },
  ],
};

export const dummyHistoricalOutcomes: HistoricalOutcome[] = [
  { cropType: 'Corn', yield: 8500, fertilizerUsed: 'Nitrogen-rich' },
  { cropType: 'Wheat', yield: 5000, fertilizerUsed: 'Phosphorus-based' },
  { cropType: 'Soybeans', yield: 3000, fertilizerUsed: 'Potassium-based' },
  { cropType: 'Rice', yield: 9200, fertilizerUsed: 'Balanced NPK' },
];

export const dummyAlerts = [
  {
    id: '1',
    type: 'weather',
    title: 'Heatwave Warning',
    description: 'Temperatures expected to exceed 35°C for the next 3 days. Ensure adequate irrigation.',
    date: '2024-07-31',
  },
  {
    id: '2',
    type: 'pest',
    title: 'Aphid Infestation Alert',
    description: 'High aphid activity detected in your region. Inspect crops and consider pest control measures.',
    date: '2024-07-30',
  },
  {
    id: '3',
    type: 'schedule',
    title: 'Fertilization Reminder',
    description: 'Time to apply the next round of fertilizer for your wheat crop.',
    date: '2024-07-29',
  },
  {
    id: '4',
    type: 'gov',
    title: 'New Subsidy Scheme',
    description: 'The government has announced a new subsidy for organic farming. Check eligibility now.',
    date: '2024-07-28',
  },
];

export const dummyMarketPrices: MarketPrice[] = [
    { id: '1', crop: 'Wheat', price: 2050, unit: 'quintal', change: 1.2, location: 'Mumbai' },
    { id: '2', crop: 'Rice (Basmati)', price: 3500, unit: 'quintal', change: -0.5, location: 'Delhi' },
    { id: '3', crop: 'Corn', price: 1800, unit: 'quintal', change: 2.1, location: 'Bangalore' },
    { id: '4', crop: 'Soybean', price: 4200, unit: 'quintal', change: 0.8, location: 'Indore' },
    { id: '5', crop: 'Cotton', price: 5800, unit: 'quintal', change: -1.0, location: 'Nagpur' },
    { id: '6', crop: 'Sugarcane', price: 315, unit: 'quintal', change: 0.3, location: 'Pune' },
    { id: '7', crop: 'Tomato', price: 25, unit: 'kg', change: 5.5, location: 'Kolkata' },
    { id: '8', crop: 'Onion', price: 30, unit: 'kg', change: -2.3, location: 'Nashik' },
];

export const dummySchemes: GovernmentScheme[] = [
    {
        id: '1',
        title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        description: 'Provides income support of ₹6,000 per year to all landholding farmer families.',
        eligibility: 'All landholding farmer families with cultivable land.',
        link: 'https://pmkisan.gov.in/',
    },
    {
        id: '2',
        title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        description: 'An insurance service for farmers for their yields.',
        eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.',
        link: 'https://pmfby.gov.in/',
    },
    {
        id: '3',
        title: 'Kisan Credit Card (KCC) Scheme',
        description: 'Provides farmers with timely access to credit for their cultivation and other needs.',
        eligibility: 'All farmers, including small and marginal farmers, sharecroppers, and tenants.',
        link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card',
    },
     {
        id: '4',
        title: 'National Mission for Sustainable Agriculture (NMSA)',
        description: 'Aims to enhance agricultural productivity especially in rainfed areas focusing on integrated farming, water use efficiency, and soil health management.',
        eligibility: 'Varies by sub-mission, generally available to all farmers.',
        link: 'https://nmsa.dac.gov.in/',
    },
    {
        id: '5',
        title: 'Soil Health Card Scheme',
        description: 'Provides every farmer with a soil health card, which will help them to improve soil health and increase productivity.',
        eligibility: 'Available to all farmers across the country.',
        link: 'https://soilhealth.dac.gov.in/',
    },
    {
        id: '6',
        title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
        description: 'Promotes organic farming through the adoption of organic village by cluster approach and PGS certification.',
        eligibility: 'Any farmer willing to take up organic farming.',
        link: 'https://pgsindia-ncof.gov.in/pkvy/index.aspx',
    }
];
