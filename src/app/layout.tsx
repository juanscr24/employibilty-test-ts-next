import './global.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'Rick & Morty App',
  description: 'Explora los personajes de Rick and Morty',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
