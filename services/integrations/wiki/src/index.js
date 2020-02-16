import { get as getHttp } from '@syntesis/s-http'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import split from 'lodash/fp/split'
import join from 'lodash/fp/join'
import serialize from '@syntesis/c-functions/src/serialize'

const url = 'https://wiki.syntesis.com.br'

async function getWikiUrlPage({ pageId }) {
  try {

    const queryData = {
      action: 'query',
      format: 'json',
      prop: 'info',
      iwurl: 1,
      pageids: pageId,
      utf8: 1,
      inprop: 'url',
      origin: '*'
    }

    const { body } = await getHttp({
      endpoint: `${ url }/api.php?${ serialize(queryData, { clean: true }) }`,
      headers: false
    })

    const wikiUrlPage = flow(
      get('query'),
      get('pages'),
      get(pageId),
      get('canonicalurl')
    )(body)

    return { wikiUrlPage }

  } catch (e) {
    throw e
  }
}

async function getWikiSummaryPage({ pageId }) {
  try {

    const parseData = {
      action: 'parse',
      format: 'json',
      pageid: pageId,
      prop: 'sections|text',
      section: '1',
      disablelimitreport: 1,
      disableeditsection: 1,
      preview: 1,
      sectionpreview: 1,
      disabletoc: 1,
      contentformat: 'application/json',
      utf8: 1,
      origin: '*'
    }

    const { body } = await getHttp({
      endpoint: `${ url }/api.php?${ serialize(parseData, { clean: true }) }`,
      headers: false
    })

    const wikiSummaryPage = flow(
      get('parse'),
      get('text'),
      get('*'),
      split('src="/'), // fix image src
      join(`src="${ url }/`) // fix image src
    )(body)

    return { wikiSummaryPage }
  } catch (e) {
    throw e
  }
}

export {
  getWikiUrlPage,
  getWikiSummaryPage
}
