/* eslint-disable */
export type Status = {
  /** The service name of BFF */
  name: string
  /** The state of BFF */
  state: 'healthy' | 'unhealthy'
  /** The semantic version of BFF */
  version: string
}