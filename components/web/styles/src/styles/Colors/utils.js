// https://github.com/TypeCtrl/tinycolor
import { TinyColor } from '@ctrl/tinycolor';

const tinygradient = require('tinygradient')

const createGradient = (iniColor, finColor, steps) => {
  const gradient = tinygradient([
    { color: iniColor, pos: 0 },
    { color: finColor, pos: 1 }
  ])
  return gradient.rgb(steps)
}

const isDark = color => new TinyColor(color).isDark()
const isLight = color => new TinyColor(color).isLight()
const isValid = color => new TinyColor(color).isValid
const lighten = (color, amount) => new TinyColor(color).lighten(amount)
const brighten = (color, amount) => new TinyColor(color).brighten(amount)
const darken = (color, amount) => new TinyColor(color).darken(amount)
const clone = color => new TinyColor(color).clone()

export {
  createGradient,
  isDark,
  isLight,
  isValid,
  lighten,
  brighten,
  darken,
  clone
}
