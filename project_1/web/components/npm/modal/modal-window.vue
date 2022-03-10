<template>
  <div>
    <v-card>
      <v-card-title>vue-modal-window</v-card-title>
      <v-card-text>
        <window-modal  :active="is_modal_1"  title="Modal 1"  v-on:clickClose="modal_1(false)">
          <v-card>
            <v-card-title>zzzz</v-card-title>
            <v-card-text>
              sdfsdfsdf
            </v-card-text>
          </v-card>
        </window-modal>
        <window-modal  :active="is_modal_2"  title="Modal 2"  v-on:clickClose="modal_2(false)">
          <v-card>
            <v-card-title>zzz</v-card-title>
            <v-card-text>
              sdfsdfsdf
            </v-card-text>
            <v-card-actions>
              <v-btn @click="alert">Alert!</v-btn>
            </v-card-actions>
          </v-card>
        </window-modal>
        <vuetify-window-modal :active="is_modal_3" title="Vuetify Modal 1" width="300px" height="500px" @clickClose="modal_3(false)">
          <v-card
            outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12">ddddd</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-btn>버튼이요</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </vuetify-window-modal>
        <v-layout column>
          <v-row>
            <v-col cols="2">
              <v-btn @click="modal_1(true)">modal 1 open</v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn @click="modal_2(true)">modal 2 open</v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn @click="modal_3(true)">vueitfy modal open</v-btn>
            </v-col>
          </v-row>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import windowModal from '@/components/cmn/window-modal'
import vuetifyWindowModal from '@/components/cmn/vuetify-window-modal'
export default {
  components: {
    windowModal,
    vuetifyWindowModal
  },
  data() {
    return {
      md_title: 'modal title?',
      is_modal_1: false,
      is_modal_2: false,
      is_modal_3: false,
    }
  },
  methods:{
    modal_1(v){
      this.is_modal_1 = v;
    },
    modal_2(v) {
      this.is_modal_2 = v;
    },
    modal_3(v) {
      this.is_modal_3 = v;
    },
    alert() {
      this.$store.dispatch('updateAlert', {
        alert: true,
        type:'success',
        title: 'test!!',
        text: 'test.....'
      })
    }
  }
}
</script>

<style>

</style>