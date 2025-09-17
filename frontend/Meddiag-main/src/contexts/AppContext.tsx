import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  documentType: 'CC' | 'TI' | 'CE' | 'PP';
  documentNumber: string;
  birthDate: string;
  address: string;
  city: string;
  eps: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  phone: string;
  email: string;
  registrationDate: string;
  lastVisit: string;
  diagnosis?: string;
  symptoms?: string[];
  status: 'activo' | 'inactivo';
}

export interface DiagnosisResult {
  id: string;
  patientId: string;
  patientName: string;
  symptoms: string[];
  primaryDiagnosis: string;
  confidence: number;
  alternatives: Array<{
    diagnosis: string;
    confidence: number;
  }>;
  recommendations: string[];
  date: string;
}

interface AppContextType {
  patients: Patient[];
  diagnoses: DiagnosisResult[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  addDiagnosis: (diagnosis: Omit<DiagnosisResult, 'id'>) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ana López',
    age: 35,
    gender: 'F',
    documentType: 'CC',
    documentNumber: '12345678',
    birthDate: '1989-03-15',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
    eps: 'Sura EPS',
    emergencyContact: {
      name: 'Pedro López',
      phone: '+34 666 111 222',
      relationship: 'Esposo'
    },
    bloodType: 'O+',
    allergies: ['Penicilina'],
    medications: ['Losartán 50mg'],
    phone: '+34 666 555 444',
    email: 'ana.lopez@email.com',
    registrationDate: '2023-12-01',
    lastVisit: '2024-01-15',
    diagnosis: 'Hipertensión arterial',
    symptoms: ['dolor de cabeza', 'mareos', 'visión borrosa'],
    status: 'activo'
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    age: 42,
    gender: 'M',
    documentType: 'CC',
    documentNumber: '87654321',
    birthDate: '1982-07-22',
    address: 'Carrera 45 #12-34',
    city: 'Medellín',
    eps: 'Compensar EPS',
    emergencyContact: {
      name: 'María Ruiz',
      phone: '+34 677 222 333',
      relationship: 'Esposa'
    },
    bloodType: 'A+',
    allergies: [],
    medications: ['Metformina 850mg'],
    phone: '+34 677 888 999',
    email: 'carlos.ruiz@email.com',
    registrationDate: '2023-11-15',
    lastVisit: '2024-01-12',
    diagnosis: 'Diabetes tipo 2',
    symptoms: ['sed excesiva', 'fatiga', 'visión borrosa'],
    status: 'activo'
  },
  {
    id: '3',
    name: 'Elena García',
    age: 28,
    gender: 'F',
    documentType: 'CC',
    documentNumber: '11223344',
    birthDate: '1996-11-08',
    address: 'Avenida 68 #23-45',
    city: 'Cali',
    eps: 'Sanitas EPS',
    emergencyContact: {
      name: 'Luis García',
      phone: '+34 655 444 555',
      relationship: 'Padre'
    },
    bloodType: 'B-',
    allergies: ['Aspirina', 'Mariscos'],
    medications: [],
    phone: '+34 655 333 222',
    email: 'elena.garcia@email.com',
    registrationDate: '2024-01-05',
    lastVisit: '2024-01-10',
    diagnosis: 'Migraña',
    symptoms: ['dolor de cabeza intenso', 'náuseas', 'sensibilidad a la luz'],
    status: 'activo'
  }
];

const mockDiagnoses: DiagnosisResult[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Ana López',
    symptoms: ['dolor de cabeza', 'mareos', 'visión borrosa'],
    primaryDiagnosis: 'Hipertensión arterial',
    confidence: 0.89,
    alternatives: [
      { diagnosis: 'Migraña', confidence: 0.65 },
      { diagnosis: 'Tensión ocular', confidence: 0.42 }
    ],
    recommendations: [
      'Monitoreo regular de presión arterial',
      'Dieta baja en sodio',
      'Ejercicio cardiovascular moderado'
    ],
    date: '2024-01-15'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [diagnoses, setDiagnoses] = useState<DiagnosisResult[]>(mockDiagnoses);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = { ...patient, id: Date.now().toString() };
    setPatients(prev => [...prev, newPatient]);
  };

  const addDiagnosis = (diagnosis: Omit<DiagnosisResult, 'id'>) => {
    const newDiagnosis = { ...diagnosis, id: Date.now().toString() };
    setDiagnoses(prev => [...prev, newDiagnosis]);
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      patients,
      diagnoses,
      addPatient,
      addDiagnosis,
      updatePatient,
      deletePatient
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}