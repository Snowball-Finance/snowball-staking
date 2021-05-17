
import {
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

const fontFamily = [
  'Montserrat',
  'Rubik',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
]

const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: fontFamily.join(',')
  },
  MuiCssBaseline: {
    '@global': {
      '@font-face': [{
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
        src: `
          local('Montserrat'),
          url('/assets/fonts/Montserrat.woff') format('woff')`
      }],
    }
  },
  palette: {
    primary: {
      light: '#4791db',
      main: '#1e2644',
      dark: '#ecebed',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#337ab7',
    },
    danger: {
      main: '#eb196e',
    },
    background: {
      default: '#1c2132',
      primary: '#1e2644',
    },
    text: {
      primary: '#337ab7',
      secondary: '#FFFFFF'
    },
  },
  custom: {
    palette: {
      white: '#FFFFFF',
      green: '#28C76F'
    },
    layout: {
      maxDesktopWidth: 1020,
      topAppBarHeight: 65
    },
  }
}));

export default theme;