import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ExchangeProvider } from './contexts/ExchangeContext';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ExpertisePage from './pages/ExpertisePage';
import ContactPage from './pages/ContactPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <ExchangeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="expertise" element={<ExpertisePage />} />
              <Route path="education" element={<EducationPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="portfolio/:id" element={<PortfolioDetailPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExchangeProvider>
    </AuthProvider>
  );
}