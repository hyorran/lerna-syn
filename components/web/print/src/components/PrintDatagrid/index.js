import React from 'react'
import first from 'lodash/first'
import map from 'lodash/map'
import tail from 'lodash/tail'
import PropTypes from 'prop-types'
import { create as createJss } from 'jss'
import jssPreset from 'jss-preset-default'
import moment from 'moment/moment'

import styles from './styles'

// Criar objeto JSS
const jss = createJss(jssPreset())
const sheet = jss.createStyleSheet(styles)

// Colunas
const headerColumns = headerRow => map(
  headerRow,
  (column, key) => <th key={ key }>{ column }</th>
)

// Linhas e células
const bodyRows = rows => map(rows, (row, key) => (
  <tr key={ key }>
    {
      map(row, (cell, index) => (
        <td key={ index }>
          { cell }
        </td>
      ))
    }
  </tr>
))

const PrintDatagrid = (props) => {
  const { classes } = sheet
  const {
    data,
    feature: {
      title,
      subtitle
    },
  } = props

  // Folha de estilos em string para poder ser lida ao renderizar HTML
  const stylesheet = sheet.toString()

  // cabeçalho e corpo da tabela
  const header = headerColumns(first(data))
  const body = bodyRows(tail(data))

  return (
    <html lang="pt">
      <head>
        <style>
          { stylesheet }
        </style>
        {/* <title>Imprimir</title> */}
      </head>
      <body id="print-table">
        <table className={ classes.container }>
          <thead>
            <tr>
              <td>
                <span>{ subtitle }</span>
                <h1>{ title }</h1>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr key="header">
              { header }
            </tr>
            { body }
          </tbody>
          <tfoot>
            <tr>
              <td>
                <p>Relatório gerado em { moment().format('L LTS') } pelo Synsuite</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </body>
    </html>
  )
}

PrintDatagrid.propTypes = {
  data: PropTypes.array.isRequired,
  feature: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string
  }).isRequired
}

export default PrintDatagrid
