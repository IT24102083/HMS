export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  dosage: string;
  form: string;
  manufacturer: string;
  expiryDate: string;
  prescriptionRequired: boolean;
  sideEffects: string[];
  contraindications: string[];
  image: string;
}

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    brand: 'Amoxil',
    category: 'Antibiotics',
    price: 12.99,
    stock: 150,
    description: 'Broad-spectrum antibiotic used to treat various bacterial infections including respiratory tract infections, urinary tract infections, and skin infections.',
    dosage: '500mg',
    form: 'Capsule',
    manufacturer: 'GlaxoSmithKline',
    expiryDate: '2025-12-31',
    prescriptionRequired: true,
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach pain', 'Headache'],
    contraindications: ['Penicillin allergy', 'Severe kidney disease'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '2',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    brand: 'Advil',
    category: 'Pain Relief',
    price: 8.49,
    stock: 200,
    description: 'Non-steroidal anti-inflammatory drug (NSAID) used for pain relief, fever reduction, and inflammation control.',
    dosage: '200mg',
    form: 'Tablet',
    manufacturer: 'Pfizer',
    expiryDate: '2026-06-30',
    prescriptionRequired: false,
    sideEffects: ['Stomach upset', 'Dizziness', 'Headache'],
    contraindications: ['Stomach ulcers', 'Severe heart disease', 'Kidney problems'],
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '3',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    brand: 'Prilosec',
    category: 'Digestive Health',
    price: 15.99,
    stock: 80,
    description: 'Proton pump inhibitor used to treat gastroesophageal reflux disease (GERD), stomach ulcers, and other acid-related conditions.',
    dosage: '20mg',
    form: 'Capsule',
    manufacturer: 'AstraZeneca',
    expiryDate: '2025-09-15',
    prescriptionRequired: false,
    sideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Stomach pain'],
    contraindications: ['Liver disease', 'Osteoporosis risk'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '4',
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    brand: 'Glucophage',
    category: 'Diabetes',
    price: 22.50,
    stock: 120,
    description: 'First-line medication for type 2 diabetes that helps control blood sugar levels by improving insulin sensitivity.',
    dosage: '850mg',
    form: 'Tablet',
    manufacturer: 'Bristol Myers Squibb',
    expiryDate: '2025-11-20',
    prescriptionRequired: true,
    sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste', 'Stomach upset'],
    contraindications: ['Kidney disease', 'Liver disease', 'Heart failure'],
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '5',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brand: 'Prinivil',
    category: 'Cardiovascular',
    price: 18.75,
    stock: 90,
    description: 'ACE inhibitor used to treat high blood pressure and heart failure, helping to prevent strokes and heart attacks.',
    dosage: '10mg',
    form: 'Tablet',
    manufacturer: 'Merck',
    expiryDate: '2026-03-10',
    prescriptionRequired: true,
    sideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Fatigue'],
    contraindications: ['Pregnancy', 'Angioedema history', 'Severe kidney disease'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '6',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    brand: 'Bayer',
    category: 'Cardiovascular',
    price: 6.99,
    stock: 300,
    description: 'Low-dose aspirin used for cardiovascular protection and blood clot prevention in high-risk patients.',
    dosage: '81mg',
    form: 'Tablet',
    manufacturer: 'Bayer',
    expiryDate: '2026-08-25',
    prescriptionRequired: false,
    sideEffects: ['Stomach irritation', 'Bleeding risk', 'Nausea'],
    contraindications: ['Bleeding disorders', 'Stomach ulcers', 'Children with viral infections'],
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '7',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brand: 'Lipitor',
    category: 'Cardiovascular',
    price: 28.99,
    stock: 75,
    description: 'Statin medication used to lower cholesterol levels and reduce the risk of heart disease and stroke.',
    dosage: '20mg',
    form: 'Tablet',
    manufacturer: 'Pfizer',
    expiryDate: '2025-10-30',
    prescriptionRequired: true,
    sideEffects: ['Muscle pain', 'Headache', 'Nausea', 'Liver enzyme elevation'],
    contraindications: ['Active liver disease', 'Pregnancy', 'Muscle disorders'],
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '8',
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    brand: 'Nature Made',
    category: 'Vitamins',
    price: 12.49,
    stock: 250,
    description: 'Essential vitamin supplement for bone health, immune function, and overall wellness.',
    dosage: '1000IU',
    form: 'Tablet',
    manufacturer: 'Nature Made',
    expiryDate: '2026-12-31',
    prescriptionRequired: false,
    sideEffects: ['Rare: nausea', 'Constipation with high doses'],
    contraindications: ['Hypercalcemia', 'Kidney stones history'],
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '9',
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    brand: 'Zyrtec',
    category: 'Allergy',
    price: 9.99,
    stock: 180,
    description: 'Second-generation antihistamine used to treat allergic reactions, hay fever, and chronic urticaria.',
    dosage: '10mg',
    form: 'Tablet',
    manufacturer: 'Johnson & Johnson',
    expiryDate: '2026-05-15',
    prescriptionRequired: false,
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
    contraindications: ['Severe kidney disease', 'End-stage renal disease'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: '10',
    name: 'Prednisone',
    genericName: 'Prednisone',
    brand: 'Deltasone',
    category: 'Anti-inflammatory',
    price: 16.25,
    stock: 60,
    description: 'Corticosteroid medication used to treat inflammatory conditions, autoimmune disorders, and allergic reactions.',
    dosage: '5mg',
    form: 'Tablet',
    manufacturer: 'Pfizer',
    expiryDate: '2025-07-20',
    prescriptionRequired: true,
    sideEffects: ['Weight gain', 'Mood changes', 'Increased appetite', 'Sleep disturbances'],
    contraindications: ['Systemic infections', 'Live vaccines', 'Peptic ulcer disease'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=center'
  }
];

// Helper function to update medicine stock
export const updateMedicineStock = (medicineId: string, newStock: number) => {
  const medicine = medicines.find(m => m.id === medicineId);
  if (medicine) {
    medicine.stock = Math.max(0, newStock);
  }
};

// Helper function to get medicine by ID
export const getMedicineById = (medicineId: string): Medicine | undefined => {
  return medicines.find(m => m.id === medicineId);
};

// Helper function to get medicine by name (for prescription matching)
export const getMedicineByName = (name: string): Medicine | undefined => {
  const searchName = name.toLowerCase().trim();
  return medicines.find(m => 
    m.name.toLowerCase().includes(searchName) ||
    m.genericName.toLowerCase().includes(searchName) ||
    searchName.includes(m.name.toLowerCase()) ||
    searchName.includes(m.genericName.toLowerCase())
  );
};