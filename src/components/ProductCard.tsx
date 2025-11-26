// src/components/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  product: any;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="h-48 w-full mb-3 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.title} className="object-cover h-full w-full" />
        ) : (
          <span className="text-gray-400">Sin imagen</span>
        )}
      </div>
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-sm text-gray-500">{product.author}</p>
      <p className="mt-2 font-bold">${product.price?.toFixed?.(2) ?? product.price}</p>
      <Link to={`/products/${product.id}`} className="mt-3 inline-block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Ver detalle
      </Link>
    </div>
  );
};

export default ProductCard;
