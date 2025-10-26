import { useEffect, useState, useCallback } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Custom hook for managing notifications
  const addNotification = useCallback(
    (notification) => {
      const id = Date.now();
      setNotifications((prev) => [
        {
          id,
          ...notification,
          createdAt: Date.now(),
        },
        ...prev,
      ]);

      if (notification.autoDismiss) {
        setTimeout(() => {
          removeNotification(id);
        }, notification.timeout || 5000);
      }

      return id;
    },
    [removeNotification]
  );

  // Notification event handlers
  useEffect(() => {
    const handleErrorNotification = (event) => {
      const { detail } = event;
      addNotification({
        title: detail?.title || "Error",
        message: detail?.message || "An unknown error occurred",
        autoDismiss:
          detail?.autoDismiss !== undefined ? detail.autoDismiss : true,
        timeout: detail?.timeout || 5000,
        type: detail?.type || "error",
      });
    };

    window.addEventListener("show-error-notification", handleErrorNotification);

    return () => {
      window.removeEventListener(
        "show-error-notification",
        handleErrorNotification
      );
    };
  }, [addNotification]);

  // Notification render helper
  const renderNotification = (notification) => {
    const { id, title, message, type } = notification;

    const typeStyles = {
      error: "bg-red-50 border-l-4 border-red-500",
      success: "bg-green-50 border-l-4 border-green-500",
      info: "bg-blue-50 border-l-4 border-blue-500",
      warning: "bg-yellow-50 border-l-4 border-yellow-500",
    };

    const iconColors = {
      error: "text-red-500",
      success: "text-green-500",
      info: "text-blue-500",
      warning: "text-yellow-500",
    };

    return (
      <div
        key={id}
        className={`bg-white rounded shadow-lg p-4 mb-2 transition-all duration-300 ease-in-out transform translate-x-0 ${
          typeStyles[type] || typeStyles.error
        }`}
        role="alert"
      >
        <div className="flex items-center">
          <div className="py-1">
            {type === "error" && (
              <svg
                className={`fill-current ${iconColors[type]} w-6 h-6 mr-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "success" && (
              <svg
                className={`fill-current ${iconColors[type]} w-6 h-6 mr-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "info" && (
              <svg
                className={`fill-current ${iconColors[type]} w-6 h-6 mr-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01v3.99H9a1 1 0 000 2h2a1 1 0 000-2h-.01V11H11a1 1 0 000-2H9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "warning" && (
              <svg
                className={`fill-current ${iconColors[type]} w-6 h-6 mr-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm">{message}</p>
          </div>
          <button
            className={`${iconColors[type]} ml-auto`}
            onClick={() => removeNotification(id)}
            aria-label="Close notification"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-h-screen overflow-y-auto">
      {notifications.map((notification) => renderNotification(notification))}
    </div>
  );
};

export default Notification;
