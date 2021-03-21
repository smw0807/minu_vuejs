<template>
  <v-card>
    <v-responsive :aspect-ratio="16/9">
      <v-system-bar
        height="34"
      >
      이게머임
      </v-system-bar>
      <v-avatar
        color="primary"
        rounded
        size="56"
      >Min</v-avatar>

      <v-card-text>
        v-responsive...
        This card will always be 16:9 (unless you put more stuff in it)
      </v-card-text>

      <v-badge>
        <v-btn
          class="white--text"
          color="error"
          depressed
        >
          Lock Account
        </v-btn>
      </v-badge>

      <v-badge
        bordered
        bottom
        color="deep-purple accent-4"
        dot
        offset-x="10"
        offset-y="10"
      >
        <v-avatar size="40">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-avatar>
      </v-badge>

      <!--  -->
      <v-bottom-sheet
        v-model="sheet"
        persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="green"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Open Persistent
          </v-btn>
        </template>
        <v-sheet
          class="text-center"
          height="200px"
        >
          <v-btn
            class="mt-6"
            text
            color="error"
            @click="sheet = !sheet"
          >
            close
          </v-btn>
          <div class="py-3">
            This is a bottom sheet using the persistent prop
          </div>
        </v-sheet>
      </v-bottom-sheet>
    
    </v-responsive>
  </v-card>
</template>
<script>
/**
 * v-avatar : 프로필 사진 같은거 표시용으로 쓰는 것 같음
 */
export default {
  data () {
    return {
      sheet: false
    }
  }
}
</script>

<style>

</style>