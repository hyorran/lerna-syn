import { action, computed, observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import get from 'lodash/get'
import first from 'lodash/first'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import toString from 'lodash/toString'
import isFunction from 'lodash/isFunction'
import md5 from 'md5'
import moment from 'moment/moment'
import { postPresentialPayment } from '@syntesis/s-presential-payment'
import { ipcRenderer } from 'electron'

class CardPaymentPresentialStore {
  constructor() {
    this.paymentSuccess = this.paymentSuccess.bind(this)
    this.paymentError = this.paymentError.bind(this)
  }

  @observable
  capptaIsAuth = false

  @observable
  checkout = null

  @observable
  processingPayment = false

  @persist('object')
  @observable
  capptaConfig = {}

  @observable
  connectionTries = 0

  @action
  saveCapptaConfig = (capptaConfig) => {
    if (!isEmpty(capptaConfig)) {
      this.capptaConfig = capptaConfig
    }
  }

  @action
  capptaAuthenticate = () => new Promise((resolve) => {
    const success = (response) => {
      // callback para autenticação bem sucedida
      ipcRenderer.send('log-internal', {
        type: 'info',
        str: `Cappta is authenticated! ${ response.merchantCheckoutGuid }`
      })
      console.warn('cappta is authenticated!', response.merchantCheckoutGuid, response)
      this.capptaIsAuth = true
      resolve()
    }

    const error = (response) => {
      // callback para autenticação que falhou
      ipcRenderer.send('log-internal', {
        type: 'error',
        str: `Cappta authentication error. ${ response.reason }`
      })
      this.capptaIsAuth = false
      setTimeout(init, 1000)
    }

    const handlePendingPayments = (response) => {
      // console.warn('pagamentos pendentes')
      // callback para notificação de transações pendentes
      console.warn('handlePendingPayments', response.details.administrativeCodes, response)
    }

    const init = () => {
      ipcRenderer.send('log-internal', {
        type: 'info',
        str: 'Starting Cappta authentication...'
      })
      if (process.env.NODE_ENV === 'development') {
        console.log('ATTENTION! This app is NOT connected on a pinpad! This is allow only in development mode')
        this.capptaIsAuth = true
      } else {
        const authenticate = get(window, 'CapptaCheckout.authenticate', null)
        if (!isEmpty(this.capptaConfig) && isFunction(authenticate)) {
          ipcRenderer.send('log-internal', {
            type: 'info',
            str: 'Trying authenticate with Cappta Checkout...'
          })
          this.checkout = window.CapptaCheckout.authenticate(
            this.capptaConfig,
            success,
            error,
            handlePendingPayments
          )
        } else {
          if (this.connectionTries < 4) {
            this.connectionTries = this.connectionTries + 1
          }
          setTimeout(init, 200)
        }
      }
    }
    init()
  })

  startPaymentTransition = () => {
    const complete = () => {
      ipcRenderer.send('log-internal', {
        type: 'info',
        str: 'End of Cappta payment session...'
      })
    }

    ipcRenderer.send('log-internal', {
      type: 'info',
      str: 'Starting Cappta payment session...'
    })
    this.checkout.startMultiplePayments(2, complete) // 1 multi payment
  }

  @action
  debitPayment = (configs) => {
    const { amount } = configs

    try {
      if (this.checkout) {
        this.startPaymentTransition()
        this.checkout.debitPayment(
          { amount },
          cappta => this.paymentSuccess(cappta, configs),
          cappta => this.paymentError(cappta, configs)
        )
      } else {
        throw new Error('Não é possível realizar pagamentos sem estar autenticado pela Cappta.')
      }
    } catch (e) {
      throw e
    }
  }

  @action
  creditPayment = (configs) => {
    const {
      amount,
      installments = 1, // Numero de parcelas
      installmentType = 2, // Parcelamento Lojista
      // por enquanto está fixo o parcelamento por conta do estabelecimento,
      // o tipo 1 é quando o parcelamento é por conta da administradora,
    } = configs

    try {
      if (this.checkout) {
        this.startPaymentTransition()
        this.checkout.creditPayment(
          {
            amount,
            installments,
            installmentType
          },
          cappta => this.paymentSuccess(cappta, configs),
          cappta => this.paymentError(cappta, configs)
        )
      } else {
        throw new Error('Não é possível realizar pagamentos sem estar autenticado pela Cappta.')
      }
    } catch (e) {
      throw e
    }
  }

  @action
  discoverBrand = (configs) => {
    const {
      // cardNumber,
      payConditions,
      cardBrandCode
    } = configs

    return find(payConditions, (item) => {
      let acceptedBrands = get(item, 'cardSettings.brand.cardBrandCode', [])
      acceptedBrands = acceptedBrands.split(',')
      return find(acceptedBrands, brand => toString(brand) === toString(cardBrandCode))
    })
  }

  async paymentSuccess(cappta, configs) {
    const {
      currentTitle,
      payConditions,
      onSuccess,
      condition,
      pdv
    } = configs

    const {
      administrativeCode,
      // customerCardPan,
      uniqueSequentialNumber,
      acquirerAuthorizationCode,
      cardBrandCode
    } = cappta

    this.processingPayment = true

    ipcRenderer.send('log-internal', {
      type: 'info',
      str: `Cappta payment was successful: ${ JSON.stringify(cappta) }`
    })

    // console.warn('current title', currentTitle)
    // console.warn('cappta response', cappta)

    const currentBrand = this.discoverBrand({
      // cardNumber: customerCardPan,
      payConditions,
      cardBrandCode
    })

    if (isEmpty(currentBrand)) {
      ipcRenderer.send('log-internal', {
        type: 'error',
        str: `BRAND WASN'T ACCEPTED BY SYSTEM: ${ cardBrandCode }`
      })
    }

    // console.warn('condition', condition)

    const data = {
      cardData: {
        'brand': get(currentBrand, 'cardSettings.brand.id')
      },
      financialReceivableTitleId: get(currentTitle, 'id'),
      financialReceivableTitle: get(currentTitle, 'hash'),
      financialCollectionTypeId: get(currentBrand, 'cardSettings.financialCollectionTypeId'),
      paymentConditionId: get(condition, 'id'),
      presential: true,
      presentialData: {
        pdv,
        administrativeCode,
        hash: md5(`${ administrativeCode }${ acquirerAuthorizationCode }${ uniqueSequentialNumber }${ moment().format('DDMMYYYY') }`),
        authorizationCode: acquirerAuthorizationCode,
        nsu: uniqueSequentialNumber,
        feedbackData: JSON.stringify(cappta),
      },
      detailedValue: {
        amount: get(currentTitle, 'titleAmount'),
        interestAmount: get(currentTitle, 'interestAmount'),
        fineAmount: get(currentTitle, 'fineAmount'),
        discountAmount: 0
      }
    }

    try {
      const body = await postPresentialPayment({ data })

      ipcRenderer.send('log-internal', {
        type: 'info',
        str: `Api receipted the payment: ${ JSON.stringify(body) }`
      })

      this.checkout.confirmPayments()

      if (isFunction(onSuccess)) {
        this.processingPayment = false
        onSuccess(cappta)

        ipcRenderer.send('log-internal', {
          type: 'info',
          str: 'End of the payment process'
        })
      }
    } catch (e) {
      // console.error('api could not accept payment', e, get(e, 'body'))
      ipcRenderer.send('log-internal', {
        type: 'error',
        str: `API could not accept the payment: ${ get(e, 'body') }`
      })
      this.processingPayment = false
      await this.paymentError(cappta, configs, e)
    }
  }

  async paymentError(cappta, configs, e) {
    const { onError } = configs

    ipcRenderer.send('log-internal', {
      type: 'warn',
      str: 'undoing payment'
    })

    try {
      this.checkout.undoPayments()
    } catch (err) {
      ipcRenderer.send('log-internal', {
        type: 'error',
        str: `error on Cappta undo payment: ${ err }`
      })
    }

    if (isFunction(onError)) {
      const apiError = get(first(get(e, 'messages', [])), 'message')
      const error = apiError || get(cappta, 'reason', '')

      ipcRenderer.send('log-internal', {
        type: 'error',
        str: `Error to show on UI: ${ error }`
      })

      onError(error)
    }
  }

  reversePayment = cappta => new Promise((resolve, reject) => {
    const {
      administrativePassword,
      administrativeCode
    } = cappta

    this.checkout.paymentReversal(
      {
        administrativePassword,
        administrativeCode
      },
      resolve,
      reject
    )
  })

  @computed
  get getCapptaConfig() {
    return this.capptaConfig
  }

  @computed
  get capptaIsAuthenticated() {
    return this.capptaIsAuth
  }

  @computed
  get processing() {
    return this.processingPayment
  }

  @computed
  get getConnectionTries() {
    return this.connectionTries
  }
}

const hydrate = create({})
const store = new CardPaymentPresentialStore()
hydrate('CardPaymentPresentialStore', store)
  .then(() => console.log('CardPaymentPresentialStore has been hydrated'))

export default store
