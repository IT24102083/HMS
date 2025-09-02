import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  medicineCount: { [key: string]: number };
}

export default function CategorySelector({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  medicineCount 
}: CategorySelectorProps) {
  return (
    <Card className="mb-6 border-sky-200">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 text-gray-900">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
            className={`${
              selectedCategory === 'all' 
                ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                : 'border-sky-200 text-sky-700 hover:bg-sky-50'
            }`}
          >
            All Categories
            <Badge variant="secondary" className="ml-2 bg-white/20">
              {Object.values(medicineCount).reduce((sum, count) => sum + count, 0)}
            </Badge>
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`${
                selectedCategory === category 
                  ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                  : 'border-sky-200 text-sky-700 hover:bg-sky-50'
              }`}
            >
              {category}
              <Badge variant="secondary" className="ml-2 bg-white/20">
                {medicineCount[category] || 0}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}