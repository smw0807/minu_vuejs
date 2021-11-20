<template>
  <v-layout column>
    <alert ref="alertCom"/>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn icon small outlined @click="refresh">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="list"
              :page.sync="page"
              :item-per-page="itemsPerPage"
              hide-default-footer
              @page-count="pageCount = $event"
              :search="search"
              height="550"
              :loading="loading"
              loading-text="데이터를 불러오는 중입니다."
              no-data-text="데이터가 없습니다."
              >
              <template v-slot:[`item.file_size`]="{item}">
                {{item.file_size | fileSize }}
              </template>
              <template v-slot:[`item.actions`]="{item}">
                <v-btn color="primary" @click="download(item)">
                  <v-icon>mdi-tray-arrow-down</v-icon>
                   다운로드
                </v-btn>
                <v-btn color="error" @click="del(item)">
                  <v-icon>mdi-file-cancel-outline</v-icon>
                   삭제
                </v-btn>
              </template>
            </v-data-table>
            <div class="text-center">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import alert from '@/components/custom/confirm'
export default {
  components: {
    alert
  },
  data() {
    return {
      search :'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text : '파일명', value : 'file_name', align: 'center' },
        { text : '파일크기', value : 'file_size', align: 'center'  },
        { text : '등록일', value : 'file_mk_dt', align: 'center'  },
        { text : '-', value : 'actions', align: 'center'  }
      ]
    }
  },
  async created() {
    await this.$store.dispatch('file/initList', {});
  },
  filters: {
    fileSize(fileSize) {
      const fixed = 2;
      var str
      //MB 단위 이상일때 MB 단위로 환산
      if (fileSize >= 1024 * 1024) {
        fileSize = fileSize / (1024 * 1024);
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' MB';
      }
      //KB 단위 이상일때 KB 단위로 환산
      else if (fileSize >= 1024) {
        fileSize = fileSize / 1024;
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' KB';
      }
      //KB 단위보다 작을때 byte 단위로 환산
      else {
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' byte';
      }
      return str;
    }
  },
  computed: {
    loading() {
      return this.$store.getters['GET_LOADING_1'];
    },
    list() {
      return this.$store.getters['file/GET_LIST'];
    }
  },
  methods: {
    async download(v) {
       const cf = await this.$refs.alertCom.open({
        type: 'info',
        title: '파일 다운로드',
        text: `[${v.file_name}] 파일을 다운받으시겠습니까?`
      });
      if (cf) {
        const rs = await this.$store.dispatch('file/downloadFile', v);

        const buffer = Buffer.from(rs.data.result, 'base64'.toString('utf-8'));
        const blob = new Blob([buffer], {type: rs.data.type});
        const url = URL.createObjectURL(blob);
        const pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', v.file_name);
        pom.click();
      }
    },
    async del(v) {
      const cf = await this.$refs.alertCom.open({
        type: 'info',
        title: '파일 삭제',
        text: `[${v.file_name}] 파일을 삭제하시겠습니까?`
      });
      if (cf) {
        const rs = await this.$store.dispatch('file/deleteFile', v);
        if (rs) {
          await this.$store.dispatch('file/initList', {});
        }
      }
    },
    refresh() {
      this.$store.dispatch('file/initList', {});
    }
  }
}
</script>

<style>

</style>