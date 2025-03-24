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
        default:
          "bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border border-[#1a1a1f] text-white",
        success:
          "bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border border-[#1a1a1f] text-white",
        error: "bg-red-900/30 border border-red-800 text-red-300",
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
      {variant === "success" && <CheckCircle className="h-5 w-5 text-white" />}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="rounded-full p-1 hover:bg-[#1a1a1f]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
