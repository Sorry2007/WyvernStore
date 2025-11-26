// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!product) return <p className="p-6">Producto no encontrado</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 bg-gray-100 rounded overflow-hidden">
          {product.image ? <img src={product.image} alt={product.title} className="w-full object-cover" /> : <div className="p-12 text-gray-400">Sin imagen</div>}
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">Autor: {product.author}</p>
          <p className="text-gray-600">Género: {product.genre}</p>
          <p className="mt-4 text-xl font-semibold">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
