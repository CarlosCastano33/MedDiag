import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  UserPlus, 
  Users, 
  Calendar, 
  Clock,
  Activity,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export default function AdmissionsDashboard() {
  const { patients } = useApp();

  const todayRegistrations = patients.filter(p => 
    p.registrationDate === new Date().toISOString().split('T')[0]
  ).length;
  
  const thisWeekRegistrations = 12; // Mock data
  const pendingDocuments = 3; // Mock data
  const activePatients = patients.filter(p => p.status === 'activo').length;

  const stats = [
    {
      title: 'Registros Hoy',
      value: todayRegistrations,
      change: '+3',
      icon: UserPlus,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Esta Semana',
      value: thisWeekRegistrations,
      change: '+8',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Pacientes Activos',
      value: activePatients,
      change: '+5',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Docs. Pendientes',
      value: pendingDocuments,
      change: '-2',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  const recentRegistrations = patients.slice(-3).reverse();

  const epsList = [
    { name: 'Sura EPS', patients: 45, color: 'bg-blue-500' },
    { name: 'Compensar EPS', patients: 38, color: 'bg-green-500' },
    { name: 'Sanitas EPS', patients: 32, color: 'bg-purple-500' },
    { name: 'Nueva EPS', patients: 28, color: 'bg-orange-500' },
    { name: 'Famisanar', patients: 22, color: 'bg-red-500' }
  ];

  const pendingTasks = [
    { task: 'Verificar documentos - Ana López', priority: 'alta', time: '10:30 AM' },
    { task: 'Actualizar EPS - Carlos Ruiz', priority: 'media', time: '11:15 AM' },
    { task: 'Contacto emergencia - Elena García', priority: 'baja', time: '2:00 PM' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Admisiones</h1>
          <p className="text-gray-600">Gestión de registro y admisión de pacientes</p>
        </div>
        <div className="flex items-center px-4 py-2 bg-green-50 rounded-xl border border-green-200">
          <Activity className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">Sistema Activo</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
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
                  <div className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Registros Recientes</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Ver todos
            </button>
          </div>
          
          <div className="space-y-4">
            {recentRegistrations.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">
                      {patient.documentType} {patient.documentNumber} • {patient.eps}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Registrado</p>
                    <p className="text-sm font-medium text-gray-900">{patient.registrationDate}</p>
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

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          {/* EPS Distribution */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por EPS</h3>
            <div className="space-y-3">
              {epsList.map((eps) => {
                const total = epsList.reduce((acc, e) => acc + e.patients, 0);
                const percentage = (eps.patients / total) * 100;
                return (
                  <div key={eps.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${eps.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{eps.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${eps.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-6 text-right">{eps.patients}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Tareas Pendientes</h3>
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  task.priority === 'alta' ? 'bg-red-50 border-red-200' :
                  task.priority === 'media' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      task.priority === 'alta' ? 'text-red-800' :
                      task.priority === 'media' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      {task.task}
                    </p>
                    <span className="text-xs text-gray-500">{task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas Rápidas</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Registros Completados</span>
                  <span className="text-sm font-semibold text-gray-900">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Documentos Verificados</span>
                  <span className="text-sm font-semibold text-gray-900">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}