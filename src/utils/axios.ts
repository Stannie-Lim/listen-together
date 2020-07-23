import axios from 'axios'
import { AsyncStorage } from 'react-native';
import { API_URL } from '../../secrets';

export const getJwt = (): Promise<string | null> => {
  return AsyncStorage.getItem('accessToken')
}

export const getUserId = (): Promise<string | null> => {
  return AsyncStorage.getItem('userId');
}

export const setJwt = async (jwt: string) => {
  await AsyncStorage.setItem('accessToken', jwt)
}

export const setUserId = async (userId: string) => {
  await AsyncStorage.setItem('userId', userId);
}

export const removeJwt = async () => {
  await AsyncStorage.removeItem('accessToken')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AxiosHttpRequest = async (method: string, url: string, data?: object | undefined) => {
  switch (method) {
    case 'GET':
      return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${await getJwt()}`
        }
      })
    case 'POST':
      return axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${await getJwt()}`,
        }
      })
    case 'DELETE':
      return axios.delete(url,
        {
          headers: {
            'Authorization': `Bearer ${await getJwt()}`
          },
          data
        })
    case 'PUT':
      return axios.put(url, data,
        {
          headers: {
            'Authorization': `Bearer ${await getJwt()}`
          }
        })
    default:
      alert('Not a valid method');
      break;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = (setUser: any): void => {
  AxiosHttpRequest('GET', `${API_URL}/auth/me`)
    .then((response) => {
      setUser(response?.data)
    })
    .catch(ex => {
      console.log(ex)
    })
}