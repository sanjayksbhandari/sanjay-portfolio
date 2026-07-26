import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

/**
 * Form label (docs/phase-2-design-system §07). Radix `Label` — clicking
 * it focuses/activates the associated control, which a plain `<label>`
 * already does natively; the primitive is used anyway for consistency
 * with the rest of `components/forms` and because it also correctly
 * handles the case where the control is a custom component (`Switch`,
 * `Checkbox`) rather than a native input.
 */
export function Label({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn("text-sm font-medium text-neutral-800", className)}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  );
}
