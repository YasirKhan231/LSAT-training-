import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: (
      title: string,
      options?: { variant?: "default" | "destructive"; description?: string }
    ) => {
      if (options?.variant === "destructive") {
        toast.error(title, { description: options.description });
      } else {
        toast.success(title, { description: options?.description });
      }
    },
  };
};