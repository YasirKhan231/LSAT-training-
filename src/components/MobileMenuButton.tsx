"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  onClick: () => void;
}

export default function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}
