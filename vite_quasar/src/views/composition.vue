<script>
import setup from '../components/composition/setup.vue';
export default {
  components: {
    setup,
  },
};
</script>

<template>
  <div class="q-pa-md q-qutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h5">setup()</div>
        <q-separator inset class="q-my-md" />
        <setup />
      </q-card-section>
    </q-card>
    <!-- <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h5">received params?</div>
        {{ $route.params.name }}
      </q-card-section>
    </q-card> -->
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h5">query</div>
        {{ $route.query }}
        {{ $route.query.name }}
      </q-card-section>
    </q-card>

    <!-- <q-card class="my-card q-mt-sm" flat bordered>
      <q-card-section>
        <div class="text-h5">reactivity: Core</div>
        <q-separator inset class="q-my-md" />

      </q-card-section>
    </q-card> -->

    <!-- <q-card class="my-card q-mt-sm" flat bordered>
      <q-card-section>
        <div class="text-h5">reactivity: Utilities</div>
        <q-separator inset class="q-my-md" />

      </q-card-section>
    </q-card> -->
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>