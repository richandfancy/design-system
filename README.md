# @designsystem

Shared component registry for all web apps. Extends shadcn/ui with custom components.

## Usage

Add to your project's `components.json`:

```json
{
  "registries": {
    "@designsystem": "https://raw.githubusercontent.com/richandfancy/design-system/main/public/r/{name}.json"
  }
}
```

Then install components:

```bash
npx shadcn add @designsystem/floating-input
```

## Development

Edit components in `registry/`, update `registry.json`, then:

```bash
npm run build
```

Commit the updated `public/r/` files.
