import { User } from './user-details';

export class RegisterUser {
  constructor(
    private username: string,
    private email: string,
    private isAdmin: boolean,
    private password: string
  ) {}
}
