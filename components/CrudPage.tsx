import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { PlusIcon, PencilIcon, TrashIcon } from '@/components/icons/PosIcons';

interface Column<T> {
  key: keyof T;
  label: string;
}

interface CrudPageProps<T extends { id: number }> {
  title: string;
  data: T[];
  columns: Column<T>[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  itemSchema: Omit<T, 'id'>;
}

const CrudPage = <T extends { id: number }>(props: CrudPageProps<T>) => {
  const { title, data, columns, setData, itemSchema } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<T> | null>(null);

  const handleOpenModal = (item?: T) => {
    setCurrentItem(item || (itemSchema as Partial<T>));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSave = () => {
    if (!currentItem) return;

    if ('id' in currentItem && currentItem.id) {
      // Edit
      setData(data.map(item => item.id === currentItem.id ? currentItem as T : item));
    } else {
      // Add new
      const newItem = { ...currentItem, id: Date.now() } as T;
      setData([...data, newItem]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este elemento?')) {
        setData(data.filter(item => item.id !== id));
    }
  };

  const handleInputChange = (key: keyof T, value: string) => {
    if(currentItem) {
        // Handle numeric conversion for specific fields if needed
        const numericFields = ['price', 'stock'];
        const isNumeric = numericFields.includes(key as string);
        setCurrentItem({ ...currentItem, [key]: isNumeric ? Number(value) : value });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <Button onClick={() => handleOpenModal()}>
          <PlusIcon className="h-5 w-5" />
          Agregar Nuevo
        </Button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
              <tr>
                {columns.map(col => <th key={String(col.key)} className="px-6 py-3">{col.label}</th>)}
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  {columns.map(col => <td key={String(col.key)} className="px-6 py-4">{String(item[col.key])}</td>)}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                        <button onClick={() => handleOpenModal(item)} className="text-indigo-400 hover:text-indigo-300"><PencilIcon className="h-5 w-5"/></button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300"><TrashIcon className="h-5 w-5"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentItem && 'id' in currentItem && currentItem.id ? `Editar ${title.slice(0, -1)}` : `Agregar ${title.slice(0, -1)}`}>
        <div className="space-y-4">
          {currentItem && Object.keys(itemSchema).map(key => (
            <div key={key}>
              <label className="capitalize block text-sm font-medium text-slate-300 mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
              <Input
                type={typeof itemSchema[key as keyof typeof itemSchema] === 'number' ? 'number' : 'text'}
                value={String(currentItem[key as keyof T] ?? '')}
                onChange={(e) => handleInputChange(key as keyof T, e.target.value)}
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CrudPage;
