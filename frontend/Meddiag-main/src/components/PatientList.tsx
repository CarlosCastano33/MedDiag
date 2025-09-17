import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Search, 
  Filter, 
  Users, 
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  Heart,
  AlertTriangle,
  Pill
} from 'lucide-react';

export default function PatientList() {
  const { patients, deletePatient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEPS, setFilterEPS] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const epsList = [...new Set(patients.map(p => p.eps))];
  const cities = [...new Set(patients.map(p => p.city))];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.documentNumber.includes(searchTerm);
    const matchesEPS = !filterEPS || patient.eps === filterEPS;
    const matchesCity = !filterCity || patient.city === filterCity;
    
    return matchesSearch && matchesEPS && matchesCity;
  });

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lista de Pacientes</h1>
        <p className="text-gray-600">Gestiona y consulta la información de todos los pacientes registrados</p>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="h-4 w-4 inline mr-1" />
              Buscar Paciente
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
              placeholder="Buscar por nombre o documento..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 className="h-4 w-4 inline mr-1" />
              Filtrar por EPS
            </label>
            <select
              value={filterEPS}
              onChange={(e) => setFilterEPS(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
            >
              <option value="">Todas las EPS</option>
              {epsList.map(eps => (
                <option key={eps} value={eps}>{eps}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Filtrar por Ciudad
            </label>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
            >
              <option value="">Todas las ciudades</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Mostrando {filteredPatients.length} de {patients.length} pacientes
        </p>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Total: {patients.length} pacientes</span>
        </div>
      </div>

      {/* Patient List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id} 
              className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border transition-all duration-200 cursor-pointer ${
                selectedPatient === patient.id 
                  ? 'border-blue-300 ring-2 ring-blue-100' 
                  : 'border-blue-100 hover:border-blue-200 hover:shadow-xl'
              }`}
              onClick={() => setSelectedPatient(patient.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">
                      {patient.documentType} {patient.documentNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {patient.age} años • {patient.gender === 'M' ? 'Masculino' : 'Femenino'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPatient(patient.id);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit functionality would go here
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{patient.eps}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'activo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {patient.status === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Details */}
        <div className="sticky top-8">
          {selectedPatientData ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Detalles del Paciente</h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {selectedPatientData.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedPatientData.name}</h3>
                      <p className="text-gray-600">{selectedPatientData.age} años • {selectedPatientData.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Contacto
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedPatientData.phone}
                    </p>
                    {selectedPatientData.email && (
                      <p className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {selectedPatientData.email}
                      </p>
                    )}
                    <p className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedPatientData.address}, {selectedPatientData.city}
                    </p>
                  </div>
                </div>

                {/* Document Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Documentación
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Documento:</span> {selectedPatientData.documentType} {selectedPatientData.documentNumber}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Fecha de Nacimiento:</span> {selectedPatientData.birthDate}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">EPS:</span> {selectedPatientData.eps}
                    </p>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Contacto de Emergencia
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Nombre:</span> {selectedPatientData.emergencyContact.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Teléfono:</span> {selectedPatientData.emergencyContact.phone}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Parentesco:</span> {selectedPatientData.emergencyContact.relationship}
                    </p>
                  </div>
                </div>

                {/* Medical Info */}
                {(selectedPatientData.bloodType || selectedPatientData.allergies?.length || selectedPatientData.medications?.length) && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Información Médica
                    </h4>
                    <div className="space-y-2 text-sm">
                      {selectedPatientData.bloodType && (
                        <p className="text-gray-600">
                          <span className="font-medium">Tipo de Sangre:</span> {selectedPatientData.bloodType}
                        </p>
                      )}
                      {selectedPatientData.allergies?.length && (
                        <div className="text-gray-600">
                          <span className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-1 text-orange-500" />
                            Alergias:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedPatientData.allergies.map((allergy, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedPatientData.medications?.length && (
                        <div className="text-gray-600">
                          <span className="font-medium flex items-center">
                            <Pill className="h-4 w-4 mr-1 text-blue-500" />
                            Medicamentos:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedPatientData.medications.map((medication, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                {medication}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Registration Info */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Fecha de Registro:</span>
                    <span className="font-medium text-gray-900">{selectedPatientData.registrationDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Última Visita:</span>
                    <span className="font-medium text-gray-900">{selectedPatientData.lastVisit}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedPatientData.status === 'activo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedPatientData.status === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 shadow-lg border border-blue-100 text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona un Paciente</h3>
              <p className="text-gray-600">Haz clic en cualquier paciente de la lista para ver sus detalles completos</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pacientes Activos</p>
              <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.status === 'activo').length}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">EPS Diferentes</p>
              <p className="text-2xl font-bold text-gray-900">{epsList.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}