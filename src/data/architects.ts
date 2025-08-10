export type Architect = {
  id: string;
  slug: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  rating: number;
  avatar: string;
  bio: string;
  specializations: string[];
  education: string[];
  awards: string[];
  philosophy: string;
};

export const architects: Architect[] = [
  {
    id: 'a1',
    slug: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Residential Architecture',
    location: 'Mumbai',
    experience: '12 yrs',
    rating: 4.9,
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Award‑winning architect specializing in sustainable residential design with a focus on modern Indian aesthetics.',
    specializations: ['Residential', 'Sustainable Design', 'Interior Planning'],
    education: ['M.Arch – CEPT University', 'B.Arch – SPA Delhi'],
    awards: ['IIA Award (2020)', 'Green Building Innovator (2021)'],
    philosophy: 'Design that balances functionality with artistic expression and environmental responsibility.',
  },
  {
    id: 'a2',
    slug: 'michael-chen',
    name: 'Michael Chen',
    title: 'Urban Design',
    location: 'Bengaluru',
    experience: '9 yrs',
    rating: 4.8,
    avatar: 'https://i.pravatar.cc/150?img=32',
    bio: 'Expert in urban development and smart city planning with extensive international experience.',
    specializations: ['Commercial', 'Urban Design', 'Transit‑oriented Dev.'],
    education: ['MUP – IIT Kharagpur', 'B.Arch – VNIT'],
    awards: ['Smart City Award (2019)'],
    philosophy: 'Human‑centric urban spaces with sustainable mobility.',
  },
  {
    id: 'a3',
    slug: 'emma-rodriguez',
    name: 'Emma Rodriguez',
    title: 'Sustainable Design',
    location: 'Delhi',
    experience: '8 yrs',
    rating: 4.7,
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Passionate about creating eco‑friendly spaces that harmonize with their natural surroundings.',
    specializations: ['Residential', 'Eco Homes', 'Landscape Integration'],
    education: ['M.Arch – SPA Delhi'],
    awards: ['Eco Excellence (2022)'],
    philosophy: 'Architecture that breathes with nature.',
  },
  {
    id: 'a4', slug: 'david-park', name: 'David Park', title: 'Commercial Architecture', location: 'Hyderabad', experience: '10 yrs', rating: 4.6, avatar: 'https://i.pravatar.cc/150?img=23', bio: 'Leading expert in commercial and retail architecture with a focus on innovative façades.', specializations: ['Commercial', 'Retail', 'Façade Design'], education: ['M.Arch – JNAFAU'], awards: ['Retail Design Award (2021)'], philosophy: 'Memorable user journeys through space.' },
  { id: 'a5', slug: 'lisa-wong', name: 'Lisa Wong', title: 'Interior Architecture', location: 'Pune', experience: '11 yrs', rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=5', bio: 'Specialist in creating stunning interior spaces that blend functionality with emotion.', specializations: ['Interior', 'Hospitality'], education: ['B.Arch – Sir JJ'], awards: ['Hospitality Design (2020)'], philosophy: 'Details define experiences.' },
  { id: 'a6', slug: 'james-thompson', name: 'James Thompson', title: 'Heritage Conservation', location: 'Jaipur', experience: '14 yrs', rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=40', bio: 'Dedicated to preserving historical architecture while adapting spaces for contemporary use.', specializations: ['Cultural', 'Conservation'], education: ['M.Arch Conservation – Ahmedabad Univ.'], awards: ['Heritage Award (2018)'], philosophy: 'Respect the past, enable the future.' },
  { id: 'a7', slug: 'olivia-barnes', name: 'Olivia Barnes', title: 'Landscape Architecture', location: 'Chennai', experience: '7 yrs', rating: 4.5, avatar: 'https://i.pravatar.cc/150?img=14', bio: 'Creates harmonious outdoor spaces that blend natural elements with architecture.', specializations: ['Landscape', 'Residential'], education: ['MLA – Anna University'], awards: ['Landscape Excellence (2022)'], philosophy: 'Nature is the best designer.' },
  { id: 'a8', slug: 'robert-kim', name: 'Robert Kim', title: 'Parametric Design', location: 'Kolkata', experience: '9 yrs', rating: 4.6, avatar: 'https://i.pravatar.cc/150?img=18', bio: 'Innovator in computational design, creating dynamic architectural forms.', specializations: ['Parametric', 'Commercial'], education: ['M.Arch – IIT Roorkee'], awards: ['Parametric Pioneer (2020)'], philosophy: 'Math meets artistry.' },
  { id: 'a9', slug: 'sophia-martinez', name: 'Sophia Martinez', title: 'Biophilic Architecture', location: 'Kochi', experience: '8 yrs', rating: 4.7, avatar: 'https://i.pravatar.cc/150?img=29', bio: 'Pioneering integration of nature into built environments for enhanced wellbeing.', specializations: ['Biophilic', 'Healthcare'], education: ['B.Arch – TKMCE'], awards: ['Healthcare Design (2021)'], philosophy: 'Design for wellness.' },
  { id: 'a10', slug: 'alexander-wilson', name: 'Alexander Wilson', title: 'Educational Facilities', location: 'Ahmedabad', experience: '13 yrs', rating: 4.8, avatar: 'https://i.pravatar.cc/150?img=8', bio: 'Focuses on functional and aesthetically pleasing learning environments.', specializations: ['Education', 'Public Space'], education: ['M.Arch – CEPT'], awards: ['Education Spaces (2019)'], philosophy: 'Spaces that inspire learning.' },
  { id: 'a11', slug: 'natalie-brooks', name: 'Natalie Brooks', title: 'Healthcare Architecture', location: 'Nagpur', experience: '10 yrs', rating: 4.6, avatar: 'https://i.pravatar.cc/150?img=9', bio: 'Designs healing environments that enhance patient outcomes and staff efficiency.', specializations: ['Healthcare'], education: ['B.Arch – VNIT'], awards: ['Healthcare Innovator (2020)'], philosophy: 'Empathy in design.' },
  { id: 'a12', slug: 'daniel-ahmed', name: 'Daniel Ahmed', title: 'Civic Architecture', location: 'New Delhi', experience: '15 yrs', rating: 4.9, avatar: 'https://i.pravatar.cc/150?img=3', bio: 'Creates innovative civic spaces that foster community and collaboration.', specializations: ['Public Space', 'Civic'], education: ['M.Arch – SPA Delhi'], awards: ['Civic Impact (2018)'], philosophy: 'Spaces for people.' },
];
