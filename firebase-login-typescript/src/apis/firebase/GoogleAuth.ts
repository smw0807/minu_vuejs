import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { app } from '.';

export class GoogleAuthAPI {
  private auth: Auth;
  private provider: GoogleAuthProvider;
  constructor() {
    this.auth = getAuth(app);
    this.provider = new GoogleAuthProvider();
  }

  //현재 로그인 중인 유저 정보
  get nowUser(): User | null {
    return this.auth.currentUser;
  }

  //로그아웃
  signIn(): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = await signInWithPopup(this.auth, this.provider);
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  //로그아웃
  signOut(): void {
    signOut(this.auth);
  }
}
