import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import DoctorDashboard from './components/DoctorDashboard';
import SymptomsForm from './components/SymptomsForm';
import AdminDashboard from './components/AdminDashboard';
import AdmissionsDashboard from './components/AdmissionsDashboard';
import PatientRegistration from './components/PatientRegistration';
import PatientList from './components/PatientList';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState(
    user?.role === 'medico' ? 'dashboard' : 
    user?.role === 'admin' ? 'admin-dashboard' : 'admissions-dashboard'
  );

  React.useEffect(() => {
    if (user?.role) {
      setCurrentPage(
        user.role === 'medico' ? 'dashboard' : 
        user.role === 'admin' ? 'admin-dashboard' : 'admissions-dashboard'
      );
    }
  }, [user?.role]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DoctorDashboard />;
      case 'symptoms':
        return <SymptomsForm />;
      case 'patients':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Pacientes</h2>
            <p className="text-gray-600">Funcionalidad en desarrollo...</p>
          </div>
        );
      case 'history':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Historial Médico</h2>
            <p className="text-gray-600">Funcionalidad en desarrollo...</p>
          </div>
        );
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'user-management':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Usuarios</h2>
            <p className="text-gray-600">Funcionalidad en desarrollo...</p>
          </div>
        );
      case 'statistics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Estadísticas Avanzadas</h2>
            <p className="text-gray-600">Funcionalidad en desarrollo...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración del Sistema</h2>
            <p className="text-gray-600">Funcionalidad en desarrollo...</p>
          </div>
        );
      case 'admissions-dashboard':
        return <AdmissionsDashboard />;
      case 'patient-registration':
        return <PatientRegistration />;
      case 'patient-list':
        return <PatientList />;
      case 'eps-management':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de EPS</h2>
            <p className="text-gray-600">Funcionalidad en desarrollo...</p>
          </div>
        );
      default:
        return user?.role === 'medico' ? <DoctorDashboard /> : 
               user?.role === 'admin' ? <AdminDashboard /> : <AdmissionsDashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;