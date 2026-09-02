import * as React from "react";
import { cn } from "@/lib/utils";

export interface MenuToggleIconProps extends React.SVGAttributes<SVGSVGElement> {
  open: boolean;
  duration?: number;
}

export function MenuToggleIcon({
  open,
  duration = 300,
  className,
  ...props
}: MenuToggleIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform", className)}
      style={{ transitionDuration: `${duration}ms` }}
      {...props}
    >
      <line
        x1="4"
        y1={open ? "20" : "6"}
        x2="20"
        y2={open ? "4" : "6"}
        className="transition-all origin-center"
        style={{ transitionDuration: `${duration}ms` }}
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        className={cn("transition-opacity", { "opacity-0": open })}
        style={{ transitionDuration: `${duration}ms` }}
      />
      <line
        x1="4"
        y1={open ? "4" : "18"}
        x2="20"
        y2={open ? "20" : "18"}
        className="transition-all origin-center"
        style={{ transitionDuration: `${duration}ms` }}
      />
    </svg>
  );
}
