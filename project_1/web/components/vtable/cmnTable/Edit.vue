<template>
  <v-dialog v-model="dialog" max-width="450px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary white--text" v-bind="attrs" v-on="on">
        <v-icon small>mdi-filter-plus-outline</v-icon> 등록
      </v-btn>
    </template>
    <v-card raised outlined>
      <v-card-title> 방명록 등록 </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" label="작성자"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="comments" label="코멘트"> </v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-1">
        <v-spacer></v-spacer>
        <v-btn class="ma-0" raised color="primary" @click="save">
          <v-icon left>mdi-check</v-icon> 등록
        </v-btn>
        <v-btn class="ma-1" raised outlined text @click="close">
          <v-icon left>mdi-close</v-icon> 닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      name: null,
      comments: null,
    };
  },
  methods: {
    async save() {
      try {
        const rs = await this.$store.dispatch('datatables/GuestBookInsert', {
          name: this.name,
          comments: this.comments,
        });
        if (rs) {
          this.$emit('refresh', true);
          this.close();
        }
      } catch (err) {
        alert(err);
      }
    },
    close() {
      this.$refs.form.reset();
      this.dialog = false;
    },
  },
};
</script>
<style>
</style>