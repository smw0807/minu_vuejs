/** 작업자 : 송민우 */
<template>
  <context-menu id="context-menu" ref="ctxMenu" 
    :closeOnClick="closeOnClick"
    :lazy="lazy"
    style="min-width:270px;"
    >
    <li class="cm_header">검색조건</li>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <li class="px-2 py-1 my-1 cm_text">
      <template v-if="context_data.type === 'string'">
        <v-text-field 
          @click.stop 
          autofocus
          outlined 
          dense 
          placeholder="검색할 단어 입력"
          v-model="context_data.text"
          hide-details
          clearable
          light
          ></v-text-field>
      </template>
      <template v-else-if="context_data.type === 'integer'">
        <v-text-field 
          @click.stop 
          autofocus
          outlined 
          dense 
          placeholder="검색할 단어 입력"
          v-model="context_data.text"
          hide-details
          clearable
          light
          ></v-text-field>
      </template>
      <template v-else-if="context_data.type === 'select'">
        <v-select
          id="type_select"
          v-model="context_data.text"
          :items="type_option"
          item-text="text"
          item-value="value"
          hide-details
          :menu-props="{ bottom: true, offsetY: true }"
          @change="keepMenu"
          color="blue"
          light
          >
        </v-select>
      </template>
    </li>
    <v-divider></v-divider>
    <li class="px-2 py-1 my-1">
      <v-row>
        <v-col cols="6" align="center">
          <v-btn block color="blue" @click="include_filter" class="px-3">검색</v-btn>
        </v-col>
        <v-col cols="6" align="center">
          <v-btn block color="error" @click="exclude_filter">예외</v-btn>
        </v-col>
      </v-row>
    </li>
  </context-menu>
</template>

<script>
/**
 * ip 형식은 어떻게 처리할지 생각해보기
 */
export default {
  props: {
    context_info: {
      type: Object
    }
  },
  data() {
    return {
      context_menu : null,
      closeOnClick: false, //context-menu 영역 클릭해도 안닫히게 해줌
      lazy: true, //셀렉트박스 change이벤트에 메뉴 안 닫히게 쓸 용도
      type_option: [ 
        { text: '사용', value: 'true'},
        { text: '사용안함', value: 'false'}
      ]
    }
  },
  computed: {
    context_data() {
      return this.$store.getters['GET_CONTEXT_MENU'];
    },
  },
  watch: {
    context_info(v) {
      this.context_menu.open(v);
    }
  },
  mounted() {
    this.context_menu = this.$refs.ctxMenu;
  },
  updated() {
    if (this.context_data.type === 'select') {
      //셀렉트박스 change 이벤트가 발생하면 닫히는거 대응용...
      this.open();
    }
  },
  methods: {
    keepMenu() { //context_menu가 안닫히게끔 해주기 위한 것
      this.context_menu.show = false;
    },
    /** 
     * data.type에 따라서 direct, indirect 생각하기
     * 'string'은 값 변경이 있으면 direct, 없으면 indirect
     * 'ip'는 입력 필드를 2개로 하고 값 변경이 있으면 direct, 없으면 indirect. 추가 필드는 data2로 종료IP
     * 'integer'는 무조건 indirect
     * 'select'는 무조건 indirect
     */
    include_filter() {
      let data = this.$store.getters['GET_CONTEXT_MENU'];
      if (data.text === null || data.text === '') {
        this.show_alert();
      } else {
        let filter = this.$store.getters['GET_FILTERS'];
        let search = {};
        let change = false;
        search.mode = 'include';
        search.name = data.name;
        search.field = data.info.obj.field;
  
        if (data.text === String(data.info.val)) { //indirect
          search.type = 'indirect';
          search.data = data.text;
          change = true;
        } else {//direct
          //context_menu 의 type이 integer, select면 indirect로
          if (data.type === 'string') {
            search.type = 'direct';
            search.data = data.text;
            change = true;
          } else if (data.type === 'integer' || data.type === 'select') {
            search.type = 'indirect';
            search.data = data.text;
            change = true;
          } else if (data.type === 'ip') {
            search.type = 'direct';
            // search.data = data.
          }
        }
        if (change) {
          filter.push(search);
          this.$store.commit('SET_FILTERS', filter);
          this.$emit('reload', true);
        }
        this.close();
      }
    },
    exclude_filter() {
      let data = this.$store.getters['GET_CONTEXT_MENU'];
      if (data.text === null || data.text === '') {
        this.show_alert();
      } else {
        let filter = this.$store.getters['GET_FILTERS'];
        let search = {};
        let change = false;
        search.mode = 'exclude';
        search.name = data.name;
        search.field = data.info.obj.field;
  
        if (data.text === String(data.info.val)) { //indirect
          search.type = 'indirect';
          search.data = data.text;
          change = true;
        } else {//direct
          //context_menu 의 type이 integer, select면 indirect로
          if (data.type === 'string') {
            search.type = 'direct';
            search.data = data.text;
            change = true;
          } else if (data.type === 'integer' || data.type === 'select') {
            search.type = 'indirect';
            search.data = data.text;
            change = true;
          } else if (data.type === 'ip') {
            search.type = 'direct';
            // search.data = data.
          }
        }
        if (change) {
          filter.push(search);
          this.$store.commit('SET_FILTERS', filter);
          this.$emit('reload', true);
        }
        this.close();
      }
    },
    show_alert() {
      this.$store.dispatch('updateAlert', {alert: true, type: 'warning', text: '빈 값으로 검색조건을 실행할 수 없습니다.'});
    },
    open() { //context_menu 열기
      this.context_menu.open(this.context_info);
    },
    close() { //context_menu 닫기
      this.context_menu.close();
    },
  }
}
</script>

<style>
#context-menu {
  padding: 0;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: visible;
}
.cm_header {
  text-align: center;
  background-color: #001f53;
  color: #FFF;
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.cm_text >* {
  color: red;
}
/* .theme--dark cm_text > * {
  font-size: 13px;
  color: red;
}
.theme--light .cm_text {
  font-size: 13px;
  color: blue;
}
.v-text-field__slot input {
   color: #000 !important;
}
.v-select__selections #type_select {
  color: #000 !important;
} */
</style>

</style>