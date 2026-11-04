export interface CompanySettings {
  name: string;
  brandGroup: string;
  foundedYear: number;
  headquarters: string;
  plant2: string;
  contacts: {
    sales1: string;
    sales2: string;
    foreignPurchase: string;
    emailMarketing: string;
  };
  certifications: string[];
}

let companySettings: CompanySettings = {
  name: "Xclusive Can Limited",
  brandGroup: "Xclusive Can & Q Pail Ltd.",
  foundedYear: 1992,
  headquarters: "Plot#53/1, Block#B, Kaligonj Road, Majukhan, Gazipur, Dhaka, Bangladesh",
  plant2: "Plot#B 196, BSCIC I/A, Tongi, Gazipur, Dhaka, Bangladesh",
  contacts: {
    sales1: "+8801819343635",
    sales2: "+8801680240524",
    foreignPurchase: "+8801841984208",
    emailMarketing: "marketing@qpail.com",
  },
  certifications: ["LEED Platinum", "ISO 9001:2015", "FSSC 22000", "GMP Certified"],
};

export class SettingsService {
  static async getSettings() {
    return companySettings;
  }

  static async updateSettings(payload: Partial<CompanySettings>) {
    companySettings = {
      ...companySettings,
      ...payload,
      contacts: {
        ...companySettings.contacts,
        ...(payload.contacts || {}),
      },
    };
    return companySettings;
  }
}
