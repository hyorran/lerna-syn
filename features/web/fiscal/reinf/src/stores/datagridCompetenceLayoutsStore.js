import React from 'react'
import get from 'lodash/get'
import { DatagridClientSideStore } from '@syntesis/c-datagrid'
import Typography from '@material-ui/core/Typography'

class DatagridCompetenceLayoutsStore extends DatagridClientSideStore {
  constructor() {
    super({
      initialFetch: false,
      columns: [
        {
          Header: 'Layout',
          accessor: 'layout',
          resizable: false,
          sortable: false,
          Cell: ({ value }) => {
            switch (get(value, 'value')) {
              case 0:
                return (
                  <Typography>
                    R-1000 - Informações do Contribuinte
                  </Typography>
                )
              case 2:
                return (
                  <Typography>
                    R-2010 - Retenção Contribuição Previdenciária - Serviços Tomados
                  </Typography>
                )
              case 3:
                return (
                  <Typography>
                    R-2020 - Retenção Contribuição Previdenciária - Serviços Prestados
                  </Typography>
                )
              case 7:
                return (
                  <Typography>
                    R-2060 - Contribuição Previdenciária sobre a Receita Bruta - CPRB
                  </Typography>
                )
              case 8:
                return (
                  <Typography>
                    R-2098 - Reabertura de Eventos Periódicos
                  </Typography>
                )
              case 9:
                return (
                  <Typography>
                    R-2099 - Fechamento de Eventos Periódicos
                  </Typography>
                )
              case 13:
                return (
                  <Typography>
                    R-9000 - Exclusão de Eventos
                  </Typography>
                )
              default:
                return '-'
            }
          }
        }
      ]
    })
  }
}

const store = new DatagridCompetenceLayoutsStore()
export default store
