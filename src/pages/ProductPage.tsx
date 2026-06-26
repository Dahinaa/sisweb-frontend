import { useEffect, useMemo, useState } from "react";
import type { Category, Product } from "my-types";
import { deleteProduct, getAllProducts } from "../api/productapi";
import { getAllCategories } from "../api/categoryapi";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getAllProducts();
        const categoriesData = await getAllCategories();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos o categorías.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch);

      const matchesCategory =
        selectedCategoryId === "all" ||
        product.categoryId === Number(selectedCategoryId);

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategoryId]);

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) {
      return;
    }

    setSelectedProduct(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteProduct(selectedProduct.id);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== selectedProduct.id)
      );

      setSelectedProduct(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el producto.");
    } finally {
      setIsDeleting(false);
    }
  };

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

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
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

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Filtrar por categoría
          </label>

          <select
            id="category"
            value={selectedCategoryId}
            onChange={(event) => setSelectedCategoryId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">Todas las categorías</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <p className="mb-4 text-sm text-gray-500">
        Mostrando {filteredProducts.length} producto(s)
      </p>

      {filteredProducts.length === 0 ? (
        <p>No hay productos que coincidan con los filtros.</p>
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

              <button
                type="button"
                onClick={() => openDeleteModal(product)}
                className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </article>
          ))}
        </section>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        productName={selectedProduct?.title ?? ""}
        isDeleting={isDeleting}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}

export default ProductPage;