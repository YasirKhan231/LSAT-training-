"use client";

import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const notificationVariants = cva(
  "fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 text-gray-800",
        success: "bg-green-50 border border-green-200 text-green-800",
        error: "bg-red-50 border border-red-200 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface NotificationProps
  extends VariantProps<typeof notificationVariants> {
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function Notification({
  title,
  message,
  variant,
  duration = 5000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={cn(notificationVariants({ variant }))}>
      {variant === "success" && (
        <CheckCircle className="h-5 w-5 text-green-500" />
      )}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="rounded-full p-1 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
