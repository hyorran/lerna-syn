import {
  post,
  put,
  del,
  get
} from '@syntesis/s-csharp-microservices'

async function postLawsuitStages(controls) {
  try {
    const { body } = await post({
      endpoint: 'lawsuit/LawsuitStages',
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

async function putLawsuitStages(controls) {
  try {
    const { id } = controls
    const { body } = await put({
      endpoint: `lawsuit/LawsuitStages/${ id }`,
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

async function deleteLawsuitStages({ id }) {
  try {
    const { body } = await del({
      endpoint: `lawsuit/LawsuitStages/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitStages({ id }) {
  try {
    const { body } = await get({
      endpoint: `lawsuit/LawsuitStages/${ id }`
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitStagesForSelect() {
  try {
    const { body } = await get({
      endpoint: 'Lawsuit/LawsuitStages/GetLawsuitStagesForSelect',
    })

    if (!body.success) {
      throw body
    }

    return body

  } catch (e) {
    throw e
  }
}

async function getLawsuitStagesConfigurationControls() {
  try {
    const { body } = await get({
      endpoint: 'lawsuit/lawsuitstages/parameters'
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
  postLawsuitStages,
  putLawsuitStages,
  deleteLawsuitStages,
  getLawsuitStages,
  getLawsuitStagesForSelect,
  getLawsuitStagesConfigurationControls
}
