import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Plus, X, Search, Stethoscope, User, Calendar } from 'lucide-react';

export default function SymptomsForm() {
  const { patients, addDiagnosis } = useApp();
  const [selectedPatient, setSelectedPatient] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const commonSymptoms = [
    'Dolor de cabeza', 'Fiebre', 'Tos', 'Fatiga', 'Náuseas', 'Mareos',
    'Dolor abdominal', 'Dificultad para respirar', 'Dolor en el pecho',
    'Pérdida de apetito', 'Dolor muscular', 'Visión borrosa',
    'Sed excesiva', 'Palpitaciones', 'Insomnio', 'Dolor de garganta'
  ];

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setSymptomInput('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || symptoms.length === 0) return;

    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const patient = patients.find(p => p.id === selectedPatient);
      if (patient) {
        // Mock AI diagnosis result
        const mockResults = [
          {
            diagnosis: 'Hipertensión arterial',
            confidence: 0.89,
            alternatives: [
              { diagnosis: 'Migraña', confidence: 0.65 },
              { diagnosis: 'Tensión ocular', confidence: 0.42 }
            ]
          },
          {
            diagnosis: 'Diabetes tipo 2',
            confidence: 0.85,
            alternatives: [
              { diagnosis: 'Síndrome metabólico', confidence: 0.71 },
              { diagnosis: 'Resistencia a la insulina', confidence: 0.58 }
            ]
          },
          {
            diagnosis: 'Migraña',
            confidence: 0.92,
            alternatives: [
              { diagnosis: 'Cefalea tensional', confidence: 0.76 },
              { diagnosis: 'Sinusitis', confidence: 0.43 }
            ]
          }
        ];

        const result = mockResults[Math.floor(Math.random() * mockResults.length)];

        addDiagnosis({
          patientId: patient.id,
          patientName: patient.name,
          symptoms,
          primaryDiagnosis: result.diagnosis,
          confidence: result.confidence,
          alternatives: result.alternatives,
          recommendations: [
            'Realizar seguimiento en 2 semanas',
            'Monitoreo continuo de síntomas',
            'Exámenes complementarios si persisten síntomas'
          ],
          date: new Date().toISOString().split('T')[0]
        });

        // Reset form
        setSelectedPatient('');
        setSymptoms([]);
        setSymptomInput('');
        setAdditionalNotes('');
      }

      setLoading(false);
    }, 2000);
  };

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnóstico Asistido</h1>
        <p className="text-gray-600">Ingresa los síntomas para obtener sugerencias de diagnóstico</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Seleccionar Paciente
              </label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                required
              >
                <option value="">Selecciona un paciente...</option>
                {patients.filter(p => p.status === 'activo').map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.age} años
                  </option>
                ))}
              </select>
            </div>

            {/* Patient Info */}
            {selectedPatientData && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {selectedPatientData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">{selectedPatientData.name}</h3>
                    <p className="text-sm text-blue-700">
                      {selectedPatientData.age} años • {selectedPatientData.gender === 'M' ? 'Masculino' : 'Femenino'} • 
                      Última visita: {selectedPatientData.lastVisit}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Symptoms Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Stethoscope className="h-4 w-4 inline mr-2" />
                Síntomas
              </label>
              
              {/* Add symptom */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="Escribe un síntoma..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSymptom(symptomInput))}
                />
                <button
                  type="button"
                  onClick={() => addSymptom(symptomInput)}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Common symptoms */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Síntomas comunes:</p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map(symptom => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => addSymptom(symptom)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors duration-200"
                      disabled={symptoms.includes(symptom)}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected symptoms */}
              {symptoms.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Síntomas seleccionados:</p>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map(symptom => (
                      <div key={symptom} className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 rounded-xl">
                        <span className="text-sm">{symptom}</span>
                        <button
                          type="button"
                          onClick={() => removeSymptom(symptom)}
                          className="ml-2 p-0.5 hover:bg-blue-200 rounded-full transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Información adicional sobre el paciente o síntomas..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !selectedPatient || symptoms.length === 0}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Procesando diagnóstico...
                </div>
              ) : (
                'Obtener Diagnóstico'
              )}
            </button>
          </form>
        </div>

        {/* AI Info */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistema de IA</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Estado: Operativo</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>El sistema analiza los síntomas ingresados y proporciona:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                  <li>Diagnóstico principal con nivel de confianza</li>
                  <li>Diagnósticos alternativos</li>
                  <li>Recomendaciones de tratamiento</li>
                  <li>Sugerencias de seguimiento</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Importante</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p className="text-orange-700 font-medium">⚠️ Recordatorio:</p>
              <p>Los resultados de la IA son sugerencias de apoyo. Siempre use su criterio médico profesional para el diagnóstico final.</p>
              <p className="text-xs text-gray-500 mt-3">
                Versión del modelo: v2.1.0<br />
                Última actualización: 15/01/2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}