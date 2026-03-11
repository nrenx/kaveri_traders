export interface BusinessInfo {
  name: string;
  tagline: string;
  about: string;
  ownerName: string;
  phone: string[];
  email: string;
  address: string;
  gstNumber: string;
  workingHours: string;
  experience: string;
  socialLinks: { platform: string; url: string }[];
  serviceAreas: string[];
  certifications: string[];
}

export const businessInfo: BusinessInfo = {
  name: "Kaveri Traders",
  tagline: "Premium Wood Cutting & Supply",
  about:
    "We are a trusted name in the wood industry — specializing in supplying Casurina and Eucalyptus wood to buyers, fire wood to industries, and paper wood to mills in the required quantity of tons and sizes. With our own fleet of transport vehicles, we handle end-to-end delivery on time, sourcing from locations across India. With over 15 years of hands-on experience, we deliver what we promise — every time.",
  ownerName: "Kaveri Traders",
  phone: ["+91 7989976214", "+91 9603094403"],
  email: "kaveritraders.timber@gmail.com",
  address: "Andhra Pradesh, India",
  gstNumber: "37HERPB7733F1Z5",
  workingHours: "Mon – Sat: 7:00 AM – 7:00 PM | Sunday: Closed",
  experience: "15+ Years",
  socialLinks: [
    { platform: "WhatsApp", url: "https://wa.me/917989976214" },
  ],
  serviceAreas: [
    "Andhra Pradesh",
    "Telangana",
    "Karnataka",
    "Odisha",
    "Maharashtra",
    "Pune",
    "Pan India",
  ],
  certifications: [
    "GST Registered",
    "Certified Weighbridge",
    "Sustainable Harvesting Practices",
    "Legal Compliance Certified",
  ],
};
