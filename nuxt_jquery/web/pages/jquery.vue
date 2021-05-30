<template>
  <v-layout column>
    <v-flex>
      <v-card>
        <v-card-title>jQueryJS Test</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="9">
              <v-text-field id="text"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn id="btn" @click="btn">Check</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    btn() {
      console.log('btn!!');
      var text = $('#text').val();
      console.log(text);
    }
  }
}
</script>

<style>

</style>