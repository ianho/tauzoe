interface AvatarOptions {
  size?: number;
  seed?: string;
}

type ShapeType = 'circle' | 'square' | 'roundedSquare' | 'rotatedSquare' | 'rotatedRoundedSquare' |
                 'triangle' | 'triangle90' | 'triangle180' | 'triangle270' | 'heart' | 'star' |
                 'pacman' | 'pacman90' | 'pacman180' | 'pacman270';

function generateShape(seed: string): ShapeType {
  const shapeIndex = Math.abs(hashCode(seed + 'shape')) % 15
  const shapes: ShapeType[] = ['circle', 'square', 'roundedSquare', 'rotatedSquare', 'rotatedRoundedSquare',
    'triangle', 'triangle90', 'triangle180', 'triangle270', 'heart', 'star',
    'pacman', 'pacman90', 'pacman180', 'pacman270']
  return shapes[shapeIndex]
}

function generateAngle(seed: string): number {
  return Math.abs(hashCode(seed + 'angle')) % 360
}

function drawShape(shape: ShapeType, gradientColor1: string, gradientColor2: string, angle: number): string {
  const createGradientDef = () => {
    // 将角度反转 180 度
    const reversedAngle = (angle + 180) % 360
    const x1 = 50 + 50 * Math.cos((reversedAngle - 90) * Math.PI / 180)
    const y1 = 50 + 50 * Math.sin((reversedAngle - 90) * Math.PI / 180)
    const x2 = 50 + 50 * Math.cos((reversedAngle + 90) * Math.PI / 180)
    const y2 = 50 + 50 * Math.sin((reversedAngle + 90) * Math.PI / 180)

    return `
      <linearGradient id="shapeGrad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
        <stop offset="0%" style="stop-color:${gradientColor1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${gradientColor2};stop-opacity:1" />
      </linearGradient>
    `
  }

  const shadowFilter = `
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
      <feColorMatrix result="matrixOut" in="blurOut" type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
      <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
    </filter>
  `

  let shapeElement = ''

  switch (shape) {
  case 'circle':
    shapeElement = '<circle cx="50" cy="50" r="25" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'square':
    shapeElement = '<rect x="27" y="27" width="46" height="46" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'roundedSquare':
    shapeElement = '<rect x="27" y="27" width="46" height="46" rx="9" ry="9" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'rotatedSquare':
    shapeElement = '<path d="M 50 24 L 76 50 L 50 76 L 24 50 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'rotatedRoundedSquare':
    shapeElement = '<path d="M 50 24 Q 53.3 24 55.8 26.5 L 73.5 44.2 Q 76 46.7 76 50 Q 76 53.3 73.5 55.8 L 55.8 73.5 Q 53.3 76 50 76 Q 46.7 76 44.2 73.5 L 26.5 55.8 Q 24 53.3 24 50 Q 24 46.7 26.5 44.2 L 44.2 26.5 Q 46.7 24 50 24 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'triangle':
    shapeElement = '<polygon points="50,25 72,65 28,65" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'triangle90':
    shapeElement = '<polygon points="25,50 65,72 65,28" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'triangle180':
    shapeElement = '<polygon points="50,75 28,35 72,35" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'triangle270':
    shapeElement = '<polygon points="75,50 35,28 35,72" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'heart':
    shapeElement = '<path d="M 71.044151 53.027893 C 69.202805 56.451256 66.588997 59.783817 63.202675 63.025597 C 59.818291 66.267609 55.810215 69.365524 51.178482 72.319351 C 50.894207 72.500748 50.59483 72.657349 50.283672 72.787384 C 49.731472 73.070877 49.076553 73.070877 48.524353 72.787384 C 48.213196 72.657349 47.913818 72.500748 47.629543 72.319351 C 42.998459 69.365265 38.990242 66.267357 35.60498 63.025597 C 32.219677 59.783817 29.60582 56.451256 27.763317 53.027893 C 25.921322 49.604691 25 46.037182 25 42.542301 C 25 39.644836 25.606516 37.18457 26.818949 34.945076 C 27.957113 32.785019 29.652514 30.968842 31.729273 29.684982 C 33.798965 28.409164 36.189793 27.750504 38.620846 27.786385 C 41.028156 27.786385 43.2141 28.400269 45.032127 29.632767 C 46.859432 30.841209 48.360947 32.481117 49.404015 34.407631 C 50.447079 32.481117 51.948593 30.841209 53.775898 29.632767 C 55.593925 28.400269 57.780838 27.786385 60.18718 27.786385 C 62.618328 27.750336 65.009247 28.409019 67.078987 29.684982 C 69.155556 30.968681 70.850632 32.784927 71.988106 34.945076 C 73.200768 37.18457 73.808029 39.644836 73.808029 42.542301 C 73.808029 46.037182 72.886703 49.604691 71.044151 53.027893 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'star':
    shapeElement = '<path d="M 50 25 L 42.154789 39.201996 L 26.223587 42.274574 L 37.306183 54.124474 L 35.305367 70.225426 L 50 63.347069 L 64.694633 70.225426 L 62.693817 54.124474 L 73.776413 42.274574 L 57.845211 39.201996 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'pacman':
    shapeElement = '<path d="M 72 50.5 C 72 62.926411 61.926388 73 49.5 73 C 37.073612 73 27 62.926411 27 50.5 C 27 38.073589 37.073612 28 49.5 28 L 72 28 L 72 50.5 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'pacman90':
    shapeElement = '<path d="M 50.5 72 C 38.073589 72 28 61.926388 28 49.5 C 28 37.073612 38.073589 27 50.5 27 C 62.926411 27 73 37.073612 73 49.5 L 73 72 L 50.5 72 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'pacman180':
    shapeElement = '<path d="M 28 50.5 C 28 38.073589 38.073612 28 50.5 28 C 62.926388 28 73 38.073589 73 50.5 C 73 62.926411 62.926388 73 50.5 73 L 28 73 L 28 50.5 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  case 'pacman270':
    shapeElement = '<path d="M 50.5 28 C 62.926411 28 73 38.073612 73 50.5 C 73 62.926388 62.926411 73 50.5 73 C 38.073589 73 28 62.926388 28 50.5 L 28 28 L 50.5 28 Z" fill="url(#shapeGrad)" stroke="white" stroke-width="3" filter="url(#shadow)" />'
    break
  }

  const gradientDef = createGradientDef()

  return `
    <defs>
      ${gradientDef}
      ${shadowFilter}
    </defs>
    ${shapeElement}
  `
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function generateGradientColors(seed: string): [string, string] {
  const baseHue = Math.abs(hashCode(seed)) % 360
  const saturation = 70 + Math.abs(hashCode(seed + 'sat')) % 30 // 70-100
  const lightness = 45 + Math.abs(hashCode(seed + 'light')) % 15 // 45-60

  // 生成 40 到 60 度之间的色相差值
  const hueDifference = 40 + Math.abs(hashCode(seed + 'hue')) % 21

  // 确保第二个色相在 0-359 范围内
  const secondHue = (baseHue + hueDifference) % 360

  return [
    hslToHex(baseHue, saturation, lightness),
    hslToHex(secondHue, saturation, lightness),
  ]
}

export function generateAvatar(options: AvatarOptions = {}): string {
  const { size = 100, seed = Math.random().toString() } = options

  const [gradientColor1, gradientColor2] = generateGradientColors(seed)
  const angle = generateAngle(seed)
  const shape = generateShape(seed)

  // 计算背景渐变的起点和终点
  const x1 = 50 + 50 * Math.cos((angle - 90) * Math.PI / 180)
  const y1 = 50 + 50 * Math.sin((angle - 90) * Math.PI / 180)
  const x2 = 50 + 50 * Math.cos((angle + 90) * Math.PI / 180)
  const y2 = 50 + 50 * Math.sin((angle + 90) * Math.PI / 180)

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
          <stop offset="0%" style="stop-color:${gradientColor1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradientColor2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#bgGrad)" />
      ${drawShape(shape, gradientColor1, gradientColor2, angle)}
    </svg>
  `.trim()
}

export function generateAvatarBase64(options: AvatarOptions = {}): string {
  const svgString = generateAvatar(options)
  // 使用 unescape 和 encodeURIComponent 的组合来处理 Unicode 字符
  const encodedSvg = btoa(unescape(encodeURIComponent(svgString)))
  return `data:image/svg+xml;base64,${encodedSvg}`
}