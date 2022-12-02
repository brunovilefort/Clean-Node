import { EmailValidator } from '@/application/contracts'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
