import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './router';
import './styles/tailwind.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;