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
                  <q-form class="q-gutter-md">
                    <q-input square filled clearable v-model="user_id" type="text" label="ID" />
                    <q-input square filled clearable v-model="user_pw" type="password" label="password" />
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
    const user_id = ref('test');
    const user_pw = ref('aaaa');
    const store = useStore();

    //@@ 로그인 필요 여부
    const needLogin = computed(() => {
      return store.getters['auth/needLogin'];
    })

    //@@ 로그인 처리
    const login = async () => {
      try {
        const rs = await store.dispatch('auth/login', {
          user_id: user_id.value,
          user_pw: user_pw.value
        })
        alert(rs);
      } catch (err) {
        alert(err);
      }
    }

    return {
      needLogin,
      user_id,
      user_pw,
      login
    }
  }
}
</script>
<style lang="">
  
</style>