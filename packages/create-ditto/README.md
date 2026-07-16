# create-ditto

Create a DittoJs project from a saved web template.

```bash
npx create-ditto my-app --template-id TEMPLATE_ID
```

Omit `my-app` to enter the project name interactively. The CLI creates a folder with the normalized
project name, requests a dependency-correct project from the Ditto API, extracts it safely, and can
install dependencies.

```text
--api-url URL
--package-manager pnpm|npm|yarn
--install
--no-install
```

Set `DITTO_API_URL` or pass `--api-url` when using a self-hosted Ditto API.
