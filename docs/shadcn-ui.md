# shadcn/ui usage guide

This document defines how to use shadcn/ui in this repository. Follow it whenever you add or modify UI.

## shadcn-first approach

- Only use shadcn/ui components over custom components.
- Compose UIs by combining shadcn/ui primitives. No custom wrappers
- Use Tailwind utilities for layout and spacing, and `cn(...)` for class composition.
- Keep UI logic small and co-located with the component using it.

## Component installation and usage

- Use the existing shadcn/ui components in `@/components/ui` when available.
- Import from the project alias, not relative paths.
- Do not create new UI components outside shadcn/ui unless explicitly requested.

Example usage:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button type="button">Action</Button>
      </CardContent>
    </Card>
  );
}
```

## Customization guidelines

- Customize via props and Tailwind classes first.
- Use `cn(...)` to merge class names and avoid conflicting utilities.
- Keep variants consistent with the existing shadcn/ui patterns.
- Avoid inline styles unless there is no utility-class alternative.

## Correct patterns

- Prefer composition:
  - `Card` + `CardHeader` + `CardContent`
  - `Dialog` + `DialogTrigger` + `DialogContent`
- Keep consistent sizing and spacing with Tailwind scales already used in the app.
- Ensure form elements use `Label`, `Input`, `Textarea`, and `Form` helpers when applicable.
- Follow accessible defaults provided by shadcn/ui; do not remove required ARIA props.

## Quick reference links

- https://ui.shadcn.com/docs
- https://ui.shadcn.com/docs/components
- https://ui.shadcn.com/docs/components/button
- https://ui.shadcn.com/docs/components/card
- https://ui.shadcn.com/docs/components/dialog
