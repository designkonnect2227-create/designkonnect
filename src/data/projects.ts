export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  area: string;
  budget: string;
  duration: string;
  year: number;
  architectId: string;
  architectSlug: string;
  architectName: string;
  images: string[];
  description: string;
  specialties: string[];
};

const img = (q: string) => `https://source.unsplash.com/1080x720/?architecture,india,${q}`;

export const projects: Project[] = [
  {
    id: 'p1', slug: 'glass-pavilion-mumbai', title: 'Glass Pavilion', category: 'Residential', location: 'Mumbai, Maharashtra', area: '4,500 sq ft', budget: '₹2.8 Cr', duration: '12 months', year: 2023, architectId: 'a1', architectSlug: 'sarah-johnson', architectName: 'Sarah Johnson', images: [img('glass-house'), img('modern-home'), img('courtyard')], description: 'A stunning modern glass house that seamlessly blends indoor and outdoor living with native landscaping and passive cooling.', specialties: ['Sustainable', 'Passive Cooling', 'Open Plan']
  },
  { id: 'p2', slug: 'urban-oasis-tower-bengaluru', title: 'Urban Oasis Tower', category: 'Commercial', location: 'Bengaluru, Karnataka', area: '2,00,000 sq ft', budget: '₹85 Cr', duration: '26 months', year: 2022, architectId: 'a2', architectSlug: 'michael-chen', architectName: 'Michael Chen', images: [img('skyscraper'), img('atrium'), img('façade')], description: 'An innovative skyscraper featuring vertical gardens and smart building management for energy efficiency.', specialties: ['Vertical Gardens', 'Smart Systems'] },
  { id: 'p3', slug: 'desert-retreat-jaipur', title: 'Desert Retreat', category: 'Residential', location: 'Jaipur, Rajasthan', area: '3,200 sq ft', budget: '₹1.9 Cr', duration: '14 months', year: 2021, architectId: 'a3', architectSlug: 'emma-rodriguez', architectName: 'Emma Rodriguez', images: [img('desert-home'), img('minimal-interior'), img('pool')], description: 'A luxurious desert home that harmonizes with its natural surroundings using local stone and courtyards.', specialties: ['Local Materials', 'Courtyards'] },
  { id: 'p4', slug: 'heritage-museum-udaipur', title: 'Heritage Museum', category: 'Cultural', location: 'Udaipur, Rajasthan', area: '60,000 sq ft', budget: '₹40 Cr', duration: '24 months', year: 2020, architectId: 'a6', architectSlug: 'james-thompson', architectName: 'James Thompson', images: [img('museum'), img('gallery'), img('heritage')], description: 'A museum celebrating Mewar heritage with adaptive reuse and climate‑responsive design.', specialties: ['Adaptive Reuse', 'Heritage'] },
  { id: 'p5', slug: 'seaside-resort-goa', title: 'Seaside Resort', category: 'Hospitality', location: 'Goa', area: '1,10,000 sq ft', budget: '₹60 Cr', duration: '22 months', year: 2023, architectId: 'a5', architectSlug: 'lisa-wong', architectName: 'Lisa Wong', images: [img('resort'), img('villa'), img('beach')], description: 'A boutique resort with vernacular-inspired villas, shaded walkways, and biophilic interiors.', specialties: ['Hospitality', 'Biophilic'] },
  { id: 'p6', slug: 'tech-park-hyderabad', title: 'Tech Park One', category: 'Commercial', location: 'Hyderabad, Telangana', area: '3,50,000 sq ft', budget: '₹120 Cr', duration: '28 months', year: 2024, architectId: 'a4', architectSlug: 'david-park', architectName: 'David Park', images: [img('office-campus'), img('courtyard-office'), img('glass-facade')], description: 'A high‑performance tech campus with shaded courtyards, daylighting, and collaborative atriums.', specialties: ['Workplace', 'Daylighting'] },
  { id: 'p7', slug: 'riverside-promenade-ahmedabad', title: 'Riverside Promenade', category: 'Public Space', location: 'Ahmedabad, Gujarat', area: '2 km stretch', budget: '₹95 Cr', duration: '30 months', year: 2019, architectId: 'a10', architectSlug: 'alexander-wilson', architectName: 'Alexander Wilson', images: [img('promenade'), img('public-space'), img('riverfront')], description: 'Revitalized riverfront with pedestrian boulevards, cycling tracks, and cultural plazas.', specialties: ['Urban Design', 'Public Realm'] },
  { id: 'p8', slug: 'green-healing-hospital-kochi', title: 'Green Healing Hospital', category: 'Healthcare', location: 'Kochi, Kerala', area: '1,80,000 sq ft', budget: '₹150 Cr', duration: '32 months', year: 2022, architectId: 'a9', architectSlug: 'sophia-martinez', architectName: 'Sophia Martinez', images: [img('hospital'), img('courtyard-hospital'), img('garden')], description: 'Biophilic healthcare design with daylight, courtyards, and low‑VOC materials for wellness.', specialties: ['Healthcare', 'Biophilia'] },
  { id: 'p9', slug: 'parametric-pavilion-kolkata', title: 'Parametric Pavilion', category: 'Cultural', location: 'Kolkata, West Bengal', area: '12,000 sq ft', budget: '₹7 Cr', duration: '10 months', year: 2021, architectId: 'a8', architectSlug: 'robert-kim', architectName: 'Robert Kim', images: [img('parametric'), img('pavilion'), img('expo')], description: 'A lightweight timber pavilion generated using parametric workflows for a cultural expo.', specialties: ['Parametric', 'Timber'] },
  { id: 'p10', slug: 'hillside-school-pune', title: 'Hillside School', category: 'Education', location: 'Pune, Maharashtra', area: '90,000 sq ft', budget: '₹48 Cr', duration: '20 months', year: 2020, architectId: 'a10', architectSlug: 'alexander-wilson', architectName: 'Alexander Wilson', images: [img('school'), img('classroom'), img('amphitheatre')], description: 'A terraced campus with outdoor learning courts and climate‑responsive classrooms.', specialties: ['Education', 'Climate Responsive'] },
  { id: 'p11', slug: 'sacred-temple-complex-varanasi', title: 'Sacred Temple Complex', category: 'Religious', location: 'Varanasi, Uttar Pradesh', area: '55,000 sq ft', budget: '₹52 Cr', duration: '24 months', year: 2019, architectId: 'a6', architectSlug: 'james-thompson', architectName: 'James Thompson', images: [img('temple'), img('courtyard-temple'), img('ghat')], description: 'Temple complex with stepped ghats, processional paths, and sandstone craftsmanship.', specialties: ['Cultural', 'Craft'] },
  { id: 'p12', slug: 'sapphire-mall-delhi', title: 'Sapphire Mall', category: 'Retail', location: 'New Delhi', area: '2,20,000 sq ft', budget: '₹110 Cr', duration: '26 months', year: 2024, architectId: 'a4', architectSlug: 'david-park', architectName: 'David Park', images: [img('mall'), img('retail'), img('atrium-retail')], description: 'Next‑gen retail anchor with diffused daylight atrium and efficient circulation.', specialties: ['Retail', 'Wayfinding'] },
];
