<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view class="router" :class="playafter()" @playToApp="play"></router-view>
    <div class="playbox">
      <div class="playmusic" v-if="playmusic">
        <div class="playimg">
          <img :src="playmusic.song.album.picUrl" alt="" />
        </div>
        <div class="playboxr">
          <!-- 歌名 -->
          <div class="name">
            <span> {{ playmusic.name }} </span>
            <span class="alias" v-if="playmusic.song.alias.length != 0">
              ({{
                playmusic.song.alias[0]
                  ? playmusic.song.alias[0]
                  : playmusic.song.alia[0]
              }})
            </span>
          </div>
          <div class="audiobox">
            <audio
              class="audio"
              v-if="playstat"
              :src="`https://music.163.com/song/media/outer/url?id=${playId}.mp3`"
              controls
            ></audio>
          </div>
        </div>
      </div>
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
      playmusic: "",
      playId: "",
    };
  },
  created() {},
  computed: {
    playafter() {
      return (index) => {
        return {
          'play-after':this.playstat === true
        }
      }
    }
  },
  methods: {
    play(music) {
      this.playstat = true;
      this.playmusic = music;
      this.playId = music.id;
      // console.log(this.playmusic);
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
  .play-after {
    margin-bottom: 82px;
  }
  .playbox {
    background-color: rgba(241, 243, 244, $alpha: 1);
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-top: 2px;
    .playmusic {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      .playimg {
        margin: 0 auto;
        img {
          border-radius: 60px;
          border: 1px solid rgb(241, 243, 244);
          width: 60px;
          height: 60px;
        }
      }
    }
    .playboxr {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: center;
      .name {
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 5px;
        .alias {
          color: #888;
          margin-left: 4px;
        }
      }
      .audiobox {
        display: flex;
        .audio {
          z-index: 1;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
