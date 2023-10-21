# Micro Frontends sandbox

Sandbox project to test out Micro Frontends.

## Development

1. Clone the repository.
2. Run `pnpm i` to install dependencies and prepare the project.
3. Start the `micro-frontend-server` with `pnpm start:dev --filter micro-frontend-server`
   - This will start the server to serve micro frontend loaders. In the future serving MFe-s might be from S3 or some
     other remote source.
4. Start your application or MFe builder
   - Start an application example: `pnpm start:dev --filter web3-app`
   - Start a MFe builder in watch mode: `pnpm build:watch --filter svc-platform`

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
