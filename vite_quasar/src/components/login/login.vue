<template lang="">
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Click me" color="primary" @click="open()" />

    <q-dialog v-model="isLoginPop" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white">
        <q-card-section>
          <div class="text-h6">Please login...</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column">
            <div class="row justify-center items-center">
              <q-card square bordered class="q-pa-lg shadow-1">
                <q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input square filled clearable v-model="user_id" type="text" label="ID" />
                    <q-input square filled clearable v-model="user_pw" type="password" label="password" />
                  </q-form>
                </q-card-section>
                <q-card-actions class="q-px-md">
                  <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" @click="login" />
                </q-card-actions>
                <!-- <q-card-section class="text-center q-pa-none">
                  <p class="text-grey-6">Not reigistered? Created an Account</p>
                </q-card-section> -->
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" v-close-popup />
          <!-- <q-btn flat label="Close" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    let isLoginPop = ref(false);
    const user_id = ref('admin');
    const user_pw = ref('aaaa');
    const store = useStore();
    const isLogin = store.getters['auth/isLogin'];
    console.log('isLogin : ', isLogin);
    //@@ 로그인 팝업 오픈
    const open = () => {
      isLoginPop.value = true;
    }

    //@@ 로그인 처리
    const login = async () => {
      // isLoginPop = ref(false); // <- 이건 왜 안닫히는 걸까?? 차이점을 이해를 못하겠다.
      const rs = await store.dispatch('auth/login', {
        user_id: user_id.value,
        user_pw: user_pw.value
      })
      console.log(rs);
      isLoginPop.value = !rs;
    }

    return {
      isLoginPop,
      user_id,
      user_pw,
      open, //팝업 오픈
      login
    }
  }
}
</script>
<style lang="">
  
</style>