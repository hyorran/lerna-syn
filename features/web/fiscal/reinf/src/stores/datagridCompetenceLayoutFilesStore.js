import React from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import moment from 'moment/moment'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { DatagridServerSideStore } from '@syntesis/c-datagrid'
import Colors from '@syntesis/c-styles/src/styles/Colors'
import { momentBackDateTimeFormat, momentFriendlyDateTimeFormat } from '@syntesis/c-pickers/src/utils'
import formatCnpj from '@syntesis/c-functions/src/formatCnpj'
import TextUnderCellComponent from '@syntesis/c-commons/src/components/TextUnderCellComponent'

class DatagridCompetenceLayoutFilesStore extends DatagridServerSideStore {
  constructor() {
    super({
      initialFetch: false,
      endpoint: 'fiscal/reinf/getreinffilestolist',
      columns: [
        {
          Header: 'CNPJ',
          accessor: 'fiscalReinf',
          Cell: ({ value, original }) => {
            const { fileLayout } = original
            let cnpj = '-'
            let name = '-'
            switch (fileLayout) {
              case 0:
                cnpj = get(value, 'r1000.cnpj')
                name = get(value, 'r1000.name')
                break
              case 2:
                cnpj = get(value, 'r2010.cnpj')
                name = get(value, 'r2010.name')
                break
              case 3:
                cnpj = get(value, 'r2020.cnpj')
                name = get(value, 'r2020.name')
                break
              case 7:
                cnpj = get(value, 'r2060.cnpj')
                name = get(value, 'r2060.name')
                break
              case 8:
                cnpj = get(value, 'r2098.cnpj')
                name = get(value, 'r2098.name')
                break
              case 9:
                cnpj = get(value, 'r2099.cnpj')
                name = get(value, 'r2099.name')
                break
              case 13:
                cnpj = get(value, 'r9000.cnpj')
                name = get(value, 'r9000.name')
                break
              default:
                break
            }

            return (
              <TextUnderCellComponent
                text={ formatCnpj(cnpj) }
                subText={ name }
                wrapText={ 30 }
              />
            )
          },
          width: 200,
          searchable: false,
          sortable: false
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
                  <Typography style={ typographyStyle }>Descartado (cancelado/refutado)</Typography>
                )
              case 4:
                typographyStyle.color = Colors.linkBlue
                return (
                  <Typography style={ typographyStyle }>Em processamento</Typography>
                )
              case 5:
                typographyStyle.color = Colors.success.main
                return (
                  <Typography style={ typographyStyle }>Reaberto</Typography>
                )
              default:
                return '-'
            }
          },
          searchable: false,
          sortable: false,
          filterOperation: 'equals',
          width: 250
        },
        {
          Header: 'Retorno RFB',
          accessor: 'result',
          Cell: ({ value }) => (
            !isEmpty(value)
              ? <Tooltip title={ value } placement="bottom" disableHoverListener={ value.length < 50 }><Typography noWrap>{ value }</Typography></Tooltip>
              : '-'
          )
        },
        {
          Header: 'Última atualização',
          id: 'dateTime',
          width: 130,
          Cell: ({ original }) => {
            const {
              created,
              modified
            } = original

            return moment(
              modified || created,
              momentBackDateTimeFormat
            ).format(momentFriendlyDateTimeFormat)
          }
        },
      ]
    })
  }
  keepActiveRowIndex = true
}

const store = new DatagridCompetenceLayoutFilesStore()

export default store
