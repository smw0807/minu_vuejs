import { store } from '../store/store';

export async function refresh(){
    try{
        console.log("!!!!!!");
        let token = await store.dispatch('refreshToken');
        coinsole.log(token);
        return token;
    }catch(err){
        return err;
    }
}