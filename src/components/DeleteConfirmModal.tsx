import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  productName: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirmModal({
  isOpen,
  productName,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Confirmar eliminación
          </DialogTitle>

          <p className="mt-3 text-sm text-gray-600">
            ¿Seguro que quieres eliminar el producto{" "}
            <span className="font-semibold text-gray-900">{productName}</span>?
          </p>

          <p className="mt-2 text-sm text-red-600">
            Esta acción no se puede deshacer.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default DeleteConfirmModal;