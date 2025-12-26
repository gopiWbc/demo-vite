import { useMemo, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DatePicker, Input } from "antd";
import type { Dayjs } from "dayjs";
import AppTable from "../../../Components/AppTable";
import PatientDetails from "./PatientDetails";
import CreatePatient from "./CreatePatient";

type SearchPatientFormValues = {
  lastName: string;
  firstName: string;
  middleName: string;
  patientId: string;
  dob: Dayjs | null;
};

type PatientRecord = {
  id: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  dob: string;
  patientId: string;
  address: string;
  city: string;
  state: string;
};

const patientResults: PatientRecord[] = [
  {
    id: "PAT-001",
    lastName: "Lynch",
    firstName: "Jacqueline",
    middleName: "",
    dob: "09/05/1976",
    patientId: "MRN-22991",
    address: "535 S Kingsley Dr Apt 412",
    city: "Los Angeles",
    state: "CA",
  },
  {
    id: "PAT-002",
    lastName: "Lynch",
    firstName: "Kenneth",
    middleName: "",
    dob: "01/13/1966",
    patientId: "MRN-22992",
    address: "8033 W Sunset Blvd 173",
    city: "Los Angeles",
    state: "CA",
  },
  {
    id: "PAT-003",
    lastName: "Lynch",
    firstName: "Alyssa",
    middleName: "",
    dob: "07/13/1952",
    patientId: "MRN-22993",
    address: "424 Broadway St",
    city: "Venice",
    state: "CA",
  },
  {
    id: "PAT-004",
    lastName: "Lynch",
    firstName: "James",
    middleName: "P",
    dob: "11/21/1988",
    patientId: "MRN-22994",
    address: "115 Main Street",
    city: "Santa Monica",
    state: "CA",
  },
  {
    id: "PAT-005",
    lastName: "Barnes",
    firstName: "Kathy",
    middleName: "L",
    dob: "04/30/1972",
    patientId: "MRN-31810",
    address: "82 Harbor Way",
    city: "Los Angeles",
    state: "CA",
  },
];

const columns: ColumnsType<PatientRecord> = [
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Middle Name",
    dataIndex: "middleName",
    key: "middleName",
    render: (value?: string) => value ?? "",
  },
  {
    title: "DOB",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Patient ID/MRN",
    dataIndex: "patientId",
    key: "patientId",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (value: string) => (
      <span className="block max-w-[240px] truncate" title={value}>
        {value}
      </span>
    ),
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
];

const initialFormValues: SearchPatientFormValues = {
  lastName: "",
  firstName: "",
  middleName: "",
  patientId: "",
  dob: null,
};

const SearchPatient = () => {
  const [formValues, setFormValues] = useState<SearchPatientFormValues>(
    initialFormValues
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(
    null
  );
  const [submittedValues, setSubmittedValues] = useState<SearchPatientFormValues | null>(
    null
  );
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);

  const results = useMemo(() => {
    if (!hasSearched || !submittedValues) {
      return [];
    }

    const { lastName, firstName, middleName, patientId, dob } = submittedValues;
    const normalize = (value: string) => value.trim().toLowerCase();

    return patientResults.filter((record) => {
      const matchesLastName = lastName
        ? record.lastName.toLowerCase().includes(normalize(lastName))
        : true;
      const matchesFirstName = firstName
        ? record.firstName.toLowerCase().includes(normalize(firstName))
        : true;
      const matchesMiddleName = middleName
        ? (record.middleName ?? "").toLowerCase().includes(normalize(middleName))
        : true;
      const matchesPatientId = patientId
        ? record.patientId.toLowerCase().includes(normalize(patientId))
        : true;
      const matchesDob = dob ? record.dob === dob.format("MM/DD/YYYY") : true;

      return (
        matchesLastName &&
        matchesFirstName &&
        matchesMiddleName &&
        matchesPatientId &&
        matchesDob
      );
    });
  }, [formValues, hasSearched]);

  const handleInputChange = <Key extends keyof SearchPatientFormValues>(
    key: Key,
    value: SearchPatientFormValues[Key]
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setHasSearched(true);
    setSubmittedValues({ ...formValues });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    setHasSearched(false);
    setSubmittedValues(null);
  };

  if (selectedPatient) {
    return <PatientDetails />;
  }

  if (isCreatingPatient) {
    return (
      <CreatePatient
        onCancel={() => setIsCreatingPatient(false)}
        onSubmit={() => setIsCreatingPatient(false)}
      />
    );
  }

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">Search Patient</h2>
        <div className="flex justify-end">
        <button
          type="button"
          className="btn-primary inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
          onClick={() => setIsCreatingPatient(true)}
        >
          Create Patient
        </button>
        </div>
      </div>
      <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Last Name
              </label>
              <Input
                placeholder="Enter last name"
                allowClear
                size="large"
                className="shadow-sm"
                value={formValues.lastName}
                onChange={(event) =>
                  handleInputChange("lastName", event.target.value)
                }
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                First Name
              </label>
              <Input
                placeholder="Enter first name"
                allowClear
                size="large"
                className="shadow-sm"
                value={formValues.firstName}
                onChange={(event) =>
                  handleInputChange("firstName", event.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Middle Name
              </label>
              <Input
                placeholder="Enter middle name"
                allowClear
                size="large"
                className="shadow-sm"
                value={formValues.middleName}
                onChange={(event) =>
                  handleInputChange("middleName", event.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Patient ID/MRN
              </label>
              <Input
                placeholder="Enter patient ID/MRN"
                allowClear
                size="large"
                className="shadow-sm"
                value={formValues.patientId}
                onChange={(event) =>
                  handleInputChange("patientId", event.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Date of Birth
              </label>
              <DatePicker
                size="large"
                className="w-full shadow-sm"
                placeholder="MM/DD/YYYY"
                format="MM/DD/YYYY"
                value={formValues.dob}
                onChange={(value) => handleInputChange("dob", value)}
              />
            </div>

          <div className="flex flex-row items-center justify-end col-span-2 mt-4 gap-3">
            <button
              type="button"
              className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold shadow-md"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          </div>
        </div>
      
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                Search Results
                <span className="ml-2 font-normal text-gray-500">
                  Displaying {results.length === 0 ? 0 : `1 - ${Math.min(results.length, 10)}`} of {results.length}
                </span>
              </p>
            </div>
          </div>
            <AppTable<PatientRecord>
              columns={columns}
              data={results}
              rowKey="id"
              pagination={false}
              onRowClick={(record)=>setSelectedPatient(record)}
              showCheckbox={false}
            />
        </div>
      )}
    </div>
  );
};

export default SearchPatient;