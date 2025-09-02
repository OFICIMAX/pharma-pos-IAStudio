import React, { useState, useMemo, useCallback } from 'react';
import { Product, Customer, CartItem, PaymentMethod } from '@/types';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { PlusIcon, TrashIcon, UserPlusIcon } from '@/components/icons/PosIcons';

interface PointOfSaleProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    customers: Customer[];
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const PointOfSale: React.FC<PointOfSaleProps> = ({ products, setProducts, customers, setCustomers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers.find(c => c.name === 'Público en General')!);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const taxRate = 0.15; // 15% IVA

    const filteredProducts = useMemo(() => {
        if (!searchTerm) {
            return products;
        }
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.laboratory.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, products]);

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.product.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { product, quantity: 1, discount: 0 }]);
        }
    };
    
    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };
    
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    };

    const calculations = useMemo(() => {
        const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const itemDiscounts = cart.reduce((acc, item) => acc + (item.product.price * item.quantity * item.discount / 100), 0);
        const subtotalAfterItemDiscounts = subtotal - itemDiscounts;
        const totalDiscountAmount = subtotalAfterItemDiscounts * (totalDiscount / 100);
        const finalSubtotal = subtotalAfterItemDiscounts - totalDiscountAmount;
        const taxAmount = finalSubtotal * taxRate;
        const grandTotal = finalSubtotal + taxAmount;
        return { subtotal, itemDiscounts, totalDiscountAmount, taxAmount, grandTotal };
    }, [cart, totalDiscount, taxRate]);

    const handlePayment = () => {
      // Logic to finalize sale
      alert(`Venta completada por ${calculations.grandTotal.toFixed(2)} al cliente ${selectedCustomer.name}. Gracias!`);
      // Update stock
      const newProducts = [...products];
      cart.forEach(cartItem => {
        const productIndex = newProducts.findIndex(p => p.id === cartItem.product.id);
        if(productIndex !== -1) {
          newProducts[productIndex].stock -= cartItem.quantity;
        }
      });
      setProducts(newProducts);

      // Reset
      setCart([]);
      setTotalDiscount(0);
      setIsPaymentModalOpen(false);
    }
    
    // Payment Modal Component
    const PaymentModalContent: React.FC = () => {
        const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo');
        const [amountPaid, setAmountPaid] = useState(0);
        const change = amountPaid > calculations.grandTotal ? amountPaid - calculations.grandTotal : 0;

        return (
            <div className="space-y-4">
                <div className="text-center">
                    <p className="text-slate-400">Total a Pagar</p>
                    <p className="text-4xl font-bold text-white">${calculations.grandTotal.toFixed(2)}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-300">Método de Pago</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className="mt-1 w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="cheque">Cheque</option>
                        <option value="credito">Crédito</option>
                    </select>
                </div>
                {paymentMethod === 'efectivo' && (
                    <div>
                         <label className="text-sm font-medium text-slate-300">Monto Recibido</label>
                        <Input type="number" placeholder="0.00" value={amountPaid || ''} onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)} />
                    </div>
                )}
                 {paymentMethod === 'efectivo' && amountPaid > 0 && (
                     <div className="text-center bg-slate-900/50 p-3 rounded-lg">
                         <p className="text-slate-400">Cambio</p>
                         <p className="text-3xl font-bold text-green-400">${change.toFixed(2)}</p>
                     </div>
                 )}
                 <Button onClick={handlePayment} variant="success" className="w-full !py-3">Confirmar Pago</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-7rem)]">
            {/* Left side: Product List */}
            <div className="lg:col-span-3 flex flex-col h-full">
                <Card className="p-4 mb-4 shrink-0">
                    <Input
                        type="text"
                        placeholder="Buscar producto por nombre, categoría o laboratorio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Card>
                <Card className="flex-1 overflow-y-auto scrollbar-thin">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-slate-900/50 rounded-lg p-3 flex flex-col text-center cursor-pointer hover:bg-slate-900/80 transition-colors" onClick={() => addToCart(product)}>
                                <p className="font-semibold text-sm text-white flex-grow">{product.name}</p>
                                <p className="text-xs text-slate-400">{product.laboratory}</p>
                                <p className="text-lg font-bold text-indigo-400 mt-2">${product.price.toFixed(2)}</p>
                                <p className={`text-xs ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>Stock: {product.stock}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Right side: Cart */}
            <div className="lg:col-span-2 flex flex-col h-full">
                <Card className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Venta Actual</h2>
                        <div className="flex gap-2">
                             <Button variant="secondary">Pedidos en Espera</Button>
                              <Button variant="secondary">Cotización</Button>
                        </div>
                    </div>
                    
                    <div className="bg-white/50 rounded-lg p-3 mb-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-400">Cliente</p>
                            <p className="font-semibold text-white">{selectedCustomer.name}</p>
                        </div>
                        <Button variant="secondary" onClick={() => setIsClientModalOpen(true)}>
                           <UserPlusIcon className="h-5 w-5" /> Cambiar
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto -mr-2 pr-2 space-y-2 scrollbar-thin">
                        {cart.length === 0 ? (
                             <p className="text-slate-400 text-center py-10">El carrito está vacío</p>
                        ) : cart.map(item => (
                            <div key={item.product.id} className="flex items-center bg-slate-900/50 p-2 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-semibold text-sm text-white">{item.product.name}</p>
                                    <p className="text-xs text-slate-400">${item.product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))} className="w-14 bg-slate-700 text-center rounded" />
                                    <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-300 p-1">
                                      <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 text-sm">
                       <div className="flex justify-between"><span className="text-slate-400">Subtotal:</span> <span className="text-white">${calculations.subtotal.toFixed(2)}</span></div>
                       <div className="flex justify-between items-center">
                           <span className="text-slate-400">Descuento Total (%):</span>
                           <input type="number" value={totalDiscount} onChange={e => setTotalDiscount(parseFloat(e.target.value) || 0)} className="w-16 bg-slate-700 text-center rounded" />
                       </div>
                       <div className="flex justify-between"><span className="text-slate-400">Descuento Aplicado:</span> <span className="text-red-400">-${(calculations.itemDiscounts + calculations.totalDiscountAmount).toFixed(2)}</span></div>
                       <div className="flex justify-between"><span className="text-slate-400">IVA (15%):</span> <span className="text-white">${calculations.taxAmount.toFixed(2)}</span></div>
                       <div className="flex justify-between text-2xl font-bold mt-2"><span className="text-white">TOTAL:</span> <span className="text-green-400">${calculations.grandTotal.toFixed(2)}</span></div>
                    </div>

                    <Button variant="success" className="w-full !py-3 !text-lg mt-4" disabled={cart.length === 0} onClick={() => setIsPaymentModalOpen(true)}>
                        Cobrar
                    </Button>

                </Card>
            </div>
            
            <Modal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} title="Seleccionar Cliente">
              {/* Client selection/creation logic here */}
              <p>Funcionalidad para seleccionar o crear cliente.</p>
            </Modal>
             <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Procesar Pago">
              <PaymentModalContent />
            </Modal>
        </div>
    );
};

export default PointOfSale;
