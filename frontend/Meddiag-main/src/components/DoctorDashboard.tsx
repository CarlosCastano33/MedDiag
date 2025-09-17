import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function DoctorDashboard() {
  const { patients, diagnoses } = useApp();

  const activePatients = patients.filter(p => p.status === 'activo').length;
  const totalDiagnoses = diagnoses.length;
  const recentPatients = patients.slice(0, 3);
  const highConfidenceDiagnoses = diagnoses.filter(d => d.confidence > 0.8).length;

  const stats = [
    {
      title: 'Pacientes Activos',
      value: activePatients,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Diagnósticos Totales',
      value: totalDiagnoses,
      icon: FileText,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Alta Confianza',
      value: highConfidenceDiagnoses,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Esta Semana',
      value: 12,
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Médico</h1>
          <p className="text-gray-600">Resumen de tu actividad y pacientes</p>
        </div>
        <div className="flex items-center px-4 py-2 bg-green-50 rounded-xl border border-green-200">
          <Activity className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">Sistema Operativo</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pacientes Recientes</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Ver todos
            </button>
          </div>
          
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">{patient.age} años • {patient.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Última visita</p>
                    <p className="text-sm font-medium text-gray-900">{patient.lastVisit}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${patient.status === 'activo' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {patient.status === 'activo' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Diagnosis Status */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">IA Diagnóstica</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600">Activa</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Base de Datos</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600">Conectada</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Última Actualización</span>
                <span className="text-sm font-medium text-gray-900">Hace 2h</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas Rápidas</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Precisión Promedio</span>
                  <span className="text-sm font-semibold text-gray-900">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Casos Resueltos</span>
                  <span className="text-sm font-semibold text-gray-900">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Alertas</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-800">Revisión Pendiente</p>
                <p className="text-xs text-orange-600 mt-1">3 diagnósticos requieren validación</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">Actualización</p>
                <p className="text-xs text-blue-600 mt-1">Nueva versión del sistema disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}