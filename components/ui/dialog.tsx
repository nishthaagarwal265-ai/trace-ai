"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-[#0E1218] p-0 shadow-2xl focus:outline-none",
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
            <DialogPrimitive.Title className="font-display text-[15px] font-semibold">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close className="text-text-dim hover:text-text">
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>
        )}
        <div className="p-5">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
