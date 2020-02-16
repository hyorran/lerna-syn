import 'react-table/react-table.css'
import Colors from '@syntesis/c-styles/src/styles/Colors'
import Fonts from '@syntesis/c-styles/src/styles/Fonts'

export default () => ({
  '@global': {
    '.ReactTable': {
      border: '0 !important',
      boxShadow: '0 2px 15px 0 rgba(0,0,0,0.1)',
      // fix bug overflow focus in and out
      overflow: 'hidden !important',
      '&.-highlight .rt-tbody .rt-tr:not(.-padRow):hover': {
        background: 'rgba(0,0,0,0.1)',
        '& button': {
          opacity: 1
        }
      },
      '& .rt-table': {
        fontSize: Fonts.fontSize.SS,
        borderRadius: 4
      },
      '& .rt-thead .rt-th': {
        padding: '14px 12px'
      },
      '& .rt-th, & .rt-td': {
        fontFamily: '"Roboto", "Helvetica", Arial, sans-serif',
        color: Colors.text,
        padding: '14px 12px'
      },
      '& .rt-th[role="columnheader"]': {
        background: Colors.primary,
        color: `${ Colors.white } !important`,
        borderLeft: 'rgba(255,255,255,0.25) 1px dashed',
        outline: 0,
        '&:first-of-type': {
          borderLeft: 0
        },
        '& div:first-child:before': {
          content: '""',
          display: 'inline-block',
          verticalAlign: 'middle',
          position: 'relative',
          width: '0',
          height: '16px',
          backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFF" viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>\')',
          transition: 'transform 700ms ease-out, opacity 200ms linear',
          opacity: 0,
        },
        '&.-sort-asc': {
          '& div:first-child:before': {
            marginRight: '5px',
            top: '-2px',
            width: '16px',
            opacity: 1,
          }
        },
        '&.-sort-desc': {
          '& div:first-child:before': {
            opacity: 1,
            marginRight: '5px',
            top: '-2px',
            width: '16px',
            transform: 'rotate(-180deg)'
          }
        },
      },
      '& .rt-thead .rt-th.-sort-asc, &.rt-thead .rt-td.-sort-asc': {
        boxShadow: `inset 0 3px 0 0 ${ Colors.secondary } !important`
      },
      '& .rt-thead .rt-th.-sort-desc, &.rt-thead .rt-td.-sort-desc': {
        boxShadow: `inset 0 -3px 0 0 ${ Colors.secondary } !important`
      },
      '& .-pagination': {
        border: '0 !important',
        boxShadow: 'none',
        fontSize: Fonts.fontSize.S,
        '& .-btn:not([disabled]):hover': {
          color: Colors.primary,
          background: Colors.lightBlue
        },
        '& .-pageJump': {
          margin: [0, 3]
        },
        '& .-center': {
          alignItems: 'center !important'
        },
        '& input': {
          border: '0 !important',
          background: Colors.transparent,
          width: '40px !important',
          height: '1.9em'
        }
      },
    },
    '.rt-resizer': {
      right: '-2px !important'
    },
    '.-count-row': {
      padding: [5, 10],
      fontSize: Fonts.fontSize.SS,
      textAlign: 'center'
    }
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Roboto", sans-serif, Arial'
  },
  tableContainer: {
    flex: 1,
    display: 'flex',
    marginTop: 5
  },
  avatarUpdated: {
    // margin: 10,
    backgroundColor: Colors.lightBlue,
    color: Colors.primary
  },
  lastUpdated: {
    paddingTop: 15,
    display: 'inline-flex',
    justifyContent: 'flex-end'
  },
  errorTextContainer: {
    display: 'grid',
    gridTemplateColumns: 'max-content auto',
    gridColumnGap: '20px',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
