import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  FileText,
  Heart,
  AlertTriangle,
  Pill,
  Save,
  UserPlus,
  Building2,
  CreditCard,
  Users
} from 'lucide-react';

export default function PatientRegistration() {
  const { addPatient } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M' as 'M' | 'F',
    documentType: 'CC' as 'CC' | 'TI' | 'CE' | 'PP',
    documentNumber: '',
    birthDate: '',
    address: '',
    city: '',
    eps: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    bloodType: '',
    allergies: '',
    medications: '',
    phone: '',
    email: ''
  });

  const epsList = [
    'Sura EPS', 'Compensar EPS', 'Sanitas EPS', 'Nueva EPS', 'Famisanar',
    'Salud Total', 'Coomeva EPS', 'Aliansalud EPS', 'Medimás EPS', 'Capital Salud'
  ];

  const cities = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
    'Bucaramanga', 'Pereira', 'Manizales', 'Ibagué', 'Villavicencio'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newPatient = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        birthDate: formData.birthDate,
        address: formData.address,
        city: formData.city,
        eps: formData.eps,
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
          relationship: formData.emergencyContactRelationship
        },
        bloodType: formData.bloodType || undefined,
        allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : undefined,
        medications: formData.medications ? formData.medications.split(',').map(m => m.trim()) : undefined,
        phone: formData.phone,
        email: formData.email,
        registrationDate: new Date().toISOString().split('T')[0],
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'activo' as const
      };

      addPatient(newPatient);
      setSuccess(true);
      setLoading(false);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          age: '',
          gender: 'M',
          documentType: 'CC',
          documentNumber: '',
          birthDate: '',
          address: '',
          city: '',
          eps: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
          emergencyContactRelationship: '',
          bloodType: '',
          allergies: '',
          medications: '',
          phone: '',
          email: ''
        });
        setSuccess(false);
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <UserPlus className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Paciente Registrado Exitosamente!</h2>
          <p className="text-gray-600 mb-6">El paciente ha sido agregado al sistema y está listo para atención médica.</p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg"
          >
            Registrar Otro Paciente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registro de Pacientes</h1>
        <p className="text-gray-600">Ingresa la información completa del nuevo paciente</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Nombres y apellidos completos"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edad *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Edad en años"
                min="0"
                max="120"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Género *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                required
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Documento *
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => handleInputChange('documentType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                required
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PP">Pasaporte</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Documento *
              </label>
              <input
                type="text"
                value={formData.documentNumber}
                onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Número de identificación"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento *
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center mb-6">
            <Phone className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Información de Contacto</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="+57 300 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="paciente@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Calle 123 #45-67"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                required
              >
                <option value="">Selecciona una ciudad...</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* EPS and Insurance */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center mb-6">
            <Building2 className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Información de EPS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                EPS *
              </label>
              <select
                value={formData.eps}
                onChange={(e) => handleInputChange('eps', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                required
              >
                <option value="">Selecciona una EPS...</option>
                {epsList.map(eps => (
                  <option key={eps} value={eps}>{eps}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Contacto de Emergencia</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Nombre del contacto"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="+57 300 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parentesco *
              </label>
              <select
                value={formData.emergencyContactRelationship}
                onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                required
              >
                <option value="">Selecciona parentesco...</option>
                <option value="Padre">Padre</option>
                <option value="Madre">Madre</option>
                <option value="Esposo/a">Esposo/a</option>
                <option value="Hijo/a">Hijo/a</option>
                <option value="Hermano/a">Hermano/a</option>
                <option value="Abuelo/a">Abuelo/a</option>
                <option value="Tío/a">Tío/a</option>
                <option value="Amigo/a">Amigo/a</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center mb-6">
            <Heart className="h-6 w-6 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Información Médica</h2>
            <span className="ml-2 text-sm text-gray-500">(Opcional)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Sangre
              </label>
              <select
                value={formData.bloodType}
                onChange={(e) => handleInputChange('bloodType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
              >
                <option value="">Selecciona tipo...</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <AlertTriangle className="h-4 w-4 inline mr-1" />
                Alergias Conocidas
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Separar con comas: Penicilina, Aspirina, Mariscos..."
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Pill className="h-4 w-4 inline mr-1" />
                Medicamentos Actuales
              </label>
              <input
                type="text"
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Separar con comas: Losartán 50mg, Metformina 850mg..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
            onClick={() => {
              setFormData({
                name: '',
                age: '',
                gender: 'M',
                documentType: 'CC',
                documentNumber: '',
                birthDate: '',
                address: '',
                city: '',
                eps: '',
                emergencyContactName: '',
                emergencyContactPhone: '',
                emergencyContactRelationship: '',
                bloodType: '',
                allergies: '',
                medications: '',
                phone: '',
                email: ''
              });
            }}
          >
            Limpiar Formulario
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Registrando...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Registrar Paciente
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}