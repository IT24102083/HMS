# Hospital Pharmacy Management System - MVP Todo

## Core Features to Implement:
1. **Medicine Catalog** - Display available medicines with details
2. **Search & Filter** - Search medicines by name, category, etc.
3. **Shopping Cart** - Add/remove items, view cart, manage quantities
4. **Medicine Details** - Show detailed information about each medicine
5. **Inventory Status** - Show stock availability
6. **User Interface** - Clean, professional hospital-grade UI

## Files to Create:
1. `src/pages/Index.tsx` - Main pharmacy dashboard
2. `src/components/MedicineCard.tsx` - Individual medicine display card
3. `src/components/Cart.tsx` - Shopping cart component
4. `src/components/SearchBar.tsx` - Search and filter functionality
5. `src/components/MedicineDetails.tsx` - Detailed medicine view
6. `src/types/medicine.ts` - TypeScript interfaces
7. `src/data/medicines.ts` - Sample medicine data
8. `index.html` - Update title and meta info

## Implementation Strategy:
- Use React hooks for state management (useState, useEffect)
- Implement local storage for cart persistence
- Use shadcn/ui components for consistent UI
- Responsive design for different screen sizes
- Professional medical/hospital theme