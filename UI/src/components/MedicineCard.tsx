import { Medicine } from '../types/medicine';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
  onViewDetails: (medicine: Medicine) => void;
}

export default function MedicineCard({ medicine, onAddToCart, onViewDetails }: MedicineCardProps) {
  const isLowStock = medicine.stock < 20;
  const isOutOfStock = medicine.stock === 0;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-sky-100">
      {/* Medicine Image - Made smaller */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop&crop=center';
          }}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {medicine.prescriptionRequired && (
            <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
              Rx
            </Badge>
          )}
          <Badge variant="outline" className="text-xs bg-white/90 border-sky-200">
            {medicine.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
          {medicine.name}
        </CardTitle>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">{medicine.genericName}</p>
          <p className="text-xs text-gray-500 font-medium">{medicine.brand}</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-3">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium bg-sky-50 text-sky-700 px-2 py-1 rounded border border-sky-200">
              {medicine.dosage} {medicine.form}
            </span>
            <span className="text-lg font-bold text-sky-600">
              ${medicine.price.toFixed(2)}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {medicine.description}
          </p>
          
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <div className="flex items-center text-red-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Out of Stock</span>
              </div>
            ) : isLowStock ? (
              <div className="flex items-center text-orange-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Low Stock ({medicine.stock})</span>
              </div>
            ) : (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">In Stock ({medicine.stock})</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t bg-sky-50/30">
        <div className="w-full space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(medicine)}
              className="flex-1 hover:bg-sky-50 border-sky-200 text-sky-700"
            >
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Button>
            <Button
              size="sm"
              onClick={() => onAddToCart(medicine)}
              disabled={isOutOfStock}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            by {medicine.manufacturer}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}