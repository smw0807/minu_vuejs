<template>
  <div>
    <!-- <json-csv
      ref="jsoncsv"
      :name="filename"
      :labels="headers"
      :fields="fields"
      :data="data"
      :encoding="encoding"
      style="display:none;"
      >
        <v-btn small class="btn5 icon-csv">CSV내려받기</v-btn>
    </json-csv> -->

    <json-csv
      ref="jsoncsv"
      :name="mode === 'simple' ? filename : csv_filename"
      :labels="mode === 'simple' ? headers : csv_headers"
      :fields="mode === 'simple' ? fields : csv_fields"
      :data="mode === 'simple' ? data : csv_data"
      :encoding="mode === 'simple' ? encoding : csv_encoding"
      style="display:none;"
      >
      </json-csv>
    <!-- <json-csv
      ref="jsoncsv"
      :name="filename"
      :labels="headers"
      :fields="fields"
      :data="data"
      :encoding="encoding"
      style="display:none;"
      >
      </json-csv> -->
      
      <v-btn v-if="mode=='simple'" small class="btn5 icon-csv" @click="download">CSV내려받기</v-btn>
      <!-- <v-btn v-else small class="btn5 icon-csv">CSV내려받기2</v-btn> -->
  </div>
</template>

<script>
/** //!CSV
 * https://www.npmjs.com/package/vue-json-csv
 * https://github.com/Belphemur/vue-json-csv
 * 
headers 속성
csvHeaders:{
  test_mk_dt : '생성일',
  name : '이름',
  age : '나이',
  test_ip : '아이피',
  test_port : '포트',
  is_use : '사용여부'
},
받은 데이터에서 키와 일치하는건 값으로 헤더에 표기해줌
일치하는게 없으면 헤더에 필드값 그대로 표기함

대용량은 권장하지 않고 통계 처럼 데이터 양이 많지 않을 경우에 사용
 */
import jsonCsv from 'vue-json-csv'
export default {
  components: {
    jsonCsv
  },
  props: {
    filename : { //생성할 csv 파일 명
      type: String,
      default : 'data.csv'
    },
    headers: { //헤더 정보 맵핑 시키기 (위에 csvHeaders 주석 참고)
      type: Object,
      // require : true,
      default: () => {}
    },
    fields: { //csv 파일에 표시할 필드 (따로 안주면 데이터의 모든 필드를 표기함)
      type: Array,
      default: () => []
      // require: true,
    },
    data : { //출력할 데이터. 받은 데이터 그대로 출력만 가능해서 가공이 필요하면 가공을 따로 먼저한 후 받아야함
      type : Array,
      default: () => []
      // require: true
    },
    encoding : { //인코딩 타입
      type: String,
      default : 'utf-8'
    },
    mode : {
      type : String,
      default : 'simple'
    }
  },
  data() { //ref를 이용해 생성하고 싶을 때 사용 //mode prop 값 아무거나 넘겨주면됨
    return {
      csv_filename: '',
      csv_headers: {},
      csv_fields: [],
      csv_data: [],
      csv_encoding: ''
    }
  },
  methods: {
    download() {
      this.$refs.jsoncsv.generate();
    },
    customDownload(v) { //ref를 이용해 생성하고 싶을 때 사용 //mode prop 값 아무거나 넘겨주면됨
      console.log(v);
      this.csv_filename = v.filename || 'data.csv';
      this.csv_headers = v.headers || {};
      this.csv_fields = v.fields || [];
      this.csv_data = v.data || [];
      this.csv_encoding = v.encoding || 'utf-8';
      this.$refs.jsoncsv.generate();
    }
  }
}
</script>

<style>

</style>