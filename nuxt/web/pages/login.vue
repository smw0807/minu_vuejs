<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="submit" ref="form">
                  <v-text-field
                    v-model="user_id"
                    @keyup.enter="submit"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="user_id_rule"
                    autocomplete="false"
                  ></v-text-field>

                  <v-text-field
                    v-model="user_pw"
                    @keyup.enter="submit"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="user_pw_rule"
                    autocomplete="false"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      user_id: '',
      user_id_rule: [
        v => !!v || '아이디를 입력해주시기 바랍니다.'
      ],
      user_pw: '',
      user_pw_rule: [
        v => !!v || '패스워드를 입력해주시기 바랍니다.'
      ]
    }
  },
  methods: {
    async submit() {
      const validate = this.$refs.form.validate();
      if (validate == true) {
        try {
          const params = {
            user_id : this.user_id,
            user_pw : this.user_pw
          }
          const rs = await this.$store.dispatch('login/login', params);
          console.log('loginvue', rs);
          if (rs.result.error) {
            alert(rs.result.msg);
            this.reset();
          } else {
            console.log('login : ', rs.result);
          }
        } catch (err) {
          console.error(err);
        }
      //   await fetch('/api/es/login', {
      //     method: 'POST',
      //     Headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify({
      //       user_id: this.user_id,
      //       user_pw: this.user_pw
      //     })
      //   })

      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
}
</script>

<style>

</style>