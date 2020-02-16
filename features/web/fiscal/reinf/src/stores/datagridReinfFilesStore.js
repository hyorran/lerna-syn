import React from 'react'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import moment from 'moment/moment'
import { momentFriendlyMonthYearFormat } from '@syntesis/c-pickers/src/utils'
import Typography from '@material-ui/core/Typography'
import Colors from '@syntesis/c-styles/src/styles/Colors'

class DatagridReinfFilesStore extends DatagridServerSideStore {
  constructor() {
    super({
      initialFetch: false,
      endpoint: 'fiscal/reinf/getgeneratedfiles',
      params: {
        OrderBy: [
          {
            PropertyName: 'competence',
            Dir: 'd'
          }
        ]
      },
      columns: [
        {
          Header: 'Competência',
          accessor: 'competence',
          Cell: ({ value }) => moment(value).format(momentFriendlyMonthYearFormat),
          searchable: false,
          searchOperation: 'contains',
          width: 110,
          style: {
            justifyContent: 'center'
          }
        },
        {
          Header: 'Layout',
          accessor: 'fileLayout',
          Cell: ({ value }) => {
            const typographyStyle = {
              color: Colors.generic.main
            }
            switch (value) {
              case 0:
                return (
                  <Typography style={ typographyStyle }>R-1000</Typography>
                )
              case 2:
                return (
                  <Typography style={ typographyStyle }>R-2010</Typography>
                )
              case 3:
                return (
                  <Typography style={ typographyStyle }>R-2020</Typography>
                )
              case 7:
                return (
                  <Typography style={ typographyStyle }>R-2060</Typography>
                )
              case 8:
                return (
                  <Typography style={ typographyStyle }>R-2098</Typography>
                )
              case 9:
                return (
                  <Typography style={ typographyStyle }>R-2099</Typography>
                )
              case 13:
                return (
                  <Typography style={ typographyStyle }>R-9000</Typography>
                )
              default:
                return '-'
            }
          },
          searchable: false,
          filterOperation: 'equals',
          width: 80,
          style: {
            justifyContent: 'center'
          }
        },
        {
          Header: 'Status do Arquivo',
          accessor: 'fileStatus',
          Cell: ({ value }) => {
            const typographyStyle = {
              color: '#000'
            }
            switch (value) {
              case 0:
                typographyStyle.color = Colors.warning.main
                return (
                  <Typography style={ typographyStyle }>Aguardando geração</Typography>
                )
              case 1:
                typographyStyle.color = Colors.linkBlue
                return (
                  <Typography style={ typographyStyle }>Gerado</Typography>
                )
              case 2:
                typographyStyle.color = Colors.success.main
                return (
                  <Typography style={ typographyStyle }>Transmitido</Typography>
                )
              case 3:
                typographyStyle.color = Colors.error.main
                return (
                  // eslint-disable-next-line max-len
                  <Typography style={ typographyStyle }>Descartado (cancelado/refutado)</Typography>
                )
              default:
                return '-'
            }
          },
          searchable: false,
          sortable: false,
          filterOperation: 'equals',
          style: {
            justifyContent: 'center'
          }
        }
      ]
    })
  }
}

const store = new DatagridReinfFilesStore()

export default store
