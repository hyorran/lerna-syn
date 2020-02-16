import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import environment from '../environments/environments'

const api = axios.create({
  baseURL: environment.BASE_URL,
});

class Service {
  constructor() {
    this.login = this.login.bind(this)
    this.setToken = this.setToken.bind(this)
    this.getHeaders = this.getHeaders.bind(this)
    this.get = this.get.bind(this)
  }

  async setToken(token) {
    await AsyncStorage.setItem('@appclient:token', JSON.stringify(token));
  }

  async getToken() {
    return await AsyncStorage.getItem('@appclient:token')
  }

  async getHeaders() {
    const token = await AsyncStorage.getItem('@appclient:token')
    return {
      headers: {
        'Authorization': `Bearer ${ JSON.parse(token).access_token }`,
        'verify-token': environment.VERIFY_TOKEN,
      }
    }
  }

  async updateToken() {
    const userToken = await AsyncStorage.getItem('@appclient:token');
    const configs = {
      url: 'api/registration_id',
      params: {
        registration_id: userToken,
        registration_id_type: 'APP_CLIENT_ANDROID'
      }
    }
    const response = await this.post(configs)
    await this.setToken(response.data)
    console.log(response.data)
  }

  async postHeaders() {
    const aux = await this.getHeaders()
    return {
      headers: {
        ...aux.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
      }
    }
  }

  async login(username, password) {
    try {
      return await api.get('portal_authentication', {
        params: {
          username,
          password,
          verify_token: environment.VERIFY_TOKEN,
          client_id: environment.CLIENT_ID,
          client_secret: environment.CLIENT_SECRET,
          grant_type: environment.GRANT_TYPE
        },
      })
        .then(response => response)
        .then((responseData) => {
          this.setToken(responseData.data)
          return responseData
        })
    } catch (error) {
      return null
    }
  }

  async get(configs) {
    const aux = await this.getHeaders();
    const {
      params, headers, data, url
    } = configs
    try {
      return await api.get(url, {
        params,
        headers: Object.assign(aux.headers, headers),
        data
      })
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      return null
    }
  }

  async post(configs) {
    const aux = await this.postHeaders();
    const {
      params, headers, url
    } = configs

    const urlEncoded = await this.transformToUrlEncoded(params)

    try {
      return await fetch(`http://d12.synsuite.com.br/${ url }`, {
        method: 'POST',
        headers: Object.assign(aux.headers, headers),
        body: urlEncoded
      }).then(response => response.json())
        .then(responseData => responseData)
    } catch (error) {
      return null
    }
  }

  async forgotPassword(username) {
    return username
  }

  async transformToUrlEncoded(params) {
    let formBody = [];

    for (const property in params) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(params[property]);
      formBody.push(`${ encodedKey }=${ encodedValue }`);
    }

    formBody = formBody.join('&');
    return formBody
  }
}

const store = new Service()

export default store;
