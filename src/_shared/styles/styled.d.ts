import 'styled-components';
import { Vars, Config, type Theme } from '@toolbox-ts/css';

declare module 'styled-components' {
  export type ThemeConfig = Config;
  export type ThemeState = Theme;
  export interface DefaultTheme extends Vars {}
}
