# Tauzoe

A simple and beautiful seedable avatar generator that creates unique avatars with gradient backgrounds and rounded polygon shapes.

## Installation 

```bash
npm install tauzoe
yarn add tauzoe
pnpm add tauzoe
```

## Usage

```ts
import { generateAvatar } from 'tauzoe'

const avatar = generateAvatar() //svg string
const base64Avatar = generateAvatarBase64() //base64 string

const avatarWithSeed = generateAvatar({ size: 200, seed: 'your-custom-seed' })
```

## API

### generateAvatar(options?)

Generates an SVG avatar.

#### Options

- `size` (optional): Number - The size of the avatar in pixels. Default: 100
- `seed` (optional): String - A seed string to generate consistent avatars. Default: random

## License

MIT

## Others

> Code by Cursor