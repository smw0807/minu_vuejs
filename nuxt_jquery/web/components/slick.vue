/** 작업자 : 송민우 */
<template>
   <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <div id="threat_list" style="height: 650px"></div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      totCount: 300,
      test: [
        {test: 'test'}
      ],
      slickgrid: null,
      rows: [],
      columns: [],
    }
  },
  watch: {
  },
  beforeCreate() {
    console.log('1');
    this.rows = [
    {
      name: "a",
      contents: "안녕하세요."
    },
    {
      name: "호동",
      contents: "반갑습니다."
    }
  ];
  this.columns = [
    {
      name: "이름",
      field: "name",
      id: "name",
      sortable: true
    },
    {
      name: "내용",
      field: "contents",
      id: "contents",
      sortable: true
    }
  ];
  },
  created () {
    console.log('2');
    // $('#threat_list').append("sdfsdfsdf");
    //  this.slickgrid = new Slick.Grid("#threat_list", this.rows, this.columns, {enableColumnReorder: false});
  },
  mounted() {
    console.log('3');
    // slickgrid = new Slick.Grid("#threat_list", this.rows, this.columns, {enableColumnReorder: false});
    slick_start();
  },
  computed: {
  },
  methods: {
  },
}

function slick_start() {
  console.log('11');
    let rows = [
    {
      name: "은복",
      contents: "안녕하세요."
    },
    {
      name: "호동",
      contents: "반갑습니다."
    }
  ];
  let columns = [
    {
      name: "이름",
      field: "name",
      id: "name",
      sortable: true
    },
    {
      name: "내용",
      field: "contents",
      id: "contents",
      sortable: true
    }
  ];
  const slickgrid = new Slick.Grid("#threat_list", rows, columns, {enableColumnReorder: false});
}

</script>

<style>
/* .them--dark.slick-cell {
  color: blue;
} */
.slick-cell {
  color: red;
}
</style>