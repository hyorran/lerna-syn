import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postJudgements(controls) {
  try {
    const { body } = await post({
      endpoint: 'Lawsuit/Judgements',
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

async function putJudgements(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `Lawsuit/Judgements/${ id }`,
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

async function deleteJudgements({ id }) {
  try {
    const { body } = await del({
      endpoint: `Lawsuit/Judgements/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getJudgements({ id }) {
  try {
    const { body } = await get({
      endpoint: `Lawsuit/Judgements/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getJudgementsForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/Judgements/GetJudgementsForSelect'
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
  postJudgements,
  putJudgements,
  deleteJudgements,
  getJudgements,
  getJudgementsForSelect
}
