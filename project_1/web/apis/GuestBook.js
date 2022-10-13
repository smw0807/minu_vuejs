/**
 * 고민
 * axios 요청만 딱 하고 결과를 통으로 반환하는게 좋을까?
 * promise화 시켜서 요청 및 결과를 가공해서 resolve나 reject로 반환 시키는게 좋을까?
 * 우선은 후자로 작성함
 */
const defURL = '/api/mongo/user';
const url = {
  list: defURL,
  insert: defURL + 'insert',
};
export class GuestBookAPI {
  constructor(axios) {
    this.axios = axios;
  }
  list() {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.axios.get(url.list);
        if (rs.data.ok && rs.status === 200) {
          resolve(rs.data.result);
        } else {
          reject(rs.data);
        }
      } catch (err) {
        console.error('GuestBook list Error : ', err);
        reject(err.message);
      }
    });
  }
  insert(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.axios.post(url.insert, params);
        console.log(rs);
        resolve(true);
      } catch (err) {
        console.error('GuestBook insert Error : ', err);
        reject(err.message);
      }
    });
  }
}
