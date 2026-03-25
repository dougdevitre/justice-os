# Justice OS Plugin System

## Building a Plugin

Plugins extend Justice OS with custom functionality. Each plugin is a module that implements the `JusticePlugin` interface.

### Plugin Structure

```
my-plugin/
  ├── index.ts          # Plugin entry point
  ├── manifest.json     # Plugin metadata
  └── README.md         # Documentation
```

### Plugin Interface

```typescript
interface JusticePlugin {
  name: string;
  version: string;
  description: string;

  /** Called when the plugin is loaded */
  onLoad(context: PluginContext): Promise<void>;

  /** Called when the plugin is unloaded */
  onUnload(): Promise<void>;
}
```

### Registering a Plugin

```typescript
import { registerPlugin } from '@justice-os/core';

registerPlugin({
  name: 'my-plugin',
  version: '0.1.0',
  description: 'My custom plugin',
  async onLoad(ctx) {
    // Initialize your plugin
  },
  async onUnload() {
    // Cleanup
  },
});
```

### Available Hooks

- `case:created` — fires when a new case is created
- `case:updated` — fires when case data changes
- `case:closed` — fires when a case is closed
- `document:generated` — fires after a document is generated
- `evidence:tagged` — fires after evidence is tagged

### Guidelines

- Keep plugins focused on a single responsibility
- Document all public APIs
- Include tests
- Follow the project's coding standards
