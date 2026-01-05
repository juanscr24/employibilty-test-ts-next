interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center min-h-100 p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ¡Ups! Algo salió mal
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary">
            Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-100 p-4">
      <div className="text-center max-w-md">
        {icon ? (
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">{icon}</div>
        ) : (
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-600 mb-6">{description}</p>}
        {action && (
          <button onClick={action.onClick} className="btn btn-primary">
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};
