"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  helperText?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, helperText, type = "text", id, ...props }, ref) => {
    const inputId = id || React.useId();
    const [focused, setFocused] = React.useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    const isActive = focused || hasValue;

    return (
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={error || undefined}
          className={cn(
            "peer w-full rounded-[var(--radius-md)] border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors",
            "placeholder-transparent",
            error
              ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/50"
              : "border-input focus:border-ring focus:ring-1 focus:ring-ring/50",
            className
          )}
          placeholder={label}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-3 bg-background px-1 transition-all duration-200",
            isActive
              ? "-top-2.5 text-xs font-medium"
              : "top-3 text-sm",
            error
              ? "text-destructive"
              : isActive
                ? "text-primary"
                : "text-muted-foreground"
          )}
        >
          {label}
        </label>
        {helperText && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

/* ── Presets ── */

type PresetProps = Omit<FloatingInputProps, "type">;

const FloatingEmailInput = React.forwardRef<HTMLInputElement, PresetProps>(
  (props, ref) => (
    <FloatingInput
      ref={ref}
      type="email"
      inputMode="email"
      autoComplete="email"
      {...props}
    />
  )
);
FloatingEmailInput.displayName = "FloatingEmailInput";

const FloatingPasswordInput = React.forwardRef<HTMLInputElement, PresetProps>(
  (props, ref) => (
    <FloatingInput
      ref={ref}
      type="password"
      autoComplete="current-password"
      {...props}
    />
  )
);
FloatingPasswordInput.displayName = "FloatingPasswordInput";

const FloatingPhoneInput = React.forwardRef<HTMLInputElement, PresetProps>(
  (props, ref) => (
    <FloatingInput
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      {...props}
    />
  )
);
FloatingPhoneInput.displayName = "FloatingPhoneInput";

const FloatingNumberInput = React.forwardRef<HTMLInputElement, PresetProps>(
  (props, ref) => (
    <FloatingInput
      ref={ref}
      type="text"
      inputMode="decimal"
      {...props}
    />
  )
);
FloatingNumberInput.displayName = "FloatingNumberInput";

export {
  FloatingInput,
  FloatingEmailInput,
  FloatingPasswordInput,
  FloatingPhoneInput,
  FloatingNumberInput,
};
