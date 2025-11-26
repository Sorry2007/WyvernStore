// src/services/productService.ts
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Estructura de producto esperada:
 * {
 *  title: string,
 *  author: string,
 *  genre: string,
 *  price: number,
 *  image?: string,
 *  description?: string,
 *  stock?: number
 * }
 */

const productsCol = collection(db, "products");

// Obtener todos los productos (limit opcional)
export async function getProducts(limitNumber?: number) {
  try {
    const q = limitNumber ? query(productsCol, orderBy("title"), limit(limitNumber)) : query(productsCol, orderBy("title"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    throw err;
  }
}

// Buscar productos por texto en title, author o genre (búsqueda simple)
export async function searchProducts(term: string) {
  try {
    const t = term.trim();
    if (!t) return [];
    // Firestore no tiene full-text search nativo; hacemos búsquedas por igualdad parcial en campos clave.
    // Aquí implementamos búsqueda simple por título exacto/autor o género. Para búsqueda avanzada usar Algolia o Elastic.
    const qTitle = query(productsCol, where("title", "==", t));
    const qAuthor = query(productsCol, where("author", "==", t));
    const qGenre = query(productsCol, where("genre", "==", t));

    const [s1, s2, s3] = await Promise.all([getDocs(qTitle), getDocs(qAuthor), getDocs(qGenre)]);
    const res = [...s1.docs, ...s2.docs, ...s3.docs];
    // eliminar duplicados por id
    const uniq = new Map();
    res.forEach(d => uniq.set(d.id, { id: d.id, ...d.data() }));
    return Array.from(uniq.values());
  } catch (err) {
    throw err;
  }
}

// Obtener producto por id
export async function getProductById(id: string) {
  try {
    const ref = doc(db, "products", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    throw err;
  }
}

// CRUD admin: add, update, delete
export async function addProduct(data: Record<string, any>) {
  const ref = await addDoc(productsCol, data);
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Record<string, any>>) {
  const ref = doc(db, "products", id);
  await updateDoc(ref, data);
}

export async function deleteProduct(id: string) {
  const ref = doc(db, "products", id);
  await deleteDoc(ref);
}
