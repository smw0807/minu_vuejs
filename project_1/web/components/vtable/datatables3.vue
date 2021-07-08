<template>
  <div>
    <div v-for="(line, index) in lines" :key="index" class="row">
      <div class="col-lg-6">
        <div class="row">
          <div class="col-2">
            <v-select
              v-model="line.countryCode"
              :items="line.countryCode"
              label="Country Code"
              :options="countryPhoneCodes"
            />
          </div>
          <div class="col-10">
            <v-text-field
              v-model="line.number"
              label="Phone Number"
              type="tel"
              placeholder="5551234567"
              value=""
            />
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <v-select
          v-model="line.phoneUsageType"
          :items="line.phoneUsageTypes"
          label="Type of Usage"
          :options="phoneUsageTypes"
        />
      </div>

      <div class="col-lg-2">
        <div class="block float-right">
          <v-btn @click="removeLine(index)" />
          <v-btn v-if="index + 1 === lines.length" @click="addLine" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lines: [],
      blockRemoval: true,
      phoneUsageTypes: [
        {
          label: 'Home', value: 'home'
        }, {
          label: 'Work', value: 'work'
        }, {
          label: 'Mobile', value: 'mobile'
        }, {
          label: 'Fax', value: 'fax'
        }
      ],
      countryPhoneCodes: [
        {
          label: '+90',
          value: '+90'
        }, {
          label: '+1',
          value: '+1'
        }
      ]
    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  methods: {
    addLine () {
      let checkEmptyLines = this.lines.filter(line => line.number === null)

      if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
         return
      } 

      this.lines.push({
        countryCode: null,
        number: null,
        phoneUsageType: null
      })
    },

    removeLine (lineId) {
      if (!this.blockRemoval) {
         this.lines.splice(lineId, 1)
      }
    }
  },
  mounted () {
    this.addLine()
  }
}
</script>

<style>

</style>