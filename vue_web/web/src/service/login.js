import axios from './axios';
import VueCookies from 'vue-cookies';

export async function testLogin(){
    
    try{
        const token = await axios.post('/testLogin');
        VueCookies.set('accessToken', token.data.data.token, '60s' );
        VueCookies.set('refreshToken', token.data.data.refresh_token, '30d' );
        axios.defaults.headers['refreshToken'] = VueCookies.get('refreshToken');
        return token;
    }catch(err){
        return err;
    }
}

export async function refreshToken(){
    try{
        console.log(this.$store);
        // this.$store.commit('checkToken');
        // return '1';
        const token = await axios.post('/testRefreshToken');
        VueCookies.set('accessToken', token.data.data.token, '60s' );
        return token;
    }catch(err){
        return err;
    }
}