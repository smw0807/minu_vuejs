import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
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

  //로그인 유저 정보(웹페이지 새로고침시엔 이걸 써야 정보를 가져옴)
  reloadUser(): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      try {
        //async/await 방식으로 사용하는 방법을 못찾겠음.
        onAuthStateChanged(this.auth, user => {
          resolve(user);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //로그인
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
