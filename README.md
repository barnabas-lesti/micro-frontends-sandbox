# Micro Frontends sandbox

Sandbox project to test out Micro Frontends.

## Prerequisites

The project heavily relies on [pnpm](https://pnpm.io/) so make sure it's installed:

```bash
npm install -g pnpm
```

## Development

1. Clone the repository.
2. Run `pnpm i` to install dependencies and prepare the project.
   - The `prepare` script will build some components to, well... prepare the repo.
3. Start an application or other component builders:
   - Starting an application with `pnpm dev --filter web3-app`
     - This will also start the `micro-frontend-server` to serve micro frontends.
   - Start a MFe (or package) builder in development mode: `pnpm dev --filter svc-platform`
     - This will run build in watch mode for the component.

### Scripts

```sh
# Build components:
pnpm build --filter component-name

# Start and application or a specific component in development mode (build in watch mode):
pnpm dev --filter component-name

# Lint and format project source files:
pnpm lint
pnpm lint:fix

# Clean the repository by deleting node_modules, build outputs, etc.:
pnpm clean
```

## Additional documentation

- [Resources](./docs/resources.md)
