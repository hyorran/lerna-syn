import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postPaymentMethod(controls) {
  try {
    const { body } = await post({
      endpoint: 'Financial/PaymentForms',
      data: controls
    })

    return body

  } catch (e) {
    throw e
  }
}

async function putPaymentMethod(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Financial/PaymentForms/${ id }`,
      data: controls
    })

    return body

  } catch (e) {
    throw e
  }
}

async function deletePaymentMethod({ id }) {
  try {
    const { body } = await del({
      endpoint: `Financial/PaymentForms/${ id }`
    })

    return body

  } catch (e) {
    throw e
  }
}

async function getPaymentMethod({ id }) {
  try {
    const { body } = await get({
      endpoint: `Financial/PaymentForms/${ id }`
    })

    return body

  } catch (e) {
    throw e
  }
}

export {
  postPaymentMethod,
  putPaymentMethod,
  deletePaymentMethod,
  getPaymentMethod
}
