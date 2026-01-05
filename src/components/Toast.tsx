/**
 * Toast Notification Component
 * 
 * A flexible toast notification system with multiple types and auto-dismiss functionality.
 * Uses Lucide React icons for a modern look.
 * 
 * Features:
 * - 4 toast types: success, error, warning, info
 * - Auto-dismiss after 3 seconds (configurable in useToast hook)
 * - Smooth animations with slide-up effect
 * - Fixed position at top-right of screen
 * - Multiple toasts can be displayed simultaneously
 * - Accessible with ARIA attributes
 * 
 * @example
 * ```tsx
 * import { Toast Container } from '@/components';
 * import { useToast } from '@/hooks';
 * 
 * function MyComponent() {
 *   const { toasts, hideToast } = useToast();
 *   
 *   return <ToastContainer toasts={toasts} onClose={hideToast} />;
 * }
 * ```
 */

import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

// Type definition for the 4 available toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Interface for a single toast object
 */
interface Toast {
  id: string;        // Unique identifier for the toast
  message: string;   // Message to display
  type: ToastType;   // Type determines styling and icon
}

/**
 * Props for the ToastContainer component
 */
interface ToastContainerProps {
  toasts: Toast[];                  // Array of toasts to display
  onClose: (id: string) => void;    // Callback when toast is closed
}

/**
 * ToastContainer Component
 * 
 * Container that renders all active toasts in a fixed position
 * 
 * @param {ToastContainerProps} props - Component props
 */
export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    // Fixed container at top-right with z-50 to appear above everything
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

/**
 * Props for individual ToastItem component
 */
interface ToastItemProps {
  toast: Toast;                     // Toast data to display
  onClose: (id: string) => void;    // Callback when this toast is closed
}

/**
 * ToastItem Component
 * 
 * Individual toast notification with icon, message, and close button
 * 
 * @param {ToastItemProps} props - Component props
 */
const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const { id, message, type } = toast;

  /**
   * Styling configuration for each toast type
   * Defines background, border, and text colors
   */
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',  // Green for success
    error: 'bg-red-50 border-red-200 text-red-800',          // Red for errors
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800', // Yellow for warnings
    info: 'bg-blue-50 border-blue-200 text-blue-800',        // Blue for info
  };

  /**
   * Icon mapping for each toast type
   * Uses Lucide React icons for consistency
   */
  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5" />,   // Checkmark for success
    error: <XCircle className="w-5 h-5" />,          // X circle for errors
    warning: <AlertTriangle className="w-5 h-5" />,  // Triangle for warnings
    info: <Info className="w-5 h-5" />,              // i icon for info
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-up ${typeStyles[type]}`}
      role="alert"  // ARIA role for screen readers
    >
      {/* Icon container */}
      <div className="shrink-0">{iconMap[type]}</div>
      
      {/* Message text */}
      <p className="flex-1 text-sm font-medium">{message}</p>
      
      {/* Close button */}
      <button
        onClick={() => onClose(id)}
        className="shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"  // Accessibility label
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
