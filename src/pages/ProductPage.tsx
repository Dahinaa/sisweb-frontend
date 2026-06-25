import { useEffect, useMemo, useState } from "react";
import type { Product } from "my-types";
import { getAllProducts } from "../api/productapi";

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();

      return (
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch)
      );
    });
  }, [products, searchTerm]);

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
      <h1 className="mb-6 text-3xl font-bold">Productos</h1>

      <div className="mb-6">
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Buscar producto
        </label>

        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar por título o descripción..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>No hay productos que coincidan con la búsqueda.</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
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