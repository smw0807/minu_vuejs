/** 작업자 : 송민우 */
<template>
  <v-dialog v-model="dialog"
   max-width="550px"
   persistent 
   >
    <template v-slot:activator="{ attrs }">
      <v-btn 
        class="my-0" small color="primary"
        v-bind="attrs"
        @click="open"
        >
        <v-icon small>mdi-plus</v-icon> 등록
      </v-btn>
    </template>
    <v-card raised outlined shaped>
      <v-card-title>
        검색조건 저장
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <confirm ref="cf"/>
        <v-layout column>
          <v-flex>
            <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12" class="mt-2">
                <v-text-field 
                  label="검색조건 명칭"
                  :rules="title_rule"
                  v-model="title"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0 mb-2">
                <v-text-field
                  label="검색조건 설명"
                  hide-details
                  v-model="desc"
                  ></v-text-field>
              </v-col>
            </v-row>
            </v-form>
            <v-row>
              <v-col cols="12" class="pb-0">
                <strong>검색조건</strong>
              </v-col>
              <v-col cols="12">
                <v-slide-item v-for="(filter, index) in filters" :key="index">
                  <v-chip
                    class="mx-1"
                    :class="filter.mode === 'include' ? 'blue' : 'error'"
                    small
                    rounded
                    depressed
                    >
                    <template v-if="filter.type === 'direct' && filter.data2">
                      <strong>{{ filter.name }} : {{ filter.data}} ~ {{ filter.data2 }}</strong>
                    </template>
                    <template v-else-if="filter.type === 'direct'">
                      <strong>{{ filter.name }} : *{{ filter.data}}*</strong>
                    </template>
                    <template v-else>
                      <strong>{{ filter.name }} : {{ filter.data}}</strong>
                    </template>
                  </v-chip>
                </v-slide-item>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="pa-2">
        <v-btn class="ma-0" raised color="primary" @click="getFilter" :disabled="mode === 'ins' ? true : false">
          <v-icon left>mdi-download</v-icon> 가져오기
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ma-1" raised color="primary" @click="save">
          <v-icon left>mdi-check</v-icon> 저장
        </v-btn>
        <v-btn class="ma-1" raised outlined text @click="dialog = !dialog">
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
      mode: '',
      path: '',
      type: '',

      title: '',
      desc: '',

      detail: {},

      filters: [],
      title_rule: [
        v => !!v || '검색조건 명칭은 필수 입력사항입니다.'
      ]
    }
  },
  created() {
    if (this.$nuxt.$route.path.indexOf('monitoring') !== -1) {
      this.path = 'threat/monitoring/';
      this.type = 'monitoring';
    } else {
      this.path = 'threat/analysis/';
      this.type = 'analysis';
    }
  },
  methods:{
    open() {
      this.mode = 'ins';
      this.detail = {};
      this.filters = [];
      const data = this.$store.getters[this.path + 'GET_FILTERS'];
      if (data.length === 0) {
        this.$store.dispatch('updateAlert', {alert: true, type: 'error', text: '저장할 검색조건이 없습니다.'}, {root: true});
      } else {
        this.dialog = true;
        if (this.title !== '') {
          this.$refs.form.reset();
        }
        this.filters = this.$store.getters[this.path + 'GET_FILTERS'];
      }
    },
    show_detail() {
      this.mode = 'upd';
      const v = this.$store.getters['threat/saveFilter/GET_DETAIL'];
      const title = v.title;
      const desc = v.desc;
      
      this.title = title;
      this.desc = desc;
      this.detail = v;
      this.filters = v.data;
      this.dialog = true;
    },
    async save() {
      const validate = this.$refs.form.validate();
      if (validate) {
        const msg = this.mode === 'ins' ? '등록하시겠습니까?' : '수정하시겠습니까?';
        const rs_msg = this.mode === 'ins' ? '등록완료되었습니다.' : '수정완료되었습니다.';
        const rs = await this.$refs.cf.open({
          type:'info',
          title: '검색조건',
          text: msg
        });
        if (rs) {
          let params = {};
          params.mode = this.mode;
          params.location = this.type;
          params.title = this.title;
          params.desc = this.desc;
          params.detail = this.detail;
          params.filters = this.filters;
          if (this.mode === 'upd') params._id = this.detail._id;
          const rs = await this.$store.dispatch('threat/saveFilter/action', params);
          if (rs) {
            this.$store.dispatch('updateAlert', {alert: true, type: 'success', text:rs_msg});
            this.$emit("reload", true);
            this.dialog = false;
          }
        }
      }
    },
    async getFilter() {
      const rs = await this.$refs.cf.open({
        type:'info',
        title: '검색조건',
        text: '해당 검색조건을 가져오시겠습니까?'
      });
      if (rs) {
        this.$store.commit(this.path + 'SET_FILTERS', this.filters);
        this.dialog = false;
        this.$store.dispatch('updateAlert', {alert: true, type: 'success', text:'완료되었습니다!'});
      }
    },
  },
}
</script>
<style>
</style>