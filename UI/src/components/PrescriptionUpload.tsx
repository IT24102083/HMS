import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Medicine } from '../types/medicine';
import { getMedicineByName } from '../data/medicines';

interface PrescriptionUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPrescriptionToCart: (medicines: { medicine: Medicine; quantity: number }[]) => void;
}

interface PrescribedMedicine {
  name: string;
  quantity: number;
  found: boolean;
  medicine?: Medicine;
}

export default function PrescriptionUpload({ isOpen, onClose, onAddPrescriptionToCart }: PrescriptionUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prescribedMedicines, setPrescribedMedicines] = useState<PrescribedMedicine[]>([]);
  const [extractedText, setExtractedText] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      processPrescription(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const processPrescription = async (file: File) => {
    setIsProcessing(true);
    try {
      let text = '';
      
      if (file.type === 'text/plain') {
        text = await file.text();
      } else if (file.type === 'application/pdf') {
        // For PDF files, we'll simulate OCR extraction
        text = await simulatePDFExtraction(file);
      } else if (file.type.startsWith('image/')) {
        // For image files, we'll simulate OCR extraction
        text = await simulateImageOCR(file);
      }

      setExtractedText(text);
      const medicines = extractMedicinesFromText(text);
      setPrescribedMedicines(medicines);
      
      toast.success('Prescription processed successfully!');
    } catch (error) {
      toast.error('Error processing prescription. Please try again.');
      console.error('Error processing prescription:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const simulatePDFExtraction = async (file: File): Promise<string> => {
    // Simulate PDF OCR processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return simulated extracted text from a prescription
    return `
    PRESCRIPTION
    
    Patient: John Doe
    Date: ${new Date().toLocaleDateString()}
    
    Rx:
    1. Amoxicillin 500mg - Take 2 tablets daily for 7 days
    2. Ibuprofen 200mg - Take 1 tablet every 6 hours as needed
    3. Omeprazole 20mg - Take 1 capsule daily before breakfast
    4. Vitamin D3 1000IU - Take 1 tablet daily
    
    Dr. Smith
    License: MD12345
    `;
  };

  const simulateImageOCR = async (file: File): Promise<string> => {
    // Simulate image OCR processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Return simulated extracted text from a prescription image
    return `
    MEDICAL PRESCRIPTION
    
    Patient Name: Jane Smith
    Date: ${new Date().toLocaleDateString()}
    
    Prescribed Medications:
    - Metformin 850mg tablets - 2 times daily
    - Lisinopril 10mg - once daily
    - Aspirin 81mg - once daily
    - Atorvastatin 20mg - once daily at bedtime
    
    Dr. Johnson, MD
    `;
  };

  const extractMedicinesFromText = (text: string): PrescribedMedicine[] => {
    const medicines: PrescribedMedicine[] = [];
    const lines = text.toLowerCase().split('\n');
    
    // Common medicine name patterns
    const medicinePatterns = [
      /(\w+)\s+(\d+(?:\.\d+)?)\s*mg/g,
      /(\w+)\s+(\d+)\s*tablets?/g,
      /(\w+)\s+(\d+)\s*capsules?/g,
      /(\w+)\s+.*?(\d+)\s*(?:times?|daily|twice|once)/g
    ];

    lines.forEach(line => {
      medicinePatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(line)) !== null) {
          const medicineName = match[1];
          const quantity = parseInt(match[2]) || 1;
          
          // Skip common words that aren't medicines
          if (['take', 'tablet', 'capsule', 'daily', 'times', 'patient', 'prescription'].includes(medicineName)) {
            continue;
          }

          const foundMedicine = getMedicineByName(medicineName);
          
          if (!medicines.find(m => m.name.toLowerCase() === medicineName)) {
            medicines.push({
              name: medicineName,
              quantity: Math.max(quantity, 1),
              found: !!foundMedicine,
              medicine: foundMedicine
            });
          }
        }
      });
    });

    return medicines;
  };

  const handleAddToCart = () => {
    const availableMedicines = prescribedMedicines
      .filter(pm => pm.found && pm.medicine)
      .map(pm => ({ medicine: pm.medicine!, quantity: pm.quantity }));

    if (availableMedicines.length > 0) {
      onAddPrescriptionToCart(availableMedicines);
      toast.success(`Added ${availableMedicines.length} prescribed medicines to cart`);
      
      const unavailableMedicines = prescribedMedicines.filter(pm => !pm.found);
      if (unavailableMedicines.length > 0) {
        toast.warning(`${unavailableMedicines.length} prescribed medicines are not available in stock`);
      }
      
      onClose();
      resetUpload();
    } else {
      toast.error('No prescribed medicines are available in our inventory');
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setPrescribedMedicines([]);
    setExtractedText('');
  };

  const handleClose = () => {
    onClose();
    resetUpload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Prescription
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {!uploadedFile ? (
            <Card>
              <CardContent className="p-6">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload Prescription
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your prescription file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: PDF, TXT, PNG, JPG, JPEG files
                  </p>
                  <Button className="mt-4">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetUpload}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {isProcessing ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing prescription...</p>
                  </CardContent>
                </Card>
              ) : prescribedMedicines.length > 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Prescribed Medicines</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {prescribedMedicines.map((pm, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {pm.found ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-600" />
                            )}
                            <div>
                              <p className="font-medium capitalize">{pm.name}</p>
                              <p className="text-sm text-gray-600">
                                Quantity: {pm.quantity}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={pm.found ? "default" : "destructive"}
                          >
                            {pm.found ? "Available" : "Not in Stock"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {prescribedMedicines.length > 0 && (
            <Button onClick={handleAddToCart}>
              Add Available Medicines to Cart
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}