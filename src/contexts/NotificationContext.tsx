"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface NotificationState {
  isVisible: boolean;
  type: "success" | "error";
  message: string;
  duration?: number;
  requireUserInteraction?: boolean;
}

interface NotificationContextType {
  notification: NotificationState;
  showNotification: (
    type: "success" | "error",
    message: string,
    duration?: number,
    requireUserInteraction?: boolean
  ) => void;
  hideNotification: () => void;
  showSuccess: (
    message: string,
    duration?: number,
    requireUserInteraction?: boolean
  ) => void;
  showError: (
    message: string,
    duration?: number,
    requireUserInteraction?: boolean
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    type: "success",
    message: "",
  });

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const showNotification = useCallback(
    (
      type: "success" | "error",
      message: string,
      duration: number = 2000,
      requireUserInteraction: boolean = false
    ) => {
      setNotification({
        isVisible: true,
        type,
        message,
        duration,
        requireUserInteraction,
      });

      // Auto-hide after duration only if not requiring user interaction
      if (!requireUserInteraction) {
        setTimeout(() => {
          hideNotification();
        }, duration);
      }
    },
    [hideNotification]
  );

  const showSuccess = useCallback(
    (message: string, duration?: number, requireUserInteraction?: boolean) => {
      showNotification("success", message, duration, requireUserInteraction);
    },
    [showNotification]
  );

  const showError = useCallback(
    (message: string, duration?: number, requireUserInteraction?: boolean) => {
      showNotification("error", message, duration, requireUserInteraction);
    },
    [showNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
        showSuccess,
        showError,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
