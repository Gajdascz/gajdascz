import { createGlobalStyle, css } from 'styled-components';
import { generate } from '@toolbox-ts/css';
import ahlNext from '../assets/fonts/atkinson/ahl-next-var.woff2';
import ahlMono from '../assets/fonts/atkinson/ahl-mono-var.woff2';

const staticFontFaceCfg = {
  fontStyle: 'normal',
  fontWeight: '200 800',
  fontDisplay: 'swap'
} as const;

export default createGlobalStyle`
${generate({
  vars: {
    typography: { fontFamily: 'ahl-next', fontFamilyMono: 'ahl-mono' },
    darkColors: {}
  },
  fontFaces: [
    {
      src: { linkType: 'url', link: ahlNext, format: 'woff2' },
      fontFamily: 'ahl-next',
      ...staticFontFaceCfg
    },
    {
      src: { linkType: 'url', link: ahlMono, format: 'woff2' },
      fontFamily: 'ahl-mono',
      ...staticFontFaceCfg
    }
  ],
  sheetCss: `
    body {
      background-color: transparent;
    }
  `
})}
`;
