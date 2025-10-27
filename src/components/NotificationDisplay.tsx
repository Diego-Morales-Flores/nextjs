"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";

export function NotificationDisplay() {
  const { notification, hideNotification } = useNotification();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (notification.isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Wait for animation to complete
      return () => clearTimeout(timer); // Clean up timeout
    }
  }, [notification.isVisible]);

  // Handle user interaction to dismiss notification
  const handleUserInteraction = () => {
    if (notification.requireUserInteraction) {
      hideNotification();
    }
  };

  if (!shouldRender) return null;

  const iconSrc = notification.type === "success" ? "/good.svg" : "/bad.svg";
  const bgColor =
    notification.type === "success" ? "bg-green-100" : "bg-red-100";
  const borderColor =
    notification.type === "success" ? "border-green-500" : "border-red-500";
  const textColor =
    notification.type === "success" ? "text-green-800" : "text-red-800";

  const defaultTitle =
    notification.type === "success" ? "¡Correcto!" : "¡Inténtalo de nuevo!";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      <div
        className={`
          ${bgColor} ${borderColor} ${textColor}
          border-4 rounded-2xl max-w-md p-8 mx-4 shadow-2xl
          transform transition-all duration-500 ease-in-out
          ${
            notification.isVisible
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0"
          }
          flex flex-col items-center justify-center text-center
          ${notification.requireUserInteraction ? "cursor-pointer" : ""}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <Image
            src={iconSrc}
            alt={notification.type === "success" ? "Éxito" : "Error"}
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>
        <p className="text-xl font-bold mb-2">{defaultTitle}</p>
        <p className="text-lg">{notification.message}</p>
        {notification.requireUserInteraction && (
          <p className="text-sm mt-2 opacity-70">Toca para continuar</p>
        )}
      </div>
    </div>
  );
}
