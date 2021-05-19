<template>
   <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-alpine"
        id="myGrid"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :components="components"
        :rowBuffer="rowBuffer"
        :rowSelection="rowSelection"
        :suppressRowClickSelection="true"
        :rowModelType="rowModelType"
        :paginationPageSize="paginationPageSize"
        :cacheOverflowSize="cacheOverflowSize"
        :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
        :infiniteInitialRowCount="infiniteInitialRowCount"
        :maxBlocksInCache="maxBlocksInCache"
        >
      </ag-grid-vue>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * 생각을 해보자
 * 현재 안되는 문제 2가지
 * 1. sort 기능 안먹힘
 * 2. 스크롤 끝자락 갔을 때 다음 데이터 조회
 * 
 * 1번은 무한 스크롤 기능을 사용해서 그런건지 뭔가 제대로 처리가 안되는 것 같은데 원인 파악이 안됨.
 * 컬럼헤드를 눌러서 소팅기능을 작동 시키면 되는 것 마냥 로딩바가 도는데 데이터 순서가 그대로임.
 * 소팅 처리해주는 함수를 만들어야하는 것 같음.
 * 만들어야 한다면 소팅값을 넘겨서 엘라스틱에서 데이터를 새로 가져오게끔 데이터를 수정해야할 것 같음.
 * => 이건 아직 방법을 모르겠다.
 * 
 * 2번은 애초에 데이터를 가져올 때 한번에 다 가져와서 일부만 draw 시킨 후 스크롤을 내렸을 때 특정 지점에 도달하면
 * 뒤에 일부분을 그려주는 방식인 것 같음
 * 이런식이라면 sort했을 때와 데이터 검색했을 때마다 params에 담아서 dispatch를 날린 후 새로운 데이터를 가져와 draw 시킬 수 있게
 * 로직을 짜야함.
 * 이런 방법이 가능한지 찾아봐야함
 * 근데 공식 Docs문서에 비슷한 함수가 제공되는 것 같은데 사용 방법같은게 설명이 너무 부족해서
 * 적용을 못하겠음.
 * => 따로 카운트를 저장해놓고 해당 카운트와 테이블의 endRow값과 일치하면 카운트값을 증가시켜 그 사이즈로
 * 새로 조회하게끔 성공함. 아직 부족한 부분이 조금 있지만 기능은 정상 작동함.
 * 
 */
export default {
  data() {
    return {
      totCount: 200,
      sortData: 'detectionDateTime',
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      components: null,
      rowBuffer: null,
      rowSelection: null,
      rowModelType: null,
      paginationPageSize: null,
      cacheOverflowSize: null,
      maxConcurrentDatasourceRequests: null,
      infiniteInitialRowCount: null,
      maxBlocksInCache: null,
    }
  },
  beforeMount() {
    this.gridOptions = {};
    this.columnDefs = [
      {
        headerName: '수집일시',
        field: 'detectionDateTime',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        cellRenderer: 'loadingRenderer'
      },
      {
        headerName: '기관명',
        field: 'institutionName'
      },
      {
        headerName: '출발지 IP',
        field: 'attackIp'
      },
      {
        headerName: '출발지 Port',
        field: 'attackPort'
      },
      {
        headerName: '목적지 IP',
        field: 'victimIp'
      },
      {
        headerName: '목적지 Port',
        field: 'victimPort'
      },
      {
        headerName: '탐지회수',
        field: 'detectionCount'
      }
      // {
      //   headerName: '수집일시',
      //   field: 'date_time',
      //   maxWidth: 100,
      //   headerCheckboxSelection: true,
      //   headerCheckboxSelectionFilteredOnly: true,
      //   checkboxSelection: true,
      //   cellRenderer: 'loadingRenderer',
      // },
      // {
      //   headerName: '출발지IP',
      //   field: 'attack_ip',
      //   minWidth: 150,
      // },
      // {
      //   headerName: '출발지Port',
      //   field: 'attack_port',
      //   minWidth: 150,
      // },
      // {
      //   headerName: '목적지IP',
      //   field: 'victim_ip',
      //   minWidth: 150,
      // },
      // {
      //   headerName: '목적지Port',
      //   field: 'victim_port',
      //   minWidth: 150,
      // }
    ];
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      minWidth: 100,
      sortable: true
    };
    this.components = {
      loadingRenderer: (params) => {
        // console.log(params.rowIndex);
        if (params.value !== undefined) {
          if (this.totCount === (params.rowIndex + 1)) {
            this.totCount += 100
          } else {
            return params.value;
          }
        } else {
          return '<img src="/img/loading.gif">';
        }
      },
    };
    this.rowBuffer = 0;
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.paginationPageSize = 200;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1000;
    this.maxBlocksInCache = 10;
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  watch: {
   async totCount() {
     this.onGridReady(this.gridOptions);
   }
  },
  methods: {
    async onGridReady(params) {
      const updateData = (data) => {
        console.log(data);
        var dataSource = {
          rowCount: null,
          getRows (params) {
            console.log(
              'asking for ' + params.startRow + ' to ' + params.endRow
            );
            setTimeout(function () {
              var rowsThisPage = data.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setDatasource(dataSource);
      };
      try {
        let param = {
          size: this.totCount
        }
        let rs = await this.$store.dispatch('threat/monitoring/initList', param);
        console.log(rs);
        updateData(rs.data);
      } catch (err) {
        console.log('onGridReady err : ', err);
      }
    },
  },
}
</script>

<style>

</style>