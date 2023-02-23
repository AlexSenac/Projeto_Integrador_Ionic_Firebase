import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';

import { AuthModel } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register(credential: AuthModel): Promise<UserCredential | null> {
    console.log(credential);

    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    )
      .then((credential: UserCredential) => credential)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async signIn(credential: AuthModel): Promise<UserCredential | null> {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    )
      .then((user: UserCredential) => user)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async updateProfile(displayName: string): Promise<void> {
    return updateProfile(this.auth.currentUser!, { displayName: displayName });
  }

  async signOut(): Promise<void> {
    return signOut(this.auth);
  }
}
