import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card';
import { mockProducts } from '@/data/mock';

const salesData = [
  { name: 'Lun', Ventas: 4000 },
  { name: 'Mar', Ventas: 3000 },
  { name: 'Mié', Ventas: 2000 },
  { name: 'Jue', Ventas: 2780 },
  { name: 'Vie', Ventas: 1890 },
  { name: 'Sáb', Ventas: 2390 },
  { name: 'Dom', Ventas: 3490 },
];

const Dashboard: React.FC = () => {
    const lowStockProducts = mockProducts.filter(p => p.stock < 100);
    const bestSellingProducts = [...mockProducts].sort((a,b) => b.stock - a.stock).slice(0, 5);

    const StatCard: React.FC<{title: string, value: string, change: string}> = ({ title, value, change }) => (
      <div className="shadow-xl" >
         <Card className="p-8 " >
            <p className="text-xl pb-4 text-slate-800">{title}</p>
            <p className="text-3xl font-bold text-black/70">{value}</p>
            <p className="text-sm text-green-700">{change}</p>
        </Card>
        </div>
    );

    const ProductList: React.FC<{title: string, products: typeof mockProducts}> = ({ title, products }) => (
        <Card className="p-4 h-full ">
            <h3 className="font-semibold text-slate-800 mb-3">{title}</h3>
            <ul className="space-y-2 text-sm">
                {products.map(p => (
                    <li key={p.id} className="flex justify-between items-center text-slate-800">
                        <span>{p.name}</span>
                        <span className={`font-bold ${p.stock < 100 ? 'bg-red-700 py-1 px-6 text-white/80 rounded-xl' : 'text-slate-800'}`}>{p.stock}</span>
                    </li>
                ))}
            </ul>
        </Card>
    );


  return (
    <div className="space-y-6 ">
      {/* Marcadores / KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ventas Hoy" value="$1,250" change="+12% vs ayer" />
        <StatCard title="Transacciones" value="82" change="+5% vs ayer" />
        <StatCard title="Ticket Promedio" value="$15.24" change="-2% vs ayer" />
        <StatCard title="Nuevos Clientes" value="4" change="+1 vs ayer" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico Financiero */}
        <Card className="lg:col-span-2 p-4 h-[400px]">
          <h3 className="font-semibold text-slate-800 mb-4">Resumen de Ventas Semanal</h3>
           <ResponsiveContainer width="100%" height="90%">
            <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
              <XAxis dataKey="name" stroke="000000" />
              <YAxis stroke="#000000" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.75rem'
                }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend wrapperStyle={{color: '#e2e8f0'}} />
              <Bar dataKey="Ventas" fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Productos Agotados / Stock Mínimo */}
        <ProductList title="Productos con Stock Mínimo" products={lowStockProducts} />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <ProductList title="Productos más vendidos (simulado)" products={bestSellingProducts}/>
         <Card className="p-4 h-full">
            <h3 className="font-semibold text-slate-800 mb-3">Actividad Reciente</h3>
            <ul className="space-y-3 text-sm text-slate-800">
                <li>Venta #1024 a Público en General por $250.00</li>
                <li>Nuevo cliente registrado: Ana Torres</li>
                <li>Entrada de efectivo: $500.00 (Inicio de turno)</li>
                <li>Producto actualizado: Paracetamol 500mg</li>
            </ul>
         </Card>
      </div>

    </div>
  );
};

export default Dashboard;
