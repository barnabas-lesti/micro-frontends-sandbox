# Micro Frontends sandbox

Sandbox project to test out Micro Frontends.

## Development

1. Clone the repository
2. Run `pnpm i` to install dependencies and prepare the project.

### Scripts

```sh
# Build components:
pnpm build --filter component-name
pnpm build:watch --filter component-name

# Start and application in a specific environment mode:
pnpm start:dev --filter app-name
pnpm start:prod --filter app-name

# Lint and format project source files:
pnpm lint
pnpm lint:fix

# Clean the repository by deleting node_modules, build outputs, etc.:
pnpm clean
```

## Additional documentation

- [Resources](./docs/resources.md)
