"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  LOAD_CART,
  REDUCE_STOCK,
  TOGGLE_CART_VISIBILITY,
} from "./Redux/ActionType";

export default function Basked() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products || []);
  const cart = useSelector((state: any) => state.cart || []);
  const isVisible = useSelector((state: any) => state.isCartVisible);

  const [mounted, setMounted] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Drag & resize
  const basketRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 300, height: 350 });

  // тільки клієнт
  useEffect(() => setMounted(true), []);

  // Завантаження кошика з localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) dispatch({ type: LOAD_CART, payload: JSON.parse(saved) });
    }
  }, [dispatch]);

  // Збереження кошика у localStorage
  useEffect(() => {
    if (mounted) localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length > 0) setPurchased(false);
  }, [cart, mounted]);

  const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  // Drag & resize handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    document.body.style.userSelect = "none";
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
    offset.current = { x: e.clientX, y: e.clientY };
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - size.height;
      setPosition({
        x: Math.min(Math.max(0, e.clientX - offset.current.x), maxX),
        y: Math.min(Math.max(0, e.clientY - offset.current.y), maxY),
      });
    }
    if (isResizing.current) {
      const maxW = window.innerWidth - position.x;
      const maxH = window.innerHeight - position.y;
      setSize({
        width: Math.min(Math.max(200, size.width + (e.clientX - offset.current.x)), maxW),
        height: Math.min(Math.max(200, size.height + (e.clientY - offset.current.y)), maxH),
      });
      offset.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    document.body.style.userSelect = "auto";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const handleClose = () =>
    dispatch({ type: TOGGLE_CART_VISIBILITY, payload: false });
  const handleShow = () =>
    dispatch({ type: TOGGLE_CART_VISIBILITY, payload: true });

  const handleBuy = () => {
    let canBuy = true;
    cart.forEach((item: any) => {
      const product = products.find((p: any) => p.id === item.id);
      if (!product || product.stock < item.quantity) canBuy = false;
    });

    if (!canBuy) {
      setErrorMsg("Some items are out of stock or quantity exceeded.");
      return;
    }

    cart.forEach((item: any) => {
      dispatch({ type: REDUCE_STOCK, payload: { id: item.id, quantity: item.quantity } });
      dispatch({ type: REMOVE_FROM_CART, payload: item.id });
    });
    setPurchased(true);
    setErrorMsg("");
  };

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={basketRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: position.y,
              left: position.x,
              width: size.width,
              height: size.height,
              backgroundColor: "#ff758f",
              color: "#fff",
              borderRadius: 12,
              padding: 12,
              boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div
              className="cursor-move flex justify-between items-center"
              onMouseDown={handleMouseDown}
              style={{ fontWeight: 600, fontSize: 16 }}
            >
              <span>{purchased ? "Purchased!" : `Cart (${totalItems})`}</span>
              <button onClick={handleClose} className="text-black font-bold px-2">×</button>
            </div>

            {errorMsg && (
              <div style={{ color: "#ffeb3b", margin: "5px 0", fontSize: 14 }}>
                {errorMsg}
              </div>
            )}

            <div className="flex-1 mt-2 overflow-auto">
              {purchased ? (
                <div style={{ textAlign: "center", marginTop: 50, fontSize: 18, fontWeight: 600 }}>
                  All purchased — demo project
                </div>
              ) : (
                cart.map((item: any) => {
                  const product = products.find((p: any) => p.id === item.id);
                  const outOfStock = !product || product.stock === 0;
                  return (
                    <div key={item.id} className="flex justify-between items-center mb-2">
                      <span>{item.name} {outOfStock && "(Out of stock)"}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: item.id })}
                          disabled={outOfStock}
                          className="px-2 py-1 bg-red-400 rounded hover:bg-red-500 text-white disabled:opacity-50"
                        >-</button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => !outOfStock && dispatch({ type: ADD_TO_CART, payload: item })}
                          disabled={outOfStock}
                          className="px-2 py-1 bg-green-400 rounded hover:bg-green-500 text-white disabled:opacity-50"
                        >+</button>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })
              )}
            </div>

            {!purchased && (
              <>
                <div className="font-bold mt-auto">Total: ${totalPrice.toFixed(2)}</div>
                <button
                  className="mt-2 px-4 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-black w-full"
                  onClick={handleBuy}
                >
                  Buy
                </button>
              </>
            )}

            <div
              onMouseDown={handleResizeMouseDown}
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#fff",
                position: "absolute",
                right: 0,
                bottom: 0,
                cursor: "se-resize",
                borderBottomRightRadius: 8,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* кнопка відкриття кошика */}
      {mounted && !isVisible && (cart.length > 0 || purchased) && (
        <motion.button
          onClick={handleShow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            padding: "10px 15px",
            backgroundColor: "#ff6b81",
            color: "white",
            borderRadius: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          Open Cart ({totalItems})
        </motion.button>
      )}
    </>
  );
}
