import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  pharmacyId: string;
  stockQuantity: number;
  requiresPrescription: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        if (existing.quantity >= item.stockQuantity) {
          toast.error("Not enough stock available");
          return prev;
        }
        toast.success(`Increased ${item.name} quantity`);
        return prev.map((i) => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`Added ${item.name} to cart`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => prev.map((i) => {
      if (i._id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        if (delta > 0 && newQty > i.stockQuantity) {
          toast.error("Not enough stock available");
          return i;
        }
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
