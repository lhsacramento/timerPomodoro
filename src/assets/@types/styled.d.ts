import 'styled-components'
import { defaultTheme } from '../styles/themes/themes'

type ThemeType = typeof defaultTheme

export module 'styled-components' {
  export type DefaultTheme = ThemeType
}
