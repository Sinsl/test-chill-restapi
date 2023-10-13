export interface ButtonPanelProps {
  clickButton: (action: string) => void
}

export interface DataUserAuth  {
  email: string,
  password: string
}

export interface FormsAuthProps {
  onLogin(data: DataUserAuth): void,
  onRegister(data: DataUserAuth): void
}

export interface headersRequest {
  'Accept'?: string | undefined,
  'Content-Type'?: string | undefined,
  Authorization?: string
}

export interface optionRequest {
  method: string,
  headers? : HeadersInit,
  body?: BodyInit | undefined
}

export interface UserToken {
  id: string,
  email: string
}

export interface TokenParse {
  iat: number,
  user: UserToken
}