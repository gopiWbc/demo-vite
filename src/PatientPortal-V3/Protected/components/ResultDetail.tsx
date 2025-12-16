import { Download, ArrowLeft, AlertCircle } from 'lucide-react';

interface TestResult {
  id: string;
  testName: string;
  orderDate: string;
  resultDate: string;
  status: 'Final' | 'Preliminary';
  orderingPhysician: string;
}

interface ResultDetailProps {
  result: TestResult;
  onBack: () => void;
}

interface LabTest {
  name: string;
  result: string;
  unit: string;
  referenceRange: string;
  flag?: 'High' | 'Low' | 'Normal';
}

export default function ResultDetail({ result, onBack }: ResultDetailProps) {
  const labTests: LabTest[] = getLabTestsByType(result.testName);

  const handleDownload = () => {
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">PrimEx Medical Center</h1>
              <p className="text-gray-600 mt-1">123 Medical Center Drive, Springfield, IL 62701</p>
              <p className="text-gray-600">Phone: (555) 123-4567 | Fax: (555) 123-4568</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {result.status}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{result.testName}</h2>

          <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-500">Patient Name</p>
              <p className="text-base text-gray-900 mt-1">John Anderson</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Patient ID</p>
              <p className="text-base text-gray-900 mt-1">PT-2024-0891</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="text-base text-gray-900 mt-1">03/15/1985</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-base text-gray-900 mt-1">Male</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Collection Date</p>
              <p className="text-base text-gray-900 mt-1">{result.orderDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Result Date</p>
              <p className="text-base text-gray-900 mt-1">{result.resultDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ordering Physician</p>
              <p className="text-base text-gray-900 mt-1">{result.orderingPhysician}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Report Status</p>
              <p className="text-base text-gray-900 mt-1">{result.status}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Laboratory Results</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flag
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {labTests.map((test, index) => (
                  <tr key={index} className={test.flag !== 'Normal' ? 'bg-yellow-50' : ''}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {test.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {test.result}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {test.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {test.referenceRange}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {test.flag && test.flag !== 'Normal' && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          test.flag === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {test.flag}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Important Notes</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>This report has been reviewed and verified by the laboratory director</li>
              <li>Reference ranges may vary based on age, gender, and testing methodology</li>
              <li>Abnormal results should be discussed with your healthcare provider</li>
              <li>For questions regarding these results, please contact your ordering physician</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6 text-center text-sm text-gray-500">
          <p>Laboratory Director: Dr. Michael Roberts, MD | CLIA#: 14D2086381</p>
          <p className="mt-1">This report is confidential and intended solely for the patient and ordering physician</p>
        </div>
      </div>
    </div>
  );
}

function getLabTestsByType(testName: string): LabTest[] {
  switch (testName) {
    case 'Complete Blood Count (CBC)':
      return [
        { name: 'White Blood Cell Count', result: '7.2', unit: 'K/uL', referenceRange: '4.5-11.0', flag: 'Normal' },
        { name: 'Red Blood Cell Count', result: '4.8', unit: 'M/uL', referenceRange: '4.5-5.9', flag: 'Normal' },
        { name: 'Hemoglobin', result: '14.5', unit: 'g/dL', referenceRange: '13.5-17.5', flag: 'Normal' },
        { name: 'Hematocrit', result: '43.2', unit: '%', referenceRange: '39-49', flag: 'Normal' },
        { name: 'Platelet Count', result: '245', unit: 'K/uL', referenceRange: '150-400', flag: 'Normal' },
      ];
    case 'Comprehensive Metabolic Panel':
      return [
        { name: 'Glucose', result: '105', unit: 'mg/dL', referenceRange: '70-100', flag: 'High' },
        { name: 'BUN', result: '18', unit: 'mg/dL', referenceRange: '7-20', flag: 'Normal' },
        { name: 'Creatinine', result: '1.0', unit: 'mg/dL', referenceRange: '0.7-1.3', flag: 'Normal' },
        { name: 'Sodium', result: '140', unit: 'mmol/L', referenceRange: '136-145', flag: 'Normal' },
        { name: 'Potassium', result: '4.2', unit: 'mmol/L', referenceRange: '3.5-5.1', flag: 'Normal' },
        { name: 'Chloride', result: '102', unit: 'mmol/L', referenceRange: '98-107', flag: 'Normal' },
        { name: 'CO2', result: '25', unit: 'mmol/L', referenceRange: '22-29', flag: 'Normal' },
        { name: 'Calcium', result: '9.5', unit: 'mg/dL', referenceRange: '8.5-10.5', flag: 'Normal' },
      ];
    case 'Lipid Panel':
      return [
        { name: 'Total Cholesterol', result: '210', unit: 'mg/dL', referenceRange: '<200', flag: 'High' },
        { name: 'Triglycerides', result: '150', unit: 'mg/dL', referenceRange: '<150', flag: 'Normal' },
        { name: 'HDL Cholesterol', result: '45', unit: 'mg/dL', referenceRange: '>40', flag: 'Normal' },
        { name: 'LDL Cholesterol', result: '135', unit: 'mg/dL', referenceRange: '<100', flag: 'High' },
        { name: 'VLDL Cholesterol', result: '30', unit: 'mg/dL', referenceRange: '5-40', flag: 'Normal' },
      ];
    case 'Thyroid Stimulating Hormone (TSH)':
      return [
        { name: 'TSH', result: '2.5', unit: 'mIU/L', referenceRange: '0.4-4.0', flag: 'Normal' },
      ];
    default:
      return [];
  }
}
