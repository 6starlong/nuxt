import { defineTheme } from 'pinceau'

export default defineTheme({
  typography: {
    // This will change the general line-break size
    // letterSpacings: {
    //   tight: '-0.035em',
    //   wide: '0.035em'
    // }
  },
  prose: {
    h1: {
      // fontSize: '{typography.2xl.fontSize}'
      fontSize: '32px'
    },
    h2: {
      fontSize: '24px'
    },
    h3: {
      fontSize: '20px'
    },
    hr: {
      color: 'rgba(255, 255, 255, 0.094)'
    }
  }
})
