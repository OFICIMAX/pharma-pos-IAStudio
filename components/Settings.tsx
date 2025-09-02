import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const Settings: React.FC = () => {
  const [vat, setVat] = useState(15); // Default VAT 15%

  const handleSave = () => {
    alert(`Configuración guardada. Nuevo valor de IVA: ${vat}%`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-wblack/70 mb-6">Configuraciones Generales</h1>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-black/90 mb-2">Impuestos</h2>
            <div className="flex items-center gap-4">
              <label htmlFor="vat" className="text-black/70">Valor del IVA General (%):</label>
              <Input
                id="vat"
                type="number"
                value={vat}
                onChange={(e) => setVat(parseInt(e.target.value, 10))}
                className="w-24"
              />
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6">
            <h2 className="text-xl font-semibold text-black/90 mb-2">Información de la Farmacia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-black/80 block mb-1">Nombre de la Farmacia</label>
                    <Input defaultValue="Pharma POS Central" />
                </div>
                 <div>
                    <label className="text-black/80 block mb-1">Dirección</label>
                    <Input defaultValue="Av. Siempreviva 742" />
                </div>
                 <div>
                    <label className="text-slate-700 block mb-1">Teléfono</label>
                    <Input defaultValue="+123 456 7890" />
                </div>
                 <div>
                    <label className="text-slate-700 block mb-1">R.U.C.</label>
                    <Input defaultValue="XYZ123456ABC" />
                </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>Guardar Cambios</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
