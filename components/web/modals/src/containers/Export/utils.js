import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import html2pdf from 'html2pdf.js'
import map from 'lodash/map'
import get from 'lodash/get'
import filter from 'lodash/filter'
import isFunction from 'lodash/isFunction'
import replace from 'lodash/replace'
import moment from 'moment/moment'
import PrintDatagrid from '@syntesis/c-print/src/components/PrintDatagrid'
import stringifyValue from '@syntesis/c-functions/src/stringifyValue'
import ExportModal from './index'

// Renderiza o componente de JSX para HTML
const renderHTML = ({ data, feature }) => renderToStaticMarkup((
  <PrintDatagrid
    data={ data }
    feature={ feature }
  />
))

// Exporta para PDF
const exportToPDF = (config, filename) => {
  const html = renderHTML(config)

  const options = {
    filename,
    margin: 6.35,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4' }
  };

  html2pdf().set(options).from(html).save()
}

// Imprime em nova aba
const print = (config) => {
  const newTab = window.open('', '_blank')
  const html = renderHTML(config)

  newTab.document.write(html)
  newTab.print()
  newTab.close()
}

// Busca na store os nomes dados para cada coluna e retorna a linha
const getHeaderRow = columns => map(columns, (col) => {
  const { Header } = col
  return Header
})

// Filtra e ordena somente para colunas declaradas
const filterAndSortData = (columns, data) => map(
  data,
  item => map(columns, (column) => {
    const itemColumnValue = get(item, column.accessor)

    if (isFunction(column.exportValue)) {
      return column.exportValue({
        item,
        value: itemColumnValue
      })
    }

    return stringifyValue(itemColumnValue)
  })
)

// Prepara o array de dados
const formatData = (columns, rows) => {
  columns = filter(columns, column => column.show !== false)
  const headerRow = getHeaderRow(columns)
  const formattedData = filterAndSortData(columns, rows)
  return [
    headerRow,
    ...formattedData
  ]
}

// Modal de opções de exportação
const openExportModal = (props) => {
  const {
    data,
    datagridColumns,
    feature
  } = props

  const formattedData = formatData(datagridColumns, data)

  window.openDialog({
    component: ExportModal,
    componentProps: {
      formattedData,
      feature
    }
  })
}

// Gera um nome baseado na rotina atual e data
const generateExportFilename = (filenameReference, extension) => [
  replace([
    filenameReference,
    moment().format('L')
  ].join(' '), /[\s-]/g, '_'),
  extension
].join('.')

export {
  renderHTML,
  exportToPDF,
  print,
  getHeaderRow,
  filterAndSortData,
  formatData,
  openExportModal,
  generateExportFilename
}
