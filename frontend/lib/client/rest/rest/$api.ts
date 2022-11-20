import type { Methods as Methods0 } from './status'
import type { AspidaClient, BasicHeaders } from 'aspida'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/rest/status'
  const GET = 'GET'

  return {
    status: {
      /**
       * @returns The service status.
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods0['get']['resBody'],
          BasicHeaders,
          Methods0['get']['status']
        >(prefix, PATH0, GET, option).json(),
      /**
       * @returns The service status.
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods0['get']['resBody'],
          BasicHeaders,
          Methods0['get']['status']
        >(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
