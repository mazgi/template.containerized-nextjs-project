export type Status = {
  message: string
  version: string
}

export class StatusService {
  getStatus(): Status {
    return {
      message: 'ok (bff)',
      version: '0.1.2',
    }
  }
}
