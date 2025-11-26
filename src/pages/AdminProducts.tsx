// src/pages/AdminProducts.tsx
import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/productService";

const emptyProduct = { title: "", author: "", genre: "", price: 0, image: "", description: "", stock: 0 };

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(emptyProduct);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const p = await getProducts();
    setProducts(p);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateProduct(editing.id, form);
    } else {
      await addProduct(form);
    }
    setForm(emptyProduct);
    setEditing(null);
    await load();
  };

  const handleEdit = (p: any) => {
    setEditing(p);
    setForm({ ...p });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminar producto?")) return;
    await deleteProduct(id);
    await load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin - Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSave} className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold">{editing ? "Editar producto" : "Crear producto"}</h2>
            <input className="w-full p-2 border" placeholder="Título" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
            <input className="w-full p-2 border" placeholder="Autor" value={form.author} onChange={(e)=>setForm({...form,author:e.target.value})} />
            <input className="w-full p-2 border" placeholder="Género" value={form.genre} onChange={(e)=>setForm({...form,genre:e.target.value})} />
            <input className="w-full p-2 border" placeholder="Precio" type="number" value={form.price} onChange={(e)=>setForm({...form,price: Number(e.target.value)})} />
            <input className="w-full p-2 border" placeholder="URL imagen" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} />
            <textarea className="w-full p-2 border" placeholder="Descripción" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded">{editing ? "Actualizar" : "Crear"}</button>
              <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={()=>{ setForm(emptyProduct); setEditing(null); }}>Limpiar</button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="font-semibold mb-3">Productos existentes</h2>
          {loading ? <p>Cargando...</p> : (
            <div className="space-y-3">
              {products.map(p => (
                <div key={p.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-gray-500">{p.author}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-yellow-400 px-3 py-1 rounded" onClick={()=>handleEdit(p)}>Editar</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={()=>handleDelete(p.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
