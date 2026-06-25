import { useEffect, useState } from "react";
import type { Product } from "my-types";
import { getAllProducts } from "../api/productapi";

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Productos</h1>
        <p className="mt-4">Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Productos</h1>
        <p className="mt-4 text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{product.title}</h2>

              <p className="mt-2 text-gray-600">{product.description}</p>

              <p className="mt-3">
                <span className="font-semibold">Precio:</span> ${product.price}
              </p>

              <p>
                <span className="font-semibold">Descuento:</span>{" "}
                {product.discountPercentage}%
              </p>

              <p>
                <span className="font-semibold">Rating:</span> {product.rating}
              </p>

              <p>
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Categoría: {product.category?.name ?? "Sin categoría"}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default ProductPage;