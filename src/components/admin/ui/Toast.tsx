export type ToastData = { kind: "success" | "error"; message: string } | null;

export function Toast({ toast }: { toast: ToastData }) {
  if (!toast) return null;
  return (
    <div
      role="status"
      className={`fixed right-5 bottom-5 z-50 max-w-md rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-2xl ${
        toast.kind === "success" ? "bg-whatsapp-dark" : "bg-red-600"
      }`}
    >
      {toast.message}
    </div>
  );
}