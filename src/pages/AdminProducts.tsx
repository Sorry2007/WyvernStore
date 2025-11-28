// src/pages/AdminProducts.tsx
import React, { useEffect, useState } from "react";

// 🔹 Importamos SOLO las funciones de productService
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

// 🔹 Importamos el tipo Product usando `import type`
import type { Product } from "../services/productService";

import ProductCardAdmin from "../components/ProductCardAdmin";

const AdminProducts: React.FC = () => {
  // Lista de productos
  const [products, setProducts] = useState<Product[]>([]);

  // Producto que estamos editando (null si no se está editando)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Formulario controlado usando un objeto Product
  const [formData, setFormData] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    image: "",
  });

  // 🔹 Se ejecuta cuando se carga la página
  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Cargar los productos desde Firestore
  const loadData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // 🔵 Guardar nuevo producto o aplicar edición
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Si existe editingProduct → es una edición
      await updateProduct(editingProduct.id!, formData);
      setEditingProduct(null);
    } else {
      // Si no existe → es creación
      await createProduct(formData);
    }

    // Reiniciar formulario
    setFormData({ title: "", description: "", price: 0, image: "" });

    // Volver a cargar la data
    loadData();
  };

  // 🔴 Eliminar un producto
  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    await deleteProduct(id);
    loadData();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Administrar Productos</h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 max-w-xl"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? "Editar Producto" : "Crear Producto"}
        </h2>

        {/* Campo título */}
        <input
          type="text"
          placeholder="Título"
          className="input"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        {/* Campo descripción */}
        <textarea
          placeholder="Descripción"
          className="input"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* Campo precio */}
        <input
          type="number"
          placeholder="Precio"
          className="input"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />

        {/* Campo URL imagen */}
        <input
          type="text"
          placeholder="URL de imagen"
          className="input"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />

        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
          {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
        </button>
      </form>

      {/* LISTA DE PRODUCTOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCardAdmin
            key={p.id}
            product={p}
            onEdit={() => {
              setEditingProduct(p);
              setFormData(p); // Carga los valores en el formulario
            }}
            onDelete={() => handleDelete(p.id!)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
