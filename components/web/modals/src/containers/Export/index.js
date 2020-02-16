import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import omitBy from 'lodash/omitBy'
import { CSVLink } from 'react-csv'
import Button from '@syntesis/c-buttons/src/components/Button'
import { FilePdfIcon, FileExcelIcon, FileDocumentIcon } from '@syntesis/c-icons'
import HeaderTitleClose from '../../components/HeaderTitleClose'
import Modal from '../Modal'
import {
  print,
  generateExportFilename,
  exportToPDF
} from './utils'

const Export = (props) => {
  const {
    formattedData,
    feature
  } = props

  return (
    <Modal
      { ...omitBy(props, (_, key) => key === 'classes') }
      modalLoading={ false }
      HeaderComponent={
        headerProps => (
          <HeaderTitleClose
            { ...headerProps }
            title="Como deseja exportar os dados selecionados?"
          />
        )
      }
      contentComponent={
        () => (
          <Fragment>

            {/* Impressão */}
            <Button
              onClick={ () => print({
                data: formattedData,
                feature
              }) }
              btnProps={ { color: 'primary' } }
            >
              <FileDocumentIcon /> Imprimir
            </Button>

            {/* Exportar para PDF */}
            <Button
              onClick={
                () => exportToPDF({
                  data: formattedData,
                  feature
                }, generateExportFilename(feature.title, 'pdf'))
              }
              btnProps={ { color: 'primary' } }
            >
              <FilePdfIcon /> .PDF
            </Button>

            {/* Exportar para CSV */}
            <CSVLink
              filename={ generateExportFilename(feature.title, 'csv') }
              data={ formattedData }
              target="_blank"
            >
              <Button btnProps={ { color: 'primary' } } >
                <FileExcelIcon /> .CSV
              </Button>
            </CSVLink>
          </Fragment>
        )
      }
    />
  )
}

Export.propTypes = {
  open: PropTypes.bool.isRequired,
  dialogId: PropTypes.string.isRequired,
  formattedData: PropTypes.array.isRequired,
  feature: PropTypes.object.isRequired
}

export default Export
