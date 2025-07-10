import { AuthProvider } from './context/AuthContext.jsx';
import { RoutesConfig } from './routes/RoutesConfig.jsx';

function App() {
  return (
    <AuthProvider>
      <RoutesConfig />
    </AuthProvider>
  )
}

export default App;