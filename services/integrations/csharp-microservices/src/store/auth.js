import { observable, computed, action } from 'mobx/lib/mobx'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import serialize from '@syntesis/c-functions/src/serialize'
import moment from 'moment/moment'
import md5 from 'md5'
import { post } from '../index'
import jwt from 'jwt-decode'

class Auth {
  constructor() {
    this.mockLogin = this.mockLogin.bind(this)
    this.login = this.login.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
    this.authRequest = this.authRequest.bind(this)
  }

  static mobxLoggerConfig = {
    methods: {
      hasExpired: false
    }
  }

  @observable
  host = ''

  guest = {
    accessToken: null,
    refreshToken: null,
    expiresAt: null
  }

  @observable
  done = false

  @observable
  auth = { ...this.guest }

  @action
  saveHost = (host) => {
    this.host = host
  }

  @action
  finishLoad = () => {
    this.done = true
  }

  @action
  saveTokens = ({ accessToken, refreshToken, expiresIn }) => {
    // forçamos que o momento de expiracao seja 5 minutos antes do periodo que a API informa
    // ou, caso o valor vindo da API seja menor do que 5 minutos, usamos esse valor como referencia
    const interval = Math.min(Math.abs(expiresIn - 300), expiresIn)
    const expiresAt = moment().add(interval, 'seconds').format('L LTS')

    this.auth = {
      ...this.auth,
      accessToken,
      refreshToken,
      expiresAt
    }
  }

  @action
  mockAuth = () => {
    this.saveTokens({
      accessToken: 'qualquer',
      refreshToken: 'coisa',
      expiresIn: 3600
    })
  }

  @action
  async mockLogin(force = false) {
    /*
    * caso estejamos em ambiente de desenvolvimento
    * autenticamos com usuario, senha e syndata definidos no env
    * */
    if (process.env.NODE_ENV === 'development' || force) {
      console.log('ATTENTION!! Your login was injected from .env definitions')
      this.saveHost(process.env.REACT_APP_SYSTEM_PATH)

      if (!this.isAuthenticated) {
        await this.login({
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD,
          syndata: process.env.REACT_APP_SYNDATA
        })
      }
      if (this.hasExpired()) {
        await this.refreshToken()
      }
      this.finishLoad()
    }
  }

  @action
  async loginPortal(credentials = {}) {
    try {
      const { cpf, syndata } = credentials
      if (!cpf || !syndata) {
        throw new Error('login action need an CPF or CNPJ')
      } else {

        const data = {
          mode: 'portal',
          grant_type: 'password',
          scope: 'syngw synpaygw offline_access',
          password: md5(`portal${ moment().format('YYYYMMDD') }`),
          username: 'portal',
          cpf,
          syndata
        }
        await this.authRequest({ data })
      }
    } catch (e) {
      throw e
    }
  }

  @action
  async login(credentials = {}) {
    try {
      const { username, password, syndata } = credentials
      if (!username || !password || !syndata) {
        throw new Error('login action need an Username, Password and Syndata')
      } else {

        const data = {
          grant_type: 'password',
          scope: 'syngw synpaygw offline_access',
          username,
          password,
          syndata
        }
        await this.authRequest({ data })
      }
    } catch (e) {
      throw e
    }
  }

  @action
  async refreshToken() {
    try {
      const data = {
        grant_type: 'refresh_token',
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
        refresh_token: this.auth.refreshToken
      }
      await this.authRequest({
        data
      })
    } catch (e) {
      throw e
    }
  }

  async authRequest({ data = {} }) {
    data = {
      ...data,
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET
    }

    const response = await post({
      endpoint: 'connect/token',
      apiVersion: false,
      port: 45700,
      guest: true, // significa que nao precisa enviar o accessToken nessa rota
      data: serialize(data, { clean: true }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const {
      body: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn
      }
    } = response

    this.saveTokens({
      accessToken,
      refreshToken,
      expiresIn
    })
  }

  @action
  logout = () => {
    this.auth = { ...this.guest }
  }

  @action
  hasExpired = () => {
    if (isEmpty(this.auth.expiresAt)) {
      return true
    }
    const now = moment()
    const expiresAt = moment(this.auth.expiresAt, 'L LTS')
    // console.warn('now', now.format('L LTS'))
    // console.warn('expiresAt', expiresAt.format('L LTS'))
    // console.warn('hasExpired', now.isSameOrAfter(expiresAt))
    return now.isSameOrAfter(expiresAt)
  }

  @computed
  get token() {
    return this.auth.accessToken
  }

  @computed
  get getHost() {
    return this.host
  }

  @computed
  get isAuthenticated() {
    return !isEmpty(this.auth.accessToken)
  }

  @computed
  get getPersonName() {
    const keys = jwt(this.auth.accessToken)
    return get(keys, 'personname')
  }

  @computed
  get getPersonEmail() {
    const keys = jwt(this.auth.accessToken)
    return get(keys, 'personemail', '')
  }
}

const store = new Auth()

export default store
