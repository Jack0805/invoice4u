// Tax configuration for different currencies/countries
export interface TaxConfig {
  taxIdLabel: string;
  taxIdShortLabel: string;
  taxName: string;
  defaultTaxRate: number;
}

export const TAX_CONFIGS: Record<string, TaxConfig> = {
  // Australia
  AUD: {
    taxIdLabel: "Australian Business Number",
    taxIdShortLabel: "ABN",
    taxName: "GST",
    defaultTaxRate: 10,
  },

  // United States
  USD: {
    taxIdLabel: "Employer Identification Number",
    taxIdShortLabel: "EIN",
    taxName: "Sales Tax",
    defaultTaxRate: 0, // Varies by state
  },

  // Canada
  CAD: {
    taxIdLabel: "Business Number",
    taxIdShortLabel: "BN",
    taxName: "GST/HST",
    defaultTaxRate: 5, // Federal GST, varies by province
  },

  // United Kingdom
  GBP: {
    taxIdLabel: "VAT Registration Number",
    taxIdShortLabel: "VAT No.",
    taxName: "VAT",
    defaultTaxRate: 20,
  },

  // European Union (Euro)
  EUR: {
    taxIdLabel: "VAT Identification Number",
    taxIdShortLabel: "VAT No.",
    taxName: "VAT",
    defaultTaxRate: 19, // Average, varies by country
  },

  // New Zealand
  NZD: {
    taxIdLabel: "New Zealand Business Number",
    taxIdShortLabel: "NZBN",
    taxName: "GST",
    defaultTaxRate: 15,
  },

  // Singapore
  SGD: {
    taxIdLabel: "Goods and Services Tax Registration Number",
    taxIdShortLabel: "GST Reg No.",
    taxName: "GST",
    defaultTaxRate: 9, // Increased from 8% to 9% on Jan 1, 2024
  },

  // India
  INR: {
    taxIdLabel: "Goods and Services Tax Identification Number",
    taxIdShortLabel: "GSTIN",
    taxName: "GST",
    defaultTaxRate: 18,
  },

  // Japan
  JPY: {
    taxIdLabel: "Corporate Number",
    taxIdShortLabel: "CN",
    taxName: "Consumption Tax",
    defaultTaxRate: 10,
  },

  // China
  CNY: {
    taxIdLabel: "Taxpayer Identification Number",
    taxIdShortLabel: "TIN",
    taxName: "VAT",
    defaultTaxRate: 13,
  },

  // Switzerland
  CHF: {
    taxIdLabel: "VAT Registration Number",
    taxIdShortLabel: "VAT No.",
    taxName: "VAT",
    defaultTaxRate: 8.1,
  },

  // Hong Kong
  HKD: {
    taxIdLabel: "Business Registration Number",
    taxIdShortLabel: "BR No.",
    taxName: "Tax",
    defaultTaxRate: 0, // No VAT/GST in Hong Kong
  },

  // UAE
  AED: {
    taxIdLabel: "Tax Registration Number",
    taxIdShortLabel: "TRN",
    taxName: "VAT",
    defaultTaxRate: 5,
  },

  // Saudi Arabia
  SAR: {
    taxIdLabel: "Tax Identification Number",
    taxIdShortLabel: "TIN",
    taxName: "VAT",
    defaultTaxRate: 15,
  },

  // Malaysia
  MYR: {
    taxIdLabel: "Sales and Service Tax Number",
    taxIdShortLabel: "SST No.",
    taxName: "SST",
    defaultTaxRate: 10, // 10% for goods (services are 8%)
  },

  // Thailand
  THB: {
    taxIdLabel: "Tax Identification Number",
    taxIdShortLabel: "TIN",
    taxName: "VAT",
    defaultTaxRate: 7,
  },

  // Indonesia
  IDR: {
    taxIdLabel: "Taxpayer Identification Number",
    taxIdShortLabel: "NPWP",
    taxName: "PPN (VAT)",
    defaultTaxRate: 10, // Was 11% from April 2022-2024, now 10%
  },

  // Philippines
  PHP: {
    taxIdLabel: "Tax Identification Number",
    taxIdShortLabel: "TIN",
    taxName: "VAT",
    defaultTaxRate: 12,
  },

  // Vietnam
  VND: {
    taxIdLabel: "Tax Code",
    taxIdShortLabel: "MST",
    taxName: "VAT",
    defaultTaxRate: 10,
  },

  // South Korea
  KRW: {
    taxIdLabel: "Business Registration Number",
    taxIdShortLabel: "BRN",
    taxName: "VAT",
    defaultTaxRate: 10,
  },

  // Norway
  NOK: {
    taxIdLabel: "VAT Registration Number",
    taxIdShortLabel: "VAT No.",
    taxName: "VAT",
    defaultTaxRate: 25,
  },

  // Sweden
  SEK: {
    taxIdLabel: "VAT Registration Number",
    taxIdShortLabel: "VAT No.",
    taxName: "VAT",
    defaultTaxRate: 25,
  },

  // Denmark
  DKK: {
    taxIdLabel: "VAT Registration Number",
    taxIdShortLabel: "CVR",
    taxName: "VAT",
    defaultTaxRate: 25,
  },

  // Poland
  PLN: {
    taxIdLabel: "VAT Identification Number",
    taxIdShortLabel: "NIP",
    taxName: "VAT",
    defaultTaxRate: 23,
  },

  // Czech Republic
  CZK: {
    taxIdLabel: "VAT Identification Number",
    taxIdShortLabel: "DIČ",
    taxName: "VAT",
    defaultTaxRate: 21,
  },

  // South Africa
  ZAR: {
    taxIdLabel: "VAT Registration Number",
    taxIdShortLabel: "VAT No.",
    taxName: "VAT",
    defaultTaxRate: 15,
  },

  // Brazil
  BRL: {
    taxIdLabel: "Taxpayer Registration Number",
    taxIdShortLabel: "CNPJ",
    taxName: "ICMS",
    defaultTaxRate: 17, // Average state ICMS rate (varies 7-18% by state)
  },

  // Mexico
  MXN: {
    taxIdLabel: "Tax Identification Number",
    taxIdShortLabel: "RFC",
    taxName: "IVA",
    defaultTaxRate: 16,
  },

  // Turkey
  TRY: {
    taxIdLabel: "Tax Identification Number",
    taxIdShortLabel: "VKN",
    taxName: "KDV",
    defaultTaxRate: 18, // Standard rate (also has 10% and 1% reduced rates)
  },

  // Russia
  RUB: {
    taxIdLabel: "Taxpayer Identification Number",
    taxIdShortLabel: "INN",
    taxName: "VAT",
    defaultTaxRate: 20,
  },
};

// Get tax config for a currency, with fallback to default
export function getTaxConfig(currency: string = "USD"): TaxConfig {
  return (
    TAX_CONFIGS[currency] || {
      taxIdLabel: "Tax ID",
      taxIdShortLabel: "Tax ID",
      taxName: "Tax",
      defaultTaxRate: 0,
    }
  );
}

// Format tax label with rate (e.g., "GST (10%)")
export function formatTaxLabel(
  currency: string = "USD",
  rate?: number
): string {
  const config = getTaxConfig(currency);
  const taxRate = rate !== undefined ? rate : config.defaultTaxRate;

  if (taxRate > 0) {
    return `${config.taxName}`;
  }

  return config.taxName;
}
