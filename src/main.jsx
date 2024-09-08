import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </Router>
)