import { Project } from './types';

export const COMPANY_INFO = {
  name: "Archon Strategic Works",
  slogan: "Infrastructure Built On Integrity",
  address_reg: "House#169 (2nd Floor), North Vashantek, Cantonment, Dhaka-1206",
  address_office: "765/A, Road 11, Avenue 6, Mirpur DOHS, Dhaka-1216",
  phone: "+8801923999956",
  email: "info@archonstrategicworks.com",
  linkedin: "https://www.linkedin.com/company/archonstrategicworks/"
};

export const CREDITS = {
  text: "Website & Estimation System — Concept, Design & Direction by Kazi Afnan",
  link: "https://www.linkedin.com/in/kaziafnanibnealam/"
};

export const COMPANY_PROFILE = `Archon Strategic Works is a 1st-class contracting firm delivering civil construction, infrastructure development, and government project execution across Bangladesh. The company specializes in roadwork, drainage systems, structural construction, earthmoving operations, and public-sector engineering solutions aligned with national standards and compliance requirements.

We work extensively within government tenders, military construction projects, and public procurement channels, ensuring disciplined planning, transparent execution, and strict adherence to regulatory frameworks. Our team is trained to operate in high-control, high-accountability environments where precision, safety, and timely delivery are essential.

Our project portfolio includes road widening, drainage rehabilitation, site development, reinforced concrete structures, and specialized works for strategic and defense-related facilities. With a foundation built on engineering integrity, accountable operations, and reliable field execution, we aim to support long-term national development priorities.

Archon Strategic Works continues to expand its capabilities with a focus on quality assurance, workforce competency, and scalable project management. We are committed to becoming a trusted partner for government agencies, military institutions, development bodies, and procurement authorities seeking dependable construction outcomes.`;

export const CORE_COMPETENCIES = [
  "Civil Construction", 
  "Government Tenders", 
  "Military Engineering Works", 
  "Infrastructure Development", 
  "Road & Drainage Construction", 
  "Structural Projects", 
  "Public Procurement", 
  "Project Management", 
  "Earthwork Operations", 
  "Quality & Safety Compliance"
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "Cox’s Bazar–Teknaf Marine Drive Road Widening",
    location: "Cox’s Bazar, Bangladesh",
    status: "Ongoing",
    description: "Strategic infrastructure enhancement to support regional connectivity and defense logistics. Implementation of high-durability coastal reinforcements.",
    imageUrl: "https://picsum.photos/800/600?grayscale"
  }
];

export const TRANSLATIONS = {
  EN: {
    nav: {
      home: "Home",
      projects: "Projects",
      safety: "Safety & Compliance",
      estimate: "EstiMate™",
      login: "Login Portal"
    },
    hero: {
      title: "Infrastructure Built on Integrity",
      subtitle: "1st-class Government contracting firm specializing in military-grade civil construction and strategic infrastructure development.",
      cta: "View Tenders"
    },
    safety: {
      title: "Compliance & Safety Standards",
      intro: "Archon operates under strict adherence to national and international safety protocols."
    },
    estimate: {
      title: "EstiMate™ Control Center",
      rateAnalysis: "Rate Analysis",
      risk: "Strategic Risk",
      alr_warning: "ALR ALERT: Rate deviates >10% from official schedule."
    }
  },
  BN: {
    nav: {
      home: "হোম",
      projects: "প্রকল্প",
      safety: "নিরাপত্তা ও কমপ্লায়েন্স",
      estimate: "এস্টিমেট™",
      login: "লগইন"
    },
    hero: {
      title: "সততার ভিত্তিতে নির্মিত অবকাঠামো",
      subtitle: "প্রথম শ্রেণীর সরকারি ঠিকাদারি প্রতিষ্ঠান যা সামরিক মানের সিভিল নির্মাণ এবং কৌশলগত অবকাঠামো উন্নয়নে বিশেষায়িত।",
      cta: "দরপত্র দেখুন"
    },
    safety: {
      title: "কমপ্লায়েন্স এবং নিরাপত্তা মান",
      intro: "আর্কন জাতীয় এবং আন্তর্জাতিক নিরাপত্তা প্রোটোকল কঠোরভাবে মেনে চলে।"
    },
    estimate: {
      title: "এস্টিমেট™ কন্ট্রোল সেন্টার",
      rateAnalysis: "দর বিশ্লেষণ",
      risk: "কৌশলগত ঝুঁকি",
      alr_warning: "সতর্কতা: দর সরকারি তালিকার ১০% এর নিচে।"
    }
  }
};