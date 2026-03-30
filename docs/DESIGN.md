# Design System Spec

> Machine-readable spec for agent and human consumption.
> Registry: `@designsystem` — shadcn-compatible component registry that extends shadcn/ui.
> Components use CSS design tokens so they adapt to each app's brand without modification.

---

## Token Contract

Every consumer app must define these CSS variables in a global stylesheet before using any `@designsystem` component. Components never hardcode colors, radii, or shadows — they only read these tokens.

Copy `registry/base-tokens.css` as a starting point and fill in your brand values.

### Color Tokens (semantic)

| CSS Variable              | Description                                      |
|---------------------------|--------------------------------------------------|
| `--background`            | Page / app background                            |
| `--foreground`            | Default text color                               |
| `--card`                  | Card / surface background                        |
| `--card-foreground`       | Text color on cards                              |
| `--primary`               | Brand primary action color (buttons, focus)      |
| `--primary-foreground`    | Text color on primary-colored surfaces           |
| `--secondary`             | Secondary surface background                     |
| `--secondary-foreground`  | Text on secondary surfaces                       |
| `--accent`                | Highlights and hover state backgrounds           |
| `--accent-foreground`     | Text on accent-colored surfaces                  |
| `--muted`                 | Subdued / disabled backgrounds                   |
| `--muted-foreground`      | Subdued / placeholder text                       |
| `--destructive`           | Danger, delete, and error states                 |
| `--border`                | Borders and dividers                             |
| `--input`                 | Input field border color (rest state)            |
| `--ring`                  | Focus ring color                                 |
| `--ring-offset`           | Background color behind the focus ring           |

### Typography Tokens

| CSS Variable    | Description                              |
|-----------------|------------------------------------------|
| `--font-sans`   | Primary font family (body, labels, UI)   |
| `--font-mono`   | Code / monospace font (optional)         |

### Shape Tokens

| CSS Variable  | Description                              |
|---------------|------------------------------------------|
| `--radius`    | Base border radius                       |
| `--radius-sm` | Small radius (tags, chips)               |
| `--radius-md` | Medium radius (inputs, buttons)          |
| `--radius-lg` | Large radius (cards, panels)             |
| `--radius-xl` | Extra-large radius (modals, drawers)     |

### Shadow Tokens

| CSS Variable  | Description                              |
|---------------|------------------------------------------|
| `--shadow-sm` | Subtle elevation (e.g., input focus)     |
| `--shadow-md` | Default elevation (cards, dropdowns)     |
| `--shadow-lg` | Modal / overlay elevation                |

### Dark Theme

Define the same token names under `.dark` or `[data-theme="dark"]` (or `@media (prefers-color-scheme: dark) { :root { ... } }`). Token names do not change between themes — only values do.

---

## Components

### FloatingInput

Material Design-style floating label input. The label starts inside the field and floats above it when the field is focused or has a value.

**Install:**
```bash
npx shadcn add @designsystem/floating-input
```

**Import:**
```tsx
import {
  FloatingInput,
  FloatingEmailInput,
  FloatingPasswordInput,
  FloatingPhoneInput,
  FloatingNumberInput,
} from "@/components/ui/floating-input";
```

#### Props

| Prop         | Type      | Required | Default | Description                                                     |
|--------------|-----------|----------|---------|-----------------------------------------------------------------|
| `label`      | `string`  | Yes      | —       | Field label. Floats above input on focus or when value present. |
| `error`      | `boolean` | No       | `false` | When true, border and label render in `--destructive` color.    |
| `helperText` | `string`  | No       | —       | Helper or error message rendered below the input.              |
| `id`         | `string`  | No       | auto    | Explicit id for input/label pairing. Auto-generated if omitted. |
| `...rest`    | —         | No       | —       | All standard `React.InputHTMLAttributes<HTMLInputElement>` (e.g., `value`, `onChange`, `disabled`, `required`, `name`, `onFocus`, `onBlur`). |

**Note on `placeholder`:** The component sets `placeholder={label}` internally to drive the CSS peer pattern. Passing a separate `placeholder` prop will override the label's floating trigger — avoid it.

#### Tokens consumed

| Token                | Where used                                          |
|----------------------|-----------------------------------------------------|
| `--radius-md`        | Input border radius                                 |
| `--input`            | Input border color (rest state)                     |
| `--ring`             | Input border and focus ring color (focused state)   |
| `--destructive`      | Border, label, and helper text color in error state |
| `--muted-foreground` | Label color (rest state, no value)                  |
| `--primary`          | Label color (focused, non-error state)              |
| `--background`       | Label background (clips behind the floating label)  |
| `--foreground`       | Input text color                                    |

#### Presets

Presets are thin wrappers over `FloatingInput` that set `type`, `inputMode`, and `autoComplete`. They accept all the same props as `FloatingInput` except `type`.

| Component               | `type`     | `inputMode`  | `autoComplete`      |
|-------------------------|------------|--------------|---------------------|
| `FloatingEmailInput`    | `email`    | `email`      | `email`             |
| `FloatingPasswordInput` | `password` | —            | `current-password`  |
| `FloatingPhoneInput`    | `tel`      | `tel`        | `tel`               |
| `FloatingNumberInput`   | `text`     | `decimal`    | —                   |

#### Usage examples

```tsx
// Basic controlled input
<FloatingInput label="Full name" value={name} onChange={e => setName(e.target.value)} />

// With validation error
<FloatingInput
  label="Username"
  error={!!errors.username}
  helperText={errors.username?.message}
  {...register("username")}
/>

// Presets
<FloatingEmailInput label="Email address" {...register("email")} />
<FloatingPasswordInput label="Password" {...register("password")} />
<FloatingPhoneInput label="Phone number" {...register("phone")} />
<FloatingNumberInput label="Amount (THB)" {...register("amount")} />
```

---

## Brand Examples

These examples show how to express three distinct brands using the same token contract. Components render identically in structure; only the token values differ.

### FitKoh

> Fitness/nutrition tracker. Tone: energetic, bold, glow.

```css
:root {
  --background: oklch(0.10 0.02 260);
  --foreground: oklch(0.97 0.01 100);
  --card: oklch(0.14 0.02 260);
  --card-foreground: oklch(0.97 0.01 100);
  --primary: oklch(0.80 0.20 130);           /* neon green */
  --primary-foreground: oklch(0.10 0.02 130);
  --secondary: oklch(0.18 0.03 260);
  --secondary-foreground: oklch(0.80 0.01 100);
  --accent: oklch(0.22 0.04 260);
  --accent-foreground: oklch(0.97 0.01 100);
  --muted: oklch(0.16 0.02 260);
  --muted-foreground: oklch(0.55 0.02 100);
  --destructive: oklch(0.65 0.22 25);
  --border: oklch(0.22 0.03 260);
  --input: oklch(0.28 0.03 260);
  --ring: oklch(0.80 0.20 130);
  --ring-offset: oklch(0.10 0.02 260);

  --font-sans: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --radius: 0.5rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  --shadow-sm: 0 0 8px oklch(0.80 0.20 130 / 0.2);
  --shadow-md: 0 0 16px oklch(0.80 0.20 130 / 0.3);
  --shadow-lg: 0 4px 32px oklch(0.80 0.20 130 / 0.4);
}
```

### Homebase

> Vacation rental management PWA. Tone: calm, professional, soft shadows.

```css
:root {
  --background: rgb(249 250 251);
  --foreground: rgb(17 24 39);
  --card: rgb(255 255 255);
  --card-foreground: rgb(17 24 39);
  --primary: rgb(37 99 235);               /* warm blue */
  --primary-foreground: rgb(255 255 255);
  --secondary: rgb(243 244 246);
  --secondary-foreground: rgb(55 65 81);
  --accent: rgb(239 246 255);
  --accent-foreground: rgb(29 78 216);
  --muted: rgb(243 244 246);
  --muted-foreground: rgb(107 114 128);
  --destructive: rgb(220 38 38);
  --border: rgb(229 231 235);
  --input: rgb(209 213 219);
  --ring: rgb(37 99 235);
  --ring-offset: rgb(249 250 251);

  --font-sans: "Inter", sans-serif;
  --font-mono: "Fira Code", monospace;

  --radius: 0.5rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1.25rem;

  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px rgb(0 0 0 / 0.07), 0 2px 4px rgb(0 0 0 / 0.06);
  --shadow-lg: 0 10px 25px rgb(0 0 0 / 0.10), 0 4px 10px rgb(0 0 0 / 0.08);
}
```

### Samphan

> Contact exchange app. Tone: minimal, elegant, restrained.

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.205 0 0);
  --card: oklch(0.98 0 0);
  --card-foreground: oklch(0.205 0 0);
  --primary: oklch(0.205 0 0);             /* near-black */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.96 0 0);
  --secondary-foreground: oklch(0.30 0 0);
  --accent: oklch(0.94 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --muted: oklch(0.96 0 0);
  --muted-foreground: oklch(0.55 0 0);
  --destructive: oklch(0.577 0.245 27.33);
  --border: oklch(0.90 0 0);
  --input: oklch(0.85 0 0);
  --ring: oklch(0.205 0 0);
  --ring-offset: oklch(1 0 0);

  --font-sans: "Plus Jakarta Sans", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --radius: 0.375rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.04);
  --shadow-md: 0 2px 8px rgb(0 0 0 / 0.06);
  --shadow-lg: 0 8px 24px rgb(0 0 0 / 0.08);
}
```

---

## Usage Rules

### For all contributors (human and agent)

1. **Check the registry first.** Before creating any form or input component, verify whether a registry component already covers the use case. Run `npx shadcn add @designsystem/<component>` to install it.

2. **Extension components consume tokens — never hardcode.** Any component that extends or wraps a registry component must use the CSS token variables above. No hardcoded hex, rgb, or oklch values in component source.

3. **shadcn base components are used as-is.** Do not fork or wrap shadcn primitives (Button, Dialog, Select, etc.) unless you are adding them to this registry. Install them directly in the consumer app with `npx shadcn add <component>`.

4. **Per-project customization is token-only.** Change brand values by editing your token definitions. Document non-standard overrides in the project's `.ai/CONVENTIONS.md`.

5. **One source of truth per component.** All registry component source lives in `registry/`. The built output in `public/r/` is generated — never edit it by hand.
