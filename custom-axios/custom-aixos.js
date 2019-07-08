import Axios from 'axios';
import { transformToCamelCaseKeys, transformToUnderscoreKeys } from 'utils/index';
import { AuthService } from 'services/auth-service';
import  { createAuthRefreshInterceptor } from './jwt-interceptor';

export const axios = Axios.create({
  timeout: 60000,
  transformRequest: [
    (data, headers) => { 
      if (headers['Content-Type'] !== 'application/json') {
        return data;
      }
      if (data === null || data === undefined) return data;
      let toTransferData = data;
      if (typeof data === 'string') {
        toTransferData = JSON.parse(data);
      }
      const transformedData = transformToUnderscoreKeys(toTransferData);
      return JSON.stringify(transformedData);
    },
  ],
  transformResponse: [
    (data) => { 
      if (data === null || data === undefined) return data;
      let toTransferData = data;
      if (typeof data === 'string') {
        toTransferData = JSON.parse(data);
      }
      const transformedData = transformToCamelCaseKeys(toTransferData);
      return transformedData;
    },
  ],
});

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

axios.interceptors.request.use(request => {
  const accessToken = getAccessToken();
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
});

async function refreshAuthLogic(failedRequest) {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    const refreshResult = await AuthService.refreshAccessToken(refreshToken);
    if (refreshResult.ok) {
      failedRequest.response.config.headers['Authorization'] = `Bearer ${refreshResult.data.access}`;
      localStorage.setItem('accessToken', refreshResult.data.access);
      return;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error('Token Refresh Failed');
    }
  } else {
    throw new Error('Token Refresh Failed');
  }
}

createAuthRefreshInterceptor(axios, refreshAuthLogic);
