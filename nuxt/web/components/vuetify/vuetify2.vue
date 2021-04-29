<template>
  <v-card>
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
              shaped, outlined 
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title>title</v-card-title>
          <v-card-text>
              default
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-card outlined>
          <v-card-title>title</v-card-title>
          <v-card-text>
              outline
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="4">
        <v-card raised>
          <v-card-title>title</v-card-title>
          <v-card-text>
              raised
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card outlined raised>
          <v-card-title>title</v-card-title>
          <v-card-text>
              outlined raised
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