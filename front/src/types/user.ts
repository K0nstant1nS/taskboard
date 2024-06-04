export type TLoginData = {
  email: string;
  password: string;
}

export type TRegistrationData = TLoginData & {
  name: string
}
