import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export type UserRegistrationResult = {
  user?: User
  token?: AccessToken
}
