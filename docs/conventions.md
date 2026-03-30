# Design System Conventions

> Rules for agents (Squad: Implementer, Reviewer, Janitor) and humans working with the `@designsystem` registry.

---

## For Agents (The Squad)

### Implementer

When implementing any form field or input in a consumer app:

1. **Check the registry before writing any input component.** Run:
   ```bash
   npx shadcn add @designsystem/floating-input
   ```
   The current registry covers: `floating-input` (with Email, Password, Phone, Number presets).

2. **Install, don't rewrite.** If the registry has the component you need, install it. Do not create a local version.

3. **If the needed component does not exist in the registry:**
   - Implement it inline in the consumer app as a minimal, token-consuming component.
   - Add a comment: `// TODO: candidate for @designsystem registry`
   - Open a Linear issue flagging it for registry addition. Do not block your current task on this.

4. **Token usage is mandatory.** Components you write must consume CSS token variables (`var(--primary)`, `var(--radius-md)`, etc.). No hardcoded color or radius values.

### Reviewer

When reviewing PRs in any consumer app:

1. **Reject duplicates.** If a PR introduces a floating label input, email input, password input, phone input, or number input that is not using `FloatingInput` / its presets from `@designsystem`, reject with:
   > "This duplicates a registry component. Install via `npx shadcn add @designsystem/floating-input` and use the `FloatingInput` / preset instead."

2. **Verify token usage.** Check that any new or modified UI component uses CSS token variables. Reject hardcoded values. Accepted formats: `var(--token-name)`, Tailwind utilities backed by tokens (e.g., `text-foreground`, `bg-primary`, `border-input`).

3. **Check FloatingInput is used for form fields.** Any `<input>` or form field added in a consumer app should use `FloatingInput` or an appropriate preset. A plain `<input>` is only acceptable when shadcn's own form primitives are in use (e.g., `<FormField>` with shadcn `<Input>`).

### Janitor

When new components are added to the registry (detected by changes to `registry.json` or new files in `registry/`):

1. **Create install issues for each consumer app.** For each app listed in the registry's README or known consumers (currently: Homebase), create a Linear issue:
   > "Install new @designsystem component `<name>` — run `npx shadcn add @designsystem/<name>`"

2. **Do not auto-install.** Consumer apps may have customizations. Flag the availability; let the Implementer decide whether and when to install.

---

## For Humans

### Adding a new component to the registry

1. Create the component source in `registry/<component-name>.tsx`.
2. Add an entry to `registry.json` following the existing schema.
3. Build the registry:
   ```bash
   npm run build
   ```
   This generates the installable JSON under `public/r/`.
4. Commit **both** the source and the generated output:
   ```bash
   git add registry/<component-name>.tsx registry.json public/r/
   git commit -m "feat: add <component-name> to registry"
   ```
5. Update `docs/DESIGN.md` — add the component's props table, token table, and usage examples.

### Updating an existing component

1. Edit the source in `registry/<component-name>.tsx`.
2. Run `npm run build` to regenerate `public/r/`.
3. Commit source + generated output together.
4. Consumer apps re-run the install command to receive the update:
   ```bash
   npx shadcn add @designsystem/<component-name>
   ```
   This overwrites their local copy. They can diff in git before committing.

### Branching and review

- Work on a feature branch. Open a PR against `main`.
- The Reviewer agent (or a human reviewer) checks for token compliance and no duplication before merging.
- After merge, notify consumer app owners if a component they use has changed its API.

### Versioning

The registry does not use semver today. Breaking prop changes must be documented in the component's section of `docs/DESIGN.md` with a migration note.
