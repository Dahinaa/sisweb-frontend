import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  PlusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import type { Category, Product, NewProductInput } from "my-types";
import { getAllCategories } from "../api/categoryapi";
import { createProduct, updateProduct } from "../api/productapi";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "block text-xs font-medium text-gray-600 mb-1";

const emptyForm: NewProductInput = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  categoryId: 0,
};

const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const isEditing = id !== undefined;

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<NewProductInput>(emptyForm);

  useEffect(() => {
    getAllCategories().then(setCategories);

    if (isEditing && location.state?.product) {
      const product = location.state.product as Product;

      setForm({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        categoryId: product.categoryId,
      });
    }
  }, []);

  const handleChange = (
    field: keyof NewProductInput,
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isEditing) {
      updateProduct(Number(id), form).then(() => navigate("/products"));
    } else {
      createProduct(form).then(() => navigate("/products"));
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="text-blue-700 hover:text-blue-900"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>

            {isEditing ? (
              <PencilSquareIcon className="h-4 w-4 text-blue-700" />
            ) : (
              <PlusIcon className="h-4 w-4 text-blue-700" />
            )}

            <p className="text-sm font-semibold text-blue-900">
              {isEditing ? "Edit Product" : "New Product"}
            </p>
          </div>

          {/* Body */}
          <div className="px-4 py-5 space-y-5">
            <div>
              <label className={labelClass}>Title</label>

              <input
                className={inputClass}
                type="text"
                value={form.title}
                onChange={(event) => handleChange("title", event.target.value)}
                placeholder="Product title"
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>

              <textarea
                className={inputClass}
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                placeholder="Product description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className={labelClass}>Price</label>

                <input
                  className={inputClass}
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(event) =>
                    handleChange("price", Number(event.target.value))
                  }
                />
              </div>

              <div>
                <label className={labelClass}>Stock</label>

                <input
                  className={inputClass}
                  type="number"
                  value={form.stock}
                  onChange={(event) =>
                    handleChange("stock", Number(event.target.value))
                  }
                />
              </div>

              <div>
                <label className={labelClass}>Discount %</label>

                <input
                  className={inputClass}
                  type="number"
                  step="0.1"
                  value={form.discountPercentage}
                  onChange={(event) =>
                    handleChange(
                      "discountPercentage",
                      Number(event.target.value)
                    )
                  }
                />
              </div>

              <div>
                <label className={labelClass}>Rating</label>

                <input
                  className={inputClass}
                  type="number"
                  step="0.1"
                  value={form.rating}
                  onChange={(event) =>
                    handleChange("rating", Number(event.target.value))
                  }
                />
              </div>

              <div className="col-span-2">
                <label className={labelClass}>Category</label>

                <select
                  className={inputClass}
                  value={form.categoryId || ""}
                  onChange={(event) =>
                    handleChange(
                      "categoryId",
                      parseInt(event.target.value) || 0
                    )
                  }
                >
                  <option value="">Select a category</option>

                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              {isEditing ? (
                <>
                  <PencilSquareIcon className="h-4 w-4" />
                  Update Product
                </>
              ) : (
                <>
                  <PlusIcon className="h-4 w-4" />
                  Save Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;