"use client";

import React, { useState, useEffect } from "react";

interface User {
  email: string;
  password: string;
  history: { name: string; price: number; quantity: number }[];
}

export default function AuthModule() {
  const [mode, setMode] = useState<"choose" | "login" | "register" | "profile">("choose");
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    const savedCurrent = localStorage.getItem("currentUser");
    if (savedCurrent) {
      setCurrentUser(JSON.parse(savedCurrent));
      setMode("profile");
    }
  }, []);

  const saveUsers = (newUsers: User[]) => {
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  const saveCurrentUser = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.find((u) => u.email === email)) {
      setError("User with this email already exists");
      return;
    }
    const newUser: User = { email, password, history: [] };
    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    saveCurrentUser(newUser);
    setMode("profile");
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError("Invalid email or password");
      return;
    }
    saveCurrentUser(user);
    setMode("profile");
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setMode("choose");
    setEmail("");
    setPassword("");
    setError("");
  };

  const addPurchase = (item: { name: string; price: number; quantity: number }) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, history: [...currentUser.history, item] };
    setCurrentUser(updatedUser);
    const updatedUsers = users.map((u) => (u.email === updatedUser.email ? updatedUser : u));
    saveUsers(updatedUsers);
    saveCurrentUser(updatedUser);
  };

  const clearHistory = () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, history: [] };
    setCurrentUser(updatedUser);
    const updatedUsers = users.map((u) => (u.email === updatedUser.email ? updatedUser : u));
    saveUsers(updatedUsers);
    saveCurrentUser(updatedUser);
  };

  if (mode === "choose") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#ffe6ea]">
        <h1 className="text-8xl font-black text-pink-700 xl:text-9xl ">Welcome!</h1>
        <div className="flex gap-4">
          <button
            className=" w-50 h-15 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition"
            onClick={() => setMode("login")}
          >
            Sign In
          </button>
          <button
            className="w-50 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition"
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  if (mode === "register") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
        <h1 className="text-8xl font-bold mb-6">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-3 bg-white w-150 h-100 p-6 rounded-xl shadow-md">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border focus:border-2 px-2 py-1 rounded w-50 justify-center relative left-45 h-10 top-20" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border  focus:border-2 px-2 py-1 rounded w-50  relative left-45 h-10 top-15" required />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="bg-pink-400 text-white px-4 py-2 rounded-xl hover:bg-pink-500 transition h-15 w-50  relative left-45  top-15">Register</button>
        </form>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
        <h1 className="text-8xl font-bold mb-6">Sign In</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3 bg-white w-150 h-100 rounded-xl shadow-md">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1 rounded focus:border-2 relative w-50 h-10 left-45 top-20" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 rounded focus:border-2 relative w-50 h-10 left-45 top-20" required />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="bg-pink-400 text-white px-4 py-2 rounded-xl hover:bg-pink-500 transition focus:border-2 relative w-50 h-15 left-45 top-20">Sign In</button>
        </form>
      </div>
    );
  }

  if (mode === "profile" && currentUser) {
    return (
      <div className="p-6 bg-pink-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Hello, {currentUser.email}</h1>
          <button className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 transition" onClick={handleLogout}>Logout</button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Demo Shop</h2>
        <div className="flex gap-4 mb-4">
          <button
            className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
            onClick={() => addPurchase({ name: "Chocolate Ice Cream", price: 3.5, quantity: 1 })}
          >
            Buy Chocolate Ice Cream
          </button>
          <button
            className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
            onClick={() => addPurchase({ name: "Vanilla Cake", price: 15, quantity: 1 })}
          >
            Buy Vanilla Cake
          </button>
        </div>

        <div className="flex justify-between items-center mt-4 mb-2">
          <h2 className="text-2xl font-semibold">Purchase History</h2>
          <button className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition text-sm" onClick={clearHistory}>
            Clear History
          </button>
        </div>

        {currentUser.history.length === 0 ? <p>No purchases yet</p> : (
          <ul className="space-y-2">
            {currentUser.history.map((item, idx) => (
              <li key={idx} className="border p-2 rounded bg-white shadow-sm">{item.name} — ${item.price} x {item.quantity}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return null;
}
