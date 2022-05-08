<template lang="">
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="needLogin" persistent transition-show="scale" transition-hide="scale">

      <q-card class="bg-teal text-white">

        <q-card-section>
          <div class="text-h6">Please login...</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column">
            <div class="row justify-center items-center">
              <q-card square bordered class="q-pa-lg shadow-1">
                <q-card-section>
                  <q-form ref="loginForm" class="q-gutter-md">
                    <q-input square filled clearable v-model="user_id" :rules="[user_id_rules]" type="text" label="ID" />
                    <q-input square filled clearable v-model="user_pw" :rules="[user_pw_rules]" type="password" label="password" />
                  </q-form>
                </q-card-section>
                <q-card-actions class="q-px-md">
                  <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" @click="login" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-card-section>

      </q-card>

    </q-dialog>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const user_id = ref('');
    const user_pw = ref('');
    const loginForm = ref(null);
    const store = useStore();

    //@@ 로그인 필요 여부
    const needLogin = computed(() => {
      return store.getters['auth/needLogin'];
    })
    const user_id_rules = (v) => {
      if (!v) {
        return '아이디를 입력해주세요.';
      }
      const kor = v.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g);
      if (kor) {
        return '한글은 입력할 수 없습니다.'
      }
      const special = v.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g);
      if (special) {
        return '특수문자는 입력할 수 없습니다.'
      }
      return true;
    }
    const user_pw_rules = (v) => {
      if(!v) {
        return '패스워드를 입력해주세요.';
      }
      return true;
    }

    //@@ 로그인 처리
    const login = async () => {
      try {
        const valid = await loginForm.value.validate();
        if(valid) {
          const rs = await store.dispatch('auth/login', {
            user_id: user_id.value,
            user_pw: user_pw.value
          })
          alert(rs);
        }
      } catch (err) {
        alert(err);
      }
    }

    return {
      needLogin,
      loginForm,
      user_id,
      user_pw,
      login,
      user_id_rules,
      user_pw_rules
    }
  }
}
</script>
<style lang="">
  
</style>