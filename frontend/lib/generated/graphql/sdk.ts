import { GraphQLClient } from 'graphql-request'
import { ClientError } from 'graphql-request/dist/types'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
import useSWR, {
  SWRConfiguration as SWRConfigInterface,
  Key as SWRKeyInterface,
} from 'swr'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: 'Query'
  status: Status
}

export enum State {
  Healthy = 'healthy',
  Unhealthy = 'unhealthy',
}

export type Status = {
  __typename?: 'Status'
  /** The service name of BFF */
  name: Scalars['String']
  /** The state of BFF */
  state: State
  /** The semantic version of BFF */
  version: Scalars['String']
}

export type StatusQueryQueryVariables = Exact<{ [key: string]: never }>

export type StatusQueryQuery = {
  __typename?: 'Query'
  status: { __typename?: 'Status'; name: string; state: State; version: string }
}

export const StatusQueryDocument = gql`
  query statusQuery {
    status {
      name
      state
      version
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    statusQuery(
      variables?: StatusQueryQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<StatusQueryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<StatusQueryQuery>(StatusQueryDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'statusQuery',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
export function getSdkWithHooks(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  const sdk = getSdk(client, withWrapper)
  return {
    ...sdk,
    useStatusQuery(
      key: SWRKeyInterface,
      variables?: StatusQueryQueryVariables,
      config?: SWRConfigInterface<StatusQueryQuery, ClientError>
    ) {
      return useSWR<StatusQueryQuery, ClientError>(
        key,
        () => sdk.statusQuery(variables),
        config
      )
    },
  }
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>
