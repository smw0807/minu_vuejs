<template lang="">
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Click me" color="primary" @click="persistent = true" />

    <q-dialog v-model="persistent" persistent full-width transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white">
        <q-card-section>
          <div class="text-h6">로그인</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-page class=" row justify-center items-center">
            <div class="column">
              <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                  <q-card-section>
                    <q-form class="q-gutter-md">
                      <q-input square filled clearable v-model="email" type="email" label="email" />
                      <q-input square filled clearable v-model="password" type="password" label="password" />
                    </q-form>
                  </q-card-section>
                  <q-card-actions class="q-px-md">
                    <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" />
                  </q-card-actions>
                  <q-card-section class="text-center q-pa-none">
                    <p class="text-grey-6">Not reigistered? Created an Account</p>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-page>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    return {
      persistent: ref(false),
      email: ref('admin'),
      password: ref('aaaa'),
    }
  }
}
</script>
<style lang="">
  
</style>