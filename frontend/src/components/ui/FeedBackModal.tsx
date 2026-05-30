import type { FeedbackModalProps } from "../../types/components/FeedbackModal";

export function FeedbackModal({
  isOpen,
  title,
  message,
  buttonText = "Continuar",
  onClose,
}: FeedbackModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{title}</h2>

          <p className="text-gray-600">{message}</p>

          <button
            onClick={onClose}
            className="bg-blue-600 text-white rounded-md px-4 py-2 font-bold cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
