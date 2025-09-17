import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Shield,
  UserCheck,
  UserX,
  BarChart3,
  PieChart
} from 'lucide-react';

export default function AdminDashboard() {
  const { patients, diagnoses } = useApp();

  const totalUsers = patients.length + 2; // +2 for doctor and admin
  const activePatients = patients.filter(p => p.status === 'activo').length;
  const totalDiagnoses = diagnoses.length;
  const avgConfidence = diagnoses.reduce((acc, d) => acc + d.confidence, 0) / diagnoses.length;

  const stats = [
    {
      title: 'Usuarios Totales',
      value: totalUsers,
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Diagnósticos Hoy',
      value: 8,
      change: '+5%',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Precisión IA',
      value: `${Math.round(avgConfidence * 100)}%`,
      change: '+2%',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Uptime Sistema',
      value: '99.9%',
      change: '0%',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  // Mock data for charts
  const monthlyData = [
    { month: 'Ene', diagnoses: 45, patients: 12 },
    { month: 'Feb', diagnoses: 52, patients: 15 },
    { month: 'Mar', diagnoses: 38, patients: 8 },
    { month: 'Abr', diagnoses: 61, patients: 18 },
    { month: 'May', diagnoses: 55, patients: 16 },
    { month: 'Jun', diagnoses: 67, patients: 22 }
  ];

  const diagnosisTypes = [
    { type: 'Cardiovascular', count: 23, color: 'bg-red-500' },
    { type: 'Respiratorio', count: 18, color: 'bg-blue-500' },
    { type: 'Digestivo', count: 15, color: 'bg-green-500' },
    { type: 'Neurológico', count: 12, color: 'bg-purple-500' },
    { type: 'Otros', count: 8, color: 'bg-gray-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">Gestión y estadísticas del sistema</p>
        </div>
        <div className="flex items-center px-4 py-2 bg-green-50 rounded-xl border border-green-200">
          <Shield className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">Sistema Seguro</span>
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
                <div className="text-right">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Tendencias Mensuales</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 w-8">{data.month}</span>
                  <div className="flex-1">
                    <div className="flex space-x-2">
                      <div className="bg-blue-200 rounded-full h-2 flex-1 max-w-20">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.diagnoses / 70) * 100}%` }}
                        ></div>
                      </div>
                      <div className="bg-green-200 rounded-full h-2 flex-1 max-w-20">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.patients / 25) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{data.diagnoses}</div>
                  <div className="text-xs text-gray-500">{data.patients} pac.</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Diagnósticos</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Nuevos Pacientes</span>
            </div>
          </div>
        </div>

        {/* Diagnosis Distribution */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Distribución de Diagnósticos</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {diagnosisTypes.map((item) => {
              const percentage = (item.count / diagnosisTypes.reduce((acc, d) => acc + d.count, 0)) * 100;
              return (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-6 text-right">{item.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-green-800">API de Diagnóstico</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Operativo</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-green-800">Base de Datos</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Conectada</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-blue-800">Respaldo Automático</span>
              </div>
              <span className="text-xs text-blue-600 font-medium">Cada 6h</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-yellow-800">Mantenimiento</span>
              </div>
              <span className="text-xs text-yellow-600 font-medium">Programado 22:00</span>
            </div>
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Dr. María González</p>
                <p className="text-xs text-gray-500">Nuevo diagnóstico registrado</p>
              </div>
              <span className="text-xs text-gray-400">Hace 5min</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Sistema</p>
                <p className="text-xs text-gray-500">Nuevo paciente registrado</p>
              </div>
              <span className="text-xs text-gray-400">Hace 12min</span>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">IA Diagnóstica</p>
                <p className="text-xs text-gray-500">Modelo actualizado exitosamente</p>
              </div>
              <span className="text-xs text-gray-400">Hace 1h</span>
            </div>
            <div className="flex items-center space-x-3">
              <UserX className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Sistema de Seguridad</p>
                <p className="text-xs text-gray-500">Intento de acceso denegado</p>
              </div>
              <span className="text-xs text-gray-400">Hace 2h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}