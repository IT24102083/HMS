import { CartItem } from '../types/medicine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onRemoveItem: (medicineId: string) => void;
  onCheckout: () => void;
}

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Card className="sticky top-4 shadow-lg border-sky-200">
        <CardHeader className="bg-gradient-to-r from-sky-50 to-sky-100">
          <CardTitle className="flex items-center gap-2 text-sky-800">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="bg-sky-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-sky-400" />
            </div>
            <p className="text-gray-600 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add medicines to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4 shadow-lg border-sky-200">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-sky-100">
        <CardTitle className="flex items-center justify-between text-sky-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </div>
          <Badge variant="secondary" className="bg-sky-100 text-sky-800">
            {totalItems} items
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="max-h-96 overflow-y-auto space-y-3 mb-4">
          {cartItems.map((item) => (
            <div key={item.medicine.id} className="bg-white border border-sky-100 rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                {/* Medicine Image - Made smaller */}
                <div className="flex-shrink-0">
                  <img
                    src={item.medicine.image}
                    alt={item.medicine.name}
                    className="w-12 h-12 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop&crop=center';
                    }}
                  />
                </div>
                
                {/* Medicine Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {item.medicine.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.medicine.dosage} {item.medicine.form}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.medicine.prescriptionRequired && (
                          <Badge variant="secondary" className="text-xs">Rx</Badge>
                        )}
                        <span className="text-xs text-gray-400">{item.medicine.brand}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.medicine.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.medicine.id, Math.max(0, item.quantity - 1))}
                        className="h-7 w-7 p-0 hover:bg-sky-50 border-sky-200"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium bg-sky-50 py-1 px-2 rounded">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                        className="h-7 w-7 p-0 hover:bg-sky-50 border-sky-200"
                        disabled={item.quantity >= item.medicine.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-sky-600">
                        ${(item.medicine.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${item.medicine.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        {/* Cart Summary */}
        <div className="space-y-4">
          <div className="bg-sky-50 rounded-lg p-3 space-y-2 border border-sky-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({totalItems} items):</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-sky-600">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            onClick={onCheckout} 
            className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-200" 
            size="lg"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Proceed to Payment
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Secure checkout with 256-bit SSL encryption
          </p>
        </div>
      </CardContent>
    </Card>
  );
}