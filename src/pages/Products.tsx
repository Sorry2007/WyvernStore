// src/pages/Products.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const items: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(items);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Catálogo de productos</h2>

      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <li key={p.id} className="p-4 rounded-lg shadow bg-white">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{p.title}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="font-semibold mt-2">${p.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
