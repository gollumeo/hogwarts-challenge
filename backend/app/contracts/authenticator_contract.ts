import { UserRegistrationData } from '#types/user'
import { UserRegistrationResult } from '#types/auth'

export interface AuthenticatorContract {
  registerUser(userData: UserRegistrationData): Promise<UserRegistrationResult>
  login(): void
}
