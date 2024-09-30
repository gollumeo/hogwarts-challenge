import { AuthenticatorContract } from "#contracts/authenticator_contract";
import { UserRegistrationResult } from "#types/auth";
import { UserRegistrationData } from "#types/user";

export class Authenticator implements AuthenticatorContract {
  registerUser(
    userData: UserRegistrationData,
  ): Promise<UserRegistrationResult> {
    throw new Error("Method not implemented.");
  }
  login(): void {
    throw new Error("Method not implemented.");
  }
}
