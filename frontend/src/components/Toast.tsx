interface Props {
  notifications: string[];
  onDismiss: (message: string) => void;
}

export default function Toast({ notifications, onDismiss }: Props) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {notifications.map((msg) => (
        <div
          key={msg}
          className="bg-[#1a1a1a] border border-[#00c896] text-white text-sm px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 max-w-sm"
        >
          <span>{msg}</span>
          <button
            onClick={() => onDismiss(msg)}
            className="text-gray-400 hover:text-white text-xs shrink-0"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
