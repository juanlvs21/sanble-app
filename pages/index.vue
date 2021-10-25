<template>
  <div>
    <h1>SANBLE</h1>
    <h3>Welcome, {{ username }}</h3>

    <vs-input v-model="value" placeholder="User name" style="width: 90%">
      <template #icon>
        <i class="bx bx-user" style="color: rgb(4, 1, 15)"></i>
      </template>
    </vs-input>

    <vs-button style="margin-top: 30px" @click="openNotification">
      Open Notification
    </vs-button>

    <vs-button style="margin-top: 30px" @click="openLoading">
      Open Loading
    </vs-button>

    <vs-button style="margin-top: 30px" @click="active = !active">
      Alert
    </vs-button>

    <vs-dialog width="550px" v-model="active" not-center>
      <template #header>
        <h4 class="not-margin">Welcome to <b>Vuesax</b></h4>
      </template>

      <div class="con-content">
        <p>
          Vuesax is a relatively new framework with a refreshing design and in
          the latest trends, vuesax based on vuejs which means that we go hand
          in hand with one of the most popular javascript frameworks in the
          world and with a huge community with which you will have all the help
          and documentation to create and make your project
        </p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="active = false" transparent> Ok </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  asyncData() {
    return { username: 'username' }
  },
  data() {
    return {
      value: '',
      active: false,
    }
  },
  methods: {
    openNotification() {
      this.$vs.notification({
        title: 'Documentation Vuesax 4.0+',
        text: `These documents refer to the latest version of vuesax (4.0+),
            to see the documents of the previous versions you can do it here 👉 Vuesax3.x`,
      })
    },
    openLoading() {
      const loading = this.$vs.loading()
      setTimeout(() => {
        loading.close()
      }, 3000)
    },
  },
}
</script>

<style>
body {
  background-color: rgb(4, 1, 15);
  color: white;
}
</style>
