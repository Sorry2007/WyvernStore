// src/components/ProductCardAdmin.tsx
import React from "react";
import type { Product } from "../services/productService";


interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

/*
  🔶 Componente de tarjeta para el área de administración
  Muestra cada producto con dos botones:
  - Editar → carga el formulario con los datos
  - Eliminar → borra el producto de Firestore
*/
const ProductCardAdmin: React.FC<Props> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition">
      {/* Imagen del producto */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />

      {/* Información */}
      <h3 className="text-lg font-bold mt-3">{product.title}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-semibold text-green-700 mt-2">${product.price}</p>

      {/* Botones */}
      <div className="flex gap-2 mt-4">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() => onEdit(product)}
        >
          Editar
        </button>

        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={() => onDelete(product.id!)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
