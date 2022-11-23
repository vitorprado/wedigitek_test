import { AxiosRequestConfig, AxiosResponse } from "axios";

export const logHttpRequest = (config: AxiosRequestConfig) => {
  const headers = {
    ...config.headers.common,
    ...config.headers[config.method],
    ...config.headers
  };

  ['common','get', 'post', 'head', 'put', 'patch', 'delete'].forEach(header => {
    delete headers[header]
  })

  const printable = `${new Date()} | Host: ${config.baseURL} | Request: ${config.method?.toUpperCase()} | ${config.url} | ${ JSON.stringify(config.data) } | ${ JSON.stringify(headers)}`
  console.log(printable)

  return config;
}

export const logHttpResponse = (response: AxiosResponse) => {
  const printable = `${new Date()} | Response: ${response.status} | ${ JSON.stringify(response.data) }`
  console.log(printable)

  return response;
}
