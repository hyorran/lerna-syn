export default () => ({
  '@global': {
    '.main-container': {
      overflowY: 'auto !important'
    },
    '.synsuite-body, .synsuite-html': {
      font: '12pt/16px Arial,Tahoma,Verdana,sans-serif !important'
    },
    '.ui-dialog': {
      boxSizing: 'unset',
      font: '8pt/16px Arial,Tahoma,Verdana,sans-serif !important'
    },
    '::-webkit-scrollbar': {
      width: 6,
      height: 6
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgb(250, 82, 57)',
      borderRadius: 20
    },
    '::-webkit-scrollbar-track': {
      background: '#ccc'
    },
    '::selection': {
      background: '#09536f',
      color: '#ffffff'
    }
  },
  cardHeightFull: {
    height: 800,
    background: 'transparent',
    border: 0,
    boxShadow: 'none',
    '& div': {
      height: 800
    }
  }
})
