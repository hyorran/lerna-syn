import {
  get,
  post
} from '@syntesis/s-csharp-microservices'
import getLodash from 'lodash/get'

async function getCobillingLocals() {
  try {
    const { body } = await get({
      endpoint: 'financial/cobilling/getplaces',
      data: {
        customer: false
      },
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getCobillingCustomers() {
  try {
    const { body } = await get({
      endpoint: 'financial/cobilling/getplaces',
      data: {
        customer: true
      },
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLastUpdate() {
  try {
    const { body } = await get({
      endpoint: 'financial/cobilling/getlastupdate'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function postTransferBetweenAccounts(controls) {
  try {
    const { body } = await post({
      endpoint: 'Financial/Cobilling/TransferBetweenAccounts',
      data: controls
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getCoBillingParameters({ companyPlaceId }) {
  try {
    const { body } = await get({
      endpoint: 'financial/cobilling/getcobillingparameters',
      data: {
        companyPlaceId
      },
      serializeConfig: {
        clean: true
      },
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function postIssueInvoice(controls) {
  try {
    const { body } = await post({
      endpoint: 'financial/cobilling/issueinvoice',
      data: controls,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function postGenerateFinancialReceivableTitles(controls) {
  try {
    const { body } = await post({
      endpoint: 'financial/cobilling/generatefinancialreceivabletitles',
      data: controls,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function postIssue(controls) {
  try {
    const { response } = await postIssueInvoice(controls)
    const body = await postGenerateFinancialReceivableTitles({
      invoiceNoteId: response,
      paymentConditionId: getLodash(controls, 'paymentConditionId'),
      companyPlaceId: getLodash(controls, 'cobillingPlaceId')
    })
    return body
  } catch (e) {
    throw e
  }
}

async function getVerifyCobillingPlaceParameters(controls) {
  try {
    const { body } = await get({
      endpoint: 'financial/cobilling/verifycobillingplaceparameters',
      data: controls,
      showSnackbarProcessing: true
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getFinancersNaturesForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Financial/CoBilling/GetFinancersNaturesForSelect'
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

export {
  getCobillingLocals,
  getCobillingCustomers,
  getLastUpdate,
  getCoBillingParameters,
  postTransferBetweenAccounts,
  postIssue,
  getVerifyCobillingPlaceParameters,
  getFinancersNaturesForSelect
}
