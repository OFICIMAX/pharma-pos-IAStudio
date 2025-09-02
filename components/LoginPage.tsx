import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { LogoIcon } from '@/components/icons/LogoIcon';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo purposes
    if (email === 'admin@example.com' && password === 'admin123') {
      onLogin();
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    
    <div className="h-screen w-screen  flex items-center justify-center p-4">
      {/*full screen with centered card */}


      {/* Login Card */}
      <Card className="w-full  max-w-md p-8">
        <div className='shadow-lg' ></div>

        {/* Logo and Title */}
        <div className=" flex flex-col  items-center mb-6 mx-20">
          
          
          {/*<LogoIcon className="h-50 w-50 text-indigo-400" />*/}
          <div className=" flex justify-center mt-10 mb-4">
                            
              <img src="/logoapp.png" alt="Logo" className="w-60 h-60 rounded-full border-2 border-white shadow-lg" />
          </div>

          <h1 className="text-3xl font-bold mt-4 text-black/80">ZensaNext.POS</h1>
          <p className="text-slate-600">Bienvenido de nuevo</p>
          
          <p className="text-slate-600">Por favor ingresa tus credenciales</p>

        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-1">Usuario</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-800 mb-1">Contraseña</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full !py-3 !text-base">
            Iniciar Sesión 
          </Button>

          <div className="text-center">
        <button type="button" className="text-sm text-indigo-600 hover:text-indigo-500">
          Rellenar credenciales automáticamente
        </button>
      </div>

        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
