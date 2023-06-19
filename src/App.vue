<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view class="router" @playToApp="play"></router-view>
    <div class="audiobox">
      <audio
        class="audio"
        v-if="playstat"
        :src="`https://music.163.com/song/media/outer/url?id=${music.id}.mp3`"
        controls
      ></audio>
    </div>
  </div>
</template>

<script>
import navView from "./components/navView.vue";
export default {
  components: { navView },
  data() {
    return {
      playstat: false,
      id: "",
      playmusic: {},
    };
  },
  methods: {
    play(music) {
      this.playstat = true;
      this.music = music;
    },
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  .router {
    margin-top: 40px;
  }
  .audiobox {
      position: fixed;
      bottom: 0;
    .audio {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
