# My Awesome Library

A useful npm library for your projects.

## Installation

```bash
npm install my-awesome-library
```

## Usage

```typescript
import { greet } from 'my-awesome-library';

console.log(greet('World'));
```

## Development

### Setup
```bash
npm install
```

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run dev
```

### Testing
```bash
npm test
```

## Publishing to NPM

### Before Publishing
1. Update version in `package.json`
2. Update CHANGELOG if needed
3. Ensure all tests pass
4. Build the project

### Publish Steps
```bash
# Login to npm
npm login

# Publish
npm publish

# For scoped packages
npm publish --access public
```

## License

MIT
