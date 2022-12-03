import type { Methods as Methods0 } from './openapi/items'
import type { Methods as Methods1 } from './openapi/status'
import type { AspidaClient, BasicHeaders } from 'aspida'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/openapi/items'
  const PATH1 = '/openapi/status'
  const GET = 'GET'

  return {
    openapi: {
      items: {
        /**
         * @returns Return all items.
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods0['get']['resBody'],
            BasicHeaders,
            Methods0['get']['status']
          >(prefix, PATH0, GET, option).json(),
        /**
         * @returns Return all items.
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
      status: {
        /**
         * @returns The service status.
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, PATH1, GET, option).json(),
        /**
         * @returns The service status.
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, PATH1, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
