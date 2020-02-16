import React from 'react'
import PropTypes from 'prop-types'
import Visa from './Visa'
import Mastercard from './Mastercard'
import Amex from './Amex'
import Elo from './Elo'
import Aura from './Aura'
import Diners from './Diners'
import Discover from './Discover'
import Jcb from './Jcb'
import Hipercard from './Hipercard'
import Banricompras from './Banricompras'
import Banricard from './Banricard'

const CardBrand = (props) => {
  const { brandId } = props

  switch (brandId) {
    case 1: // Visa
      return <Visa />
    case 2: // Mastercard
      return <Mastercard />
    case 3: // Amex
      return <Amex />
    case 4: // Elo
      return <Elo />
    case 5: // Aura
      return <Aura />
    case 6: // Diners
      return <Diners />
    case 7: // Discover
      return <Discover />
    case 8: // JCB
      return <Jcb />
    case 11: // Hipercard
      return <Hipercard />
    case 12: // Banricompras
      return <Banricompras />
    case 13: // Banricard
      return <Banricard />
    default:
      return '-'
  }
}

CardBrand.propTypes = {
  brandId: PropTypes.number
}

CardBrand.defaultProps = {
  brandId: null
}

export default CardBrand
