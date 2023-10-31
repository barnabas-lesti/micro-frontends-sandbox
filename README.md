# Micro Frontends sandbox

Sandbox project to test out Micro Frontends.

## Prerequisites

The project heavily relies on [pnpm](https://pnpm.io/) so make sure it's installed:

```bash
npm install -g pnpm
```

## Development

1. Clone the repository.
2. Run `pnpm i` to install dependencies.
3. Build the project with `pnpm build`
4. Start application and component builders with `pnpm dev`.

> **Note**
> Because components need to be built to use them in other components, code editors and `pnpm dev` might complain after
> checkout. To solve this just build the project with `pnpm build`.

### Start specific builders

The `pnpm dev` commands start everything and everything. This might get resource heavy (and slow) so we can specify
what builders to start:

```bash
# You are only working on the shell package:
pnpm dev --filter shell

# You are working on the utility package and the svc-platform MFe:
pnpm dev --filter utility --filter svc-platform

# Apps have direct shortcut scripts so you can start them with these scripts:
pnpm dev:be-core
pnpm dev:fe-web3
# ... and so on.
```

### Scripts

```sh
# Start component builders in development mode:
pnpm dev --filter component-name/filter-condition

# Build components:
pnpm build --filter component-name/filter-condition

# Run test:
pnpm test --filter component-name/filter-condition

# Lint and format project source files:
pnpm lint
pnpm lint:fix

# Clean the repository by deleting node_modules, build outputs, etc.:
pnpm clean
```

## Additional documentation

- [Resources](./docs/resources.md)
