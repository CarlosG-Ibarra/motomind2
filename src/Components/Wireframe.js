import React from "react";
import { Link } from "react-router-dom";

const Wireframe = () => {
  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-2xl shadow-md">
        <h1 className="text-xl font-bold">MotoMind</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/about" className="hover:underline">Nosotros</Link>
          <Link to="/contact" className="hover:underline">Contacto</Link>
          <Link to="/customizer" className="hover:underline">Diseñador</Link>
          <Link to="/cart" className="hover:underline">Carrito</Link>
        </nav>
        <div className="space-x-2">
          <Link to="/login?action=register" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Regístrate</Link>
          <Link to="/login?action=login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">Iniciar sesión</Link>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-gray-100 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Diseñador de Casco</h2>
          <p className="text-sm">Personaliza color, tamaño y características del casco.</p>
          <Link to="/customizer" className="mt-2 inline-block text-blue-600 hover:underline">Ir al diseñador</Link>
        </section>

        <section className="bg-gray-100 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Productos</h2>
          <ul className="list-disc list-inside text-sm">
            <li>MotoMind L1</li>
            <li>MotoMind L2</li>
          </ul>
        </section>

        <section className="bg-gray-100 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Carrito</h2>
          <p className="text-sm">Revisa y edita los productos antes del pago.</p>
          <Link to="/cart" className="mt-2 inline-block text-blue-600 hover:underline">Ir al carrito</Link>
        </section>

        <section className="bg-gray-100 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">Checkout</h2>
          <p className="text-sm">Completa tu pedido y proporciona la información necesaria.</p>
          <Link to="/checkout" className="mt-2 inline-block text-blue-600 hover:underline">Ir al checkout</Link>
        </section>
      </main>

      <footer className="text-center text-gray-500 text-sm mt-10">
        © 2025 MotoMind. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Wireframe;
