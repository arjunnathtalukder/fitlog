import './globals.css';
import { PlanProvider } from '../components/PlanProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'FitLog — Workout Library',
  description: 'A dark, no-nonsense workout library and daily training log.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#191b21',
                color: '#fff',
                border: '1px solid #292c34',
                fontSize: '12px',
              },
              success: { iconTheme: { primary: '#ccff00', secondary: '#000' } },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
