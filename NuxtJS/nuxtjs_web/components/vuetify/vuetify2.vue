<template>
  <v-card raised>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>v-card-title</v-card-title>
          <v-card-subtitle>v-card-sub-title</v-card-subtitle>
          <v-card-text>v-card-text</v-card-text>
          <v-card-actions>
            <v-btn>btn</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-card shaped outlined>
          <v-card-title>title</v-card-title>
          <v-card-text>
              111111111111111
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title>title</v-card-title>
          <v-card-text>
              2222222222222222222222
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-card outlined>
          <v-card-title>title</v-card-title>
          <v-card-text>
              333333333333333333333
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="4">
        <v-card raised>
          <v-card-title>title</v-card-title>
          <v-card-text>
              44444444444444444444
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card outlined raised>
          <v-card-title>title</v-card-title>
          <v-card-text>
              dark 테마는 card에 outlined과 raised 옵션을 주는게 보기 좋은 것 같음
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>