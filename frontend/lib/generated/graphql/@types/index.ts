export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Item = {
  __typename?: 'Item'
  /** The unique ID of the Item */
  id: Scalars['ID']
  /** Any text. */
  text: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  items: Array<Item>
  status: Status
}

export enum State {
  Healthy = 'healthy',
  Unhealthy = 'unhealthy',
}

export type Status = {
  __typename?: 'Status'
  /** The service environment of BFF */
  environment: Scalars['String']
  /** The service name of BFF */
  name: Scalars['String']
  /** The state of BFF */
  state: State
  /** The semantic version of BFF */
  version: Scalars['String']
}
