import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, Package, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const mockCartItems = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 8.99,
    quantity: 2,
    image: "💊"
  },
  {
    id: 2,
    name: "Vitamin D3 1000 IU",
    price: 12.50,
    quantity: 1,
    image: "💊"
  },
  {
    id: 3,
    name: "Diabetes Care Pack",
    price: 89.99,
    quantity: 1,
    image: "📦"
  },
];

const mockOrders = [
  {
    id: "ORD-2026-001",
    date: "March 15, 2026",
    status: "Delivered",
    total: 67.48,
    items: 3,
  },
  {
    id: "ORD-2026-002",
    date: "March 10, 2026",
    status: "In Transit",
    total: 89.99,
    items: 1,
  },
  {
    id: "ORD-2026-003",
    date: "March 5, 2026",
    status: "Delivered",
    total: 145.50,
    items: 5,
  },
  {
    id: "ORD-2026-004",
    date: "February 28, 2026",
    status: "Delivered",
    total: 54.99,
    items: 2,
  },
];

export function OrdersPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>Orders & Cart</h1>
        <p className="text-xl text-gray-600">Manage your shopping cart and order history</p>
      </div>

      <Tabs defaultValue="cart" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-12 p-1 rounded-xl" style={{ backgroundColor: '#B7D1CC' }}>
          <TabsTrigger 
            value="cart" 
            className="rounded-lg data-[state=active]:bg-[#0F766E] data-[state=active]:text-white"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shopping Cart ({cartItems.length})
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="rounded-lg data-[state=active]:bg-[#0F766E] data-[state=active]:text-white"
          >
            <Package className="w-5 h-5 mr-2" />
            Order History
          </TabsTrigger>
        </TabsList>

        {/* Shopping Cart */}
        <TabsContent value="cart" className="space-y-6">
          {cartItems.length === 0 ? (
            <Card className="p-12 text-center rounded-2xl">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl mb-2 text-gray-600">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some items to get started</p>
              <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg">
                Browse Medicines
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6 rounded-2xl">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl" style={{ backgroundColor: '#B7D1CC' }}>
                        {item.image}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl" style={{ color: '#0F766E' }}>{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg border-2"
                              style={{ borderColor: '#0F766E', color: '#0F766E' }}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-lg w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-lg border-2"
                              style={{ borderColor: '#0F766E', color: '#0F766E' }}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-2xl" style={{ color: '#0F766E' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 rounded-2xl sticky top-24">
                  <h3 className="text-2xl mb-6" style={{ color: '#0F766E' }}>Order Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: '#B7D1CC', color: '#0F766E' }}>
                        🎉 Free shipping on orders over $50
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between text-xl">
                      <span style={{ color: '#0F766E' }}>Total</span>
                      <span style={{ color: '#0F766E' }}>${total.toFixed(2)}</span>
                    </div>
                    <Button 
                      className="w-full h-12 text-lg bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg mt-6"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-2 rounded-lg"
                      style={{ borderColor: '#0F766E', color: '#0F766E' }}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Order History */}
        <TabsContent value="history" className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl" style={{ color: '#0F766E' }}>{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : order.status === "In Transit"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status === "Delivered" && <CheckCircle className="w-4 h-4 inline mr-1" />}
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Ordered on {order.date} • {order.items} item{order.items !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl" style={{ color: '#0F766E' }}>${order.total.toFixed(2)}</span>
                  <Button 
                    variant="outline"
                    className="border-2 rounded-lg"
                    style={{ borderColor: '#0F766E', color: '#0F766E' }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
