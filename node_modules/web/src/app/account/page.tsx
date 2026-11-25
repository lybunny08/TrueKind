"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Order {
  id: string;
  orderNumber: string;
  total: string | number;
  status: string;
  createdAt: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
      return;
    }
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    // Fetch orders
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-playfair text-3xl md:text-4xl font-light mb-2">
          My Account
        </h1>
        <p className="text-sm text-black/60 mb-12">Welcome back, {user.name}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {["Dashboard", "Orders", "Addresses", "Profile"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-black/5 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  router.push("/");
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-black/5 transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>

          <div className="lg:col-span-2">
            <div className="border border-black/10 p-6 mb-8">
              <h2 className="font-playfair text-xl font-light mb-4">
                Account Details
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex gap-4">
                  <dt className="text-black/60 w-24">Name</dt>
                  <dd>{user.name}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-black/60 w-24">Email</dt>
                  <dd>{user.email}</dd>
                </div>
              </dl>
            </div>

            <div className="border border-black/10 p-6">
              <h2 className="font-playfair text-xl font-light mb-4">
                Recent Orders
              </h2>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-black/60 mb-4">No orders yet.</p>
                  <Link href="/products" className="text-sm hover:underline">
                    Start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center border-b border-black/10 pb-4"
                    >
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-xs text-black/60">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{Number(order.total).toFixed(0)}</p>
                        <p className="text-xs text-black/60">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}