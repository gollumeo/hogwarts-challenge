import { Authenticator } from '#services/authenticator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async register({ request, response }: HttpContext): Promise<any> {
    return Authenticator
  }
}
