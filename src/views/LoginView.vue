<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card
          class="pa-6"
          elevation="8"
          style="border-radius: 16px;"
        >
          <v-card-title class="justify-center" style="font-size: 24px; font-weight: bold;">
            Bienvenido
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              outlined
              hide-details
              class="custom-input mb-4"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
              hide-details
              class="custom-input mb-4"
            ></v-text-field>

            <v-btn
              :loading="loading"
              color="black"
              dark
              block
              large
              rounded
              @click="handleLogin"
            >
              Sign In
            </v-btn>

            <v-alert v-if="error" type="error" dense class="mt-3">
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      user: null,
      error: null,
      loading: false,
    };
  },
  created() {
    onAuthStateChanged(auth, (u) => {
      this.user = u;
      if (u) {
        this.$router.push("/home");
      }
    });
  },
  methods: {
    async handleLogin() {
      this.error = null;
      this.loading = true;
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        if (this.$route.path !== "/home") {
          this.$router.push("/home");
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}

.custom-input .v-input__control {
  border-radius: 12px;
}

.v-btn {
  font-weight: bold;
  font-size: 16px;
}
</style>
