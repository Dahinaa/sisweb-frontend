import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  PencilIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { Product } from "my-types";

interface Props {
  product: Product | null;
  onClose: () => void;
  onEdit: () => void;
}

interface FieldProps {
  label: string;
  value: string;
}

const Field: React.FC<FieldProps> = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
      {label}
    </p>
    <p className="mt-1 text-sm text-gray-900">{value}</p>
  </div>
);

const ProductDetailModal: React.FC<Props> = ({
  product,
  onClose,
  onEdit,
}) => {
  return (
    <Dialog open={product !== null} onClose={onClose} className="relative z-50">
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Panel centrado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <DialogTitle className="text-sm font-semibold text-gray-900">
              Product detail
            </DialogTitle>

            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <PhotoIcon className="h-8 w-8 text-gray-400" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {product?.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {product?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <Field
                label="Category"
                value={product?.category?.name ?? "No category"}
              />

              <Field
                label="Price"
                value={`$${product?.price?.toFixed(2) ?? "0.00"}`}
              />

              <Field
                label="Discount"
                value={`${product?.discountPercentage?.toFixed(1) ?? "0.0"}%`}
              />

              <Field label="Rating" value={String(product?.rating ?? "")} />

              <Field label="Stock" value={String(product?.stock ?? "")} />

              <Field label="ID" value={String(product?.id ?? "")} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Close
            </button>

            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProductDetailModal;