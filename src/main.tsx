import {createRoot} from 'react-dom/client';
import './index.css';
import {ThemeProvider} from '@/context/theme-provider.tsx';
import App from '@/App.tsx';
import {BrowserRouter} from 'react-router-dom';
import AuthProvider from '@/context/auth-provider.tsx';
import {Toaster} from '@/components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
    <BrowserRouter>
      <AuthProvider>
        <App/>
        <Toaster/>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
