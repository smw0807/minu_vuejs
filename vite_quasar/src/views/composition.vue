<script>
import ApiSetup from '../components/composition/api-setup.vue'
export default {
  components: {
    ApiSetup
  }
}
</script>

<template>
  <div class="q-pa-md q-qutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h5">setup()</div>
        <q-separator inset class="q-my-md" />
        <ApiSetup/>
      </q-card-section>
    </q-card>
    <q-card class="my-card q-mt-sm" flat bordered>
      <q-card-section>
        <div class="text-h5">setup()</div>
        <q-separator inset class="q-my-md" />
        <ApiSetup/>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>