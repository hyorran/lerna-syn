export default {
  'body': {
    'font': '13pt Georgia, serif',
    'lineHeight': '1.3',
    'background': '#fff !important',
    'color': '#000'
  },
  container: {
    '&': {
      'display': 'flex',
      'flex-flow': 'column'
    },
    '& tbody, thead': {
      '& h1': {
        'margin': 0,
        'textAlign': 'center'
      },
      '& span': {
        'display': 'block',
        'textAlign': 'center'
      },
      'width': '100%',
      'display': 'inline-table'
    },
    '& th,td': {
      'flex': '1 1 auto',
      'padding': '7px 6px',
      'textAlign': 'justify',
      'font-size': '10px !important'
    },
    '& th': {
      'textAlign': 'justify',
      'background': 'rgba(0,0,0,.1)',
      'fontWeight': 'bold'
    },
    '& tr:nth-of-type(2n)': {
      'borderRight': '1px solid rgba(0,0,0,0.02)',
      'background': 'rgba(0,0,0,0.03)'
    },
    '& tfoot': {
      'font-size': '10px',
      'color': 'rgba(0,0,0,0.4)'
    },
    '& thead': {
      'margin-bottom': '8px'
    }
  }
}
