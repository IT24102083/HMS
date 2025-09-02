import { useState, useEffect, useMemo } from 'react';
import { Medicine, CartItem } from '../types/medicine';
import { medicines, updateMedicineStock, getMedicineById } from '../data/medicines';
import MedicineCard from '../components/MedicineCard';
import Cart from '../components/Cart';
import SearchBar from '../components/SearchBar';
import MedicineDetails from '../components/MedicineDetails';
import PaymentPortal from '../components/PaymentPortal';
import PrescriptionUpload from '../components/PrescriptionUpload';
import CategorySelector from '../components/CategorySelector';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Hospital, Package, Users, TrendingUp, FileText } from 'lucide-react';

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPrescriptionUploadOpen, setIsPrescriptionUploadOpen] = useState(false);
  const [medicineList, setMedicineList] = useState<Medicine[]>(medicines);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pharmacy-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('pharmacy-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Update medicine list when stock changes
  useEffect(() => {
    setMedicineList([...medicines]);
  }, [medicines]);

  // Get unique categories and their counts
  const categories = useMemo(() => {
    return Array.from(new Set(medicineList.map(medicine => medicine.category)));
  }, [medicineList]);

  const medicineCountByCategory = useMemo(() => {
    const counts: { [key: string]: number } = {};
    medicineList.forEach(medicine => {
      counts[medicine.category] = (counts[medicine.category] || 0) + 1;
    });
    return counts;
  }, [medicineList]);

  // Filter medicines based on search and category
  const filteredMedicines = useMemo(() => {
    return medicineList.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, medicineList]);

  const handleAddToCart = (medicine: Medicine) => {
    const currentMedicine = getMedicineById(medicine.id);
    if (!currentMedicine) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.medicine.id === medicine.id);
      
      if (existingItem) {
        if (existingItem.quantity >= currentMedicine.stock) {
          toast.error(`Cannot add more ${medicine.name}. Stock limit reached.`);
          return prevItems;
        }
        
        // Reduce stock when adding to cart
        const newStock = currentMedicine.stock - 1;
        updateMedicineStock(medicine.id, newStock);
        setMedicineList([...medicines]);
        
        // Show low stock warning
        if (newStock < 20 && newStock > 0) {
          toast.warning(`${medicine.name} is running low! Only ${newStock} units left.`, {
            duration: 4000,
          });
        }
        
        toast.success(`Updated ${medicine.name} quantity in cart`);
        return prevItems.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + 1, medicine: { ...item.medicine, stock: newStock } }
            : item
        );
      } else {
        if (currentMedicine.stock <= 0) {
          toast.error(`${medicine.name} is out of stock.`);
          return prevItems;
        }
        
        // Reduce stock when adding to cart
        const newStock = currentMedicine.stock - 1;
        updateMedicineStock(medicine.id, newStock);
        setMedicineList([...medicines]);
        
        // Show low stock warning
        if (newStock < 20 && newStock > 0) {
          toast.warning(`${medicine.name} is running low! Only ${newStock} units left.`, {
            duration: 4000,
          });
        }
        
        toast.success(`Added ${medicine.name} to cart`);
        return [...prevItems, { medicine: { ...medicine, stock: newStock }, quantity: 1 }];
      }
    });
  };

  const handleAddPrescriptionToCart = (prescribedMedicines: { medicine: Medicine; quantity: number }[]) => {
    prescribedMedicines.forEach(({ medicine, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        handleAddToCart(medicine);
      }
    });
  };

  const handleUpdateQuantity = (medicineId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(medicineId);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.medicine.id === medicineId);
      if (!existingItem) return prevItems;

      const currentMedicine = getMedicineById(medicineId);
      if (!currentMedicine) return prevItems;

      const quantityDiff = quantity - existingItem.quantity;
      
      if (quantityDiff > 0) {
        // Increasing quantity - check if enough stock
        if (currentMedicine.stock < quantityDiff) {
          toast.error(`Not enough stock. Only ${currentMedicine.stock} units available.`);
          return prevItems;
        }
        
        // Reduce stock
        const newStock = currentMedicine.stock - quantityDiff;
        updateMedicineStock(medicineId, newStock);
        setMedicineList([...medicines]);
        
        // Show low stock warning
        if (newStock < 20 && newStock > 0) {
          toast.warning(`${currentMedicine.name} is running low! Only ${newStock} units left.`, {
            duration: 4000,
          });
        }
      } else {
        // Decreasing quantity - return stock
        const stockToReturn = Math.abs(quantityDiff);
        const newStock = currentMedicine.stock + stockToReturn;
        updateMedicineStock(medicineId, newStock);
        setMedicineList([...medicines]);
      }

      return prevItems.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity: quantity }
          : item
      );
    });
  };

  const handleRemoveItem = (medicineId: string) => {
    const item = cartItems.find(item => item.medicine.id === medicineId);
    if (item) {
      // Return stock when removing item
      const currentMedicine = getMedicineById(medicineId);
      if (currentMedicine) {
        const newStock = currentMedicine.stock + item.quantity;
        updateMedicineStock(medicineId, newStock);
        setMedicineList([...medicines]);
      }
      
      toast.success(`Removed ${item.medicine.name} from cart`);
    }
    setCartItems(prevItems => prevItems.filter(item => item.medicine.id !== medicineId));
  };

  const handleViewDetails = (medicine: Medicine) => {
    // Get updated medicine data
    const currentMedicine = getMedicineById(medicine.id);
    setSelectedMedicine(currentMedicine || medicine);
    setIsDetailsOpen(true);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setIsPaymentOpen(false);
    // Generate order confirmation
    const orderId = 'ORD-' + Date.now().toString().slice(-6);
    toast.success(`Order ${orderId} confirmed! You will receive a confirmation email shortly.`);
  };

  const stats = {
    totalMedicines: medicineList.length,
    availableStock: medicineList.reduce((sum, med) => sum + med.stock, 0),
    categories: categories.length,
    cartValue: cartItems.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sky-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-sky-600 p-2 rounded-lg">
                <Hospital className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hospital Pharmacy</h1>
                <p className="text-sm text-sky-600">Medicine Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsPrescriptionUploadOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Upload Prescription
              </Button>
              <Badge variant="outline" className="hidden sm:flex border-sky-200 text-sky-700">
                {filteredMedicines.length} medicines available
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-sky-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Medicines</p>
                  <p className="text-xl font-bold text-sky-700">{stats.totalMedicines}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-sky-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Stock</p>
                  <p className="text-xl font-bold text-green-700">{stats.availableStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-sky-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-xl font-bold text-purple-700">{stats.categories}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-sky-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Hospital className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cart Value</p>
                  <p className="text-xl font-bold text-orange-700">${stats.cartValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Selection */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          medicineCount={medicineCountByCategory}
        />

        {/* Search and Filter */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Medicine Grid */}
          <div className="lg:col-span-3">
            {filteredMedicines.length === 0 ? (
              <Card className="p-8 text-center border-sky-200">
                <Package className="h-12 w-12 mx-auto text-sky-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 border-sky-200 text-sky-700 hover:bg-sky-50"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMedicines.map((medicine) => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>

      {/* Medicine Details Modal */}
      <MedicineDetails
        medicine={selectedMedicine}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Payment Portal */}
      <PaymentPortal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={cartItems}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Prescription Upload Modal */}
      <PrescriptionUpload
        isOpen={isPrescriptionUploadOpen}
        onClose={() => setIsPrescriptionUploadOpen(false)}
        onAddPrescriptionToCart={handleAddPrescriptionToCart}
      />
    </div>
  );
}