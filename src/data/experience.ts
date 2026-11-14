import type { ExperienceItem } from '@/types';
import dentmedLogo from '@/assets/images/logos/dentmed.webp';
import avoLogo from '@/assets/images/logos/avo-bank.webp';
import osonIjaraLogo from '@/assets/images/logos/oson-ijara.webp';
import marsLogo from '@/assets/images/logos/mars-it-school.webp';

/**
 * Work experience in chronological order.
 * Company descriptions are based on official websites and public sources
 * (avobank.uz, dentmed.uz, marsit.uz, oson-ijara.uz, Gazeta.uz, UzNews.uz,
 * App Store, Golden Pages / Yellow Pages Uzbekistan). They describe the
 * companies only — not personal responsibilities.
 *
 * Durations are calculated automatically from `start` / `end`
 * (see utils/date.ts → countCalendarMonths). `end: null` = present.
 */
export const experience: ExperienceItem[] = [
  {
    id: 'dentmed',
    company: 'DENTMED TECHNOLOGY',
    position: 'Call Center Operator',
    logo: dentmedLogo,
    start: { year: 2024, month: 10 },
    end: { year: 2025, month: 2 },
    location: 'Tashkent',
    companyInfo: {
      industry: 'Dental equipment & materials',
      summary:
        'Dentmed Technology is a Tashkent-based supplier of equipment and materials for dentistry. It provides dental clinics, dental professionals and dental laboratories with everything from treatment-room equipment to everyday consumables, and runs an online catalogue with delivery across Uzbekistan.',
      services: [
        'Dental equipment & chairs',
        'Consumables & instruments',
        'Diagnostics & sterilization',
        'Orthodontics & orthopedics',
        'Dental laboratory materials',
        'CAD/CAM solutions',
        'Delivery across Uzbekistan',
      ],
      background: [
        'Registered as DENTMED TECHNOLOGY LLC in Tashkent, with branches listed in several districts of the city.',
        'Its catalogue covers therapy, surgery, orthodontics, orthopedics, disinfection and sterilization, diagnostics and dental-lab supplies.',
      ],
      website: 'https://dentmed.uz',
    },
  },
  {
    id: 'avo-bank',
    company: 'AVO BANK',
    position: 'Call Center Operator',
    logo: avoLogo,
    start: { year: 2025, month: 3 },
    end: { year: 2025, month: 7 },
    location: 'Tashkent',
    companyInfo: {
      industry: 'Digital banking',
      summary:
        'AVO bank is a digital bank in Uzbekistan: every product is opened and managed in the AVO bank mobile app, without visiting a branch. Customers are identified online and can use cards, loans and deposits entirely from their phone, with customer support available 24/7.',
      services: [
        'Mastercard debit & credit card',
        'Online microloans',
        'Term deposits in UZS',
        'UZCARD virtual card',
        'Contactless payment sticker',
        'Mobile app (iOS & Android)',
      ],
      background: [
        'Legal name JSC “AVO bank”; licensed by the Central Bank of the Republic of Uzbekistan (license No. 83).',
        'The bank traces back to Uzagroexportbank, established in 2017, which was privatized and renamed AVO bank.',
        'The name comes from the Uzbek word “havo”, meaning air. Head office: Mirabad district, Tashkent.',
      ],
      website: 'https://avobank.uz',
    },
  },
  {
    id: 'white-house-energy',
    company: 'WHITE HOUSE ENERGY',
    companyAlias: 'OSON IJARA',
    position: 'Administrator',
    logo: osonIjaraLogo,
    start: { year: 2025, month: 9 },
    end: { year: 2026, month: 1 },
    location: 'Tashkent',
    companyInfo: {
      industry: 'Rental housing & real estate',
      summary:
        'Oson Ijara is a long-term rental residence in the Yunusabad district of Tashkent, presented as one of the first purpose-built rental housing projects in Uzbekistan. Fully furnished apartments are rented directly from the developer — without intermediaries or realtor fees — under an official contract.',
      services: [
        'Furnished studios, 1- & 2-room apartments',
        'Direct rental, no agent commission',
        '24/7 security & CCTV',
        'Parking & shuttle to the metro',
        'Cleaning & additional services',
        'Oson Ijara mobile app',
      ],
      background: [
        'Apartments range from 22 to 48 m² and come with renovation, furniture, appliances and air conditioning.',
        'The Oson Ijara app lets residents choose and book an apartment, pay all charges, order additional services and see the details of their agreements.',
        'The project was presented to the public in March 2026 (Gazeta.uz, UzNews.uz).',
      ],
      website: 'https://oson-ijara.uz',
      note: 'Public sources describe the Oson Ijara project but do not publish details about White House Energy as a legal entity.',
    },
  },
  {
    id: 'mars-it-school',
    company: 'MARS IT SCHOOL',
    position: 'IT Teacher',
    logo: marsLogo,
    start: { year: 2026, month: 1 },
    end: null,
    location: 'Tashkent',
    companyInfo: {
      industry: 'IT education',
      summary:
        'MARS IT SCHOOL is a network of IT education centres in Tashkent for children and teenagers. Students learn programming by building their own websites and games, study robotics, and practise presenting their projects — combining coding with elements of startup culture.',
      services: [
        'Website development courses',
        'Game development',
        'Robotics',
        'Computer literacy',
        'Small groups',
        'Free trial lesson',
      ],
      background: [
        'Programmes are designed for students roughly 9 to 17 years old and run across several branches in Tashkent.',
        'Co-organised Kids Hackathon 2024 with Inha University in Tashkent, where more than 350 participants presented programming projects.',
      ],
      website: 'https://marsit.uz',
    },
  },
];
