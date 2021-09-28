<template>
  <v-card>
    <v-card-title>Veutify Date Pickers + Time Pickers</v-card-title>
    <v-card-text>
      <v-menu
        ref="menu"
        v-model="dropdownOpen"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="model"
        transition="scale-transition"
        offset-y
        max-width="560px"
        min-width="560px">
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="displayDate"
            label="Date Time"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>

        <v-card outlined >
          <v-card-text>
            <v-row>
              <v-col cols="12" align="center">
                <h3 class="text-xs-center">{{ currentSelection }}</h3>
              </v-col>
              <v-col cols="6">
                <v-date-picker 
                  v-model="dateModel"
                  width="240"
                  color="primary"
                  no-title
                  locale="ko"></v-date-picker>
              </v-col>
              <v-col cols="6">
                <!-- <v-btn small 
                  fab
                  :color="getMeridiamButtonColor('AM')" 
                  class="btn-am" @click="meridiam='AM'">AM</v-btn>
                <v-btn 
                  fab
                  small :color="getMeridiamButtonColor('PM')" 
                  class="btn-pm"
                  @click="meridiam='PM'">PM</v-btn> -->
                <v-time-picker 
                  v-if="dropdownOpen" 
                  v-model="timeModel" 
                  color="primary"
                  width="240"
                  format="24hr"
                  no-title
                  ></v-time-picker>
              </v-col>
              <v-col cols="12" align="center">
                  <v-btn color="primary" small @click="confirm()">확인</v-btn>
                  <v-btn small @click="dropdownOpen = false">취소</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * https://lab.iamrohit.in/eg/?s=VnVldGlmeSBEYXRlIFRpbWUgY29tcG9uZW50JCQkXl5eaHR0cHM6Ly9jb2RlcGVuLmlvL3hyaXN0aWFuL3Blbi9Wb0xSWWE=
 */
export default {
  data() {
    return {
      dropdownOpen: false,
        // meridiam: 'AM',
        displayDate: '',
        dateModel: '',
        timeModel: '',
        monthNames: [
          "1월", "2월", "3월",
          "4월", "5월", "6월", 
          "7월", "8월", "9월", 
          "10월", "11월", "12월"
        ]
    }
  },
  mounted(){
    var d = new Date();
    var currentHour = d.getHours() % 12; // AM,PM format
    var minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var currentTime = currentHour+':'+minutes;
    this.timeModel = currentTime;
    this.dateModel = d.toISOString().substr(0, 10);
  
    // if ( d.getHours() >= 12) {
    //   this.meridiam = 'PM';
    // }
  },
  computed: {
    model: {
      get() { return this.value; },
      set(model) {  }
    },
    
    currentSelection(){
      let selectedTime = this.timeModel
      // let selectedTime = this.timeModel+' '+this.meridiam
      return this.formatDate(this.dateModel) + ' '+selectedTime;
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';

      const [year, month, day] = date.split('-')
      // let monthName = this.monthNames[parseInt(month)]
      return `${year}-${month}-${day} `;
    },
    
    confirm(){
      this.onUpdateDate();
      this.dropdownOpen = false
    },
    
    onUpdateDate(){
      if ( !this.dateModel || !this.timeModel) return false;

      let selectedTime = this.timeModel
      // let selectedTime = this.timeModel+' '+this.meridiam
      this.displayDate = this.formatDate(this.dateModel) + ' '+selectedTime
      console.log('1 : ', this.dateModel);
      console.log('2 : ' , selectedTime);
      this.$emit('input', this.dateModel + ' '+selectedTime);
    },
    
    getMeridiamButtonColor(m) {
      if ( m === this.meridiam) {
        return 'primary';
      } else {
        return 'darkgray';
      }
    },
  },

}
</script>

<style>
.v-date-time-widget-container{
    /* background: white; */
    padding:15px
}

.v-card{
  box-shadow: none
}

.btn-am{
  float:left;
}

.btn-pm{
  float:right
}

.v-date-picker-table{
  height: auto;
}
</style>