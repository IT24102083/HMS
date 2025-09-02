import { Medicine } from '../types/medicine';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Calendar, Building, ShoppingCart, CheckCircle } from 'lucide-react';

interface MedicineDetailsProps {
  medicine: Medicine | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (medicine: Medicine) => void;
}

export default function MedicineDetails({ medicine, isOpen, onClose, onAddToCart }: MedicineDetailsProps) {
  if (!medicine) return null;

  const isLowStock = medicine.stock < 20;
  const isOutOfStock = medicine.stock === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <div className="flex flex-col h-full">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{medicine.name}</h2>
                <p className="text-sm text-gray-600 font-normal">{medicine.genericName}</p>
              </div>
              {medicine.prescriptionRequired && (
                <Badge variant="secondary">Prescription Required</Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto pr-2 space-y-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand:</span>
                      <span>{medicine.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <Badge variant="outline">{medicine.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dosage:</span>
                      <span>{medicine.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Form:</span>
                      <span>{medicine.form}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Availability & Pricing</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Stock:</span>
                      <div className="flex items-center gap-1">
                        {isOutOfStock ? (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-red-600 font-medium">Out of Stock</span>
                          </>
                        ) : isLowStock ? (
                          <>
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span className="text-orange-600">{medicine.stock} units</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">{medicine.stock} units</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-lg font-bold text-blue-600">${medicine.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Manufacturer:</span>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{medicine.manufacturer}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expiry Date:</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{new Date(medicine.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-gray-700">{medicine.description}</p>
              </div>
              
              <Separator />
              
              {/* Side Effects */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Side Effects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {medicine.sideEffects.map((effect, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Contraindications */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Contraindications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {medicine.contraindications.map((contraindication, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {contraindication}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t flex-shrink-0">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button 
              onClick={() => {
                onAddToCart(medicine);
                onClose();
              }}
              disabled={isOutOfStock}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}