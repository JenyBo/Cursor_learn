interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function Notification({ message, type = 'success', onClose }: NotificationProps) {
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
      <span>{type === 'success' ? '✓' : '✕'}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">×</button>
    </div>
  );
} 