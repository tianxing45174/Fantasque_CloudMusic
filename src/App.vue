<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view class="router" :class="playafter()"></router-view>
    <div class="playbox">
      <div
        class="playmusic"
        v-if="music.playBoxStatus"
        @click="toggleFullScreen()"
      >
        <div class="playimg">
          <img
            :src="music.thisPlay.music.song.album.picUrl + '?param=200y200'"
            alt=""
          />
        </div>
        <div class="playboxr">
          <!-- 歌名 -->
          <div class="name">
            <span> {{ music.thisPlay.music.name }} </span>
            <span
              class="alias"
              v-if="music.thisPlay.music.song.alias.length != 0"
            >
              ({{
                music.thisPlay.music.song.alias[0]
                  ? music.thisPlay.music.song.alias[0]
                  : music.thisPlay.music.song.alia[0]
              }})
            </span>
          </div>
          <audio
            class="audio"
            ref="AppAudio"
            v-if="music.playBoxStatus"
            autoplay
            :src="`https://music.163.com/song/media/outer/url?id=${music.thisPlay.music.id}.mp3`"
            controls
          ></audio>
        </div>
      </div>
    </div>
    <transition name="fullscreenchange">
      <full-screen
        @showPlay="toggleFullScreen"
        :playmusic="music.thisPlay.music"
        v-if="isShowPlay"
        ></full-screen>
        <!-- :AppAudio="AppAudio" -->
    </transition>
  </div>
</template>

<script>
import FullScreen from "./components/fullScreen.vue";
import navView from "./components/navView.vue";
import { mapState } from "vuex";
export default {
  components: { navView, FullScreen },
  data() {
    return {
      isShowPlay: false,
      AppAudio: {},
    };
  },
  mounted() {
    // this.$watch(
    //   () => this.$refs.AppAudio,
    //   val => {
    //     console.log("this.$refs.AppAudio",this.$refs.AppAudio);
    //     this.$store.state.musicPlay.music.AppAudio = this.$refs.AppAudio
    //   }
    // )
  },
  updated() {
    this.$store.state.musicPlay._refs = this.$refs
    this.AppAudio = this.$refs.AppAudio
  },
  computed: {
    ...mapState("musicPlay", ["music"]),
    playafter() {
      return (index) => {
        return {
          "play-after": this.playstat === true,
        };
      };
    },
  },
  methods: {
    // play(music) {
    //   console.log("play", music);
    // },
    toggleFullScreen() {
      this.AppAudio = this.$refs.AppAudio
      this.isShowPlay = !this.isShowPlay;
    },
  },
  watch: {
  //   $refs["AppAudio"]: {
  //     deep:true,
  //     handler(newV,oldV) {
  //       this.$nextTick(() => {
  //       console.log("this.AppAudio", this.AppAudio);
  //       console.log("newValue", newV.currentTime);
  //       console.log("oldValue", oldV.currentTime);
  //       this.AppAudio.currentTime = newV.currentTime
  //     });
  //     }
  //   }
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
  /* 进入动画的第一帧 */
  .fullscreenchange-enter,
  .fullscreenchange-leave-to {
    transform: translateY(100%);
  }

  /* 进入动画的过程 */
  .fullscreenchange-enter-active,
  .fullscreenchange-leave-active {
    transition: all 0.3s ease-in;
  }

  /* 进入动画的第一帧 */
  .fullscreenchange-enter-to,
  .fullscreenchange-leave {
    transform: translateY(0);
  }
  .playbox {
    background-color: rgba(241, 243, 244, $alpha: 1);
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .playmusic {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      align-items: center;
      .playimg {
        margin: 0 auto;
        img {
          border-radius: 60px;
          border: 1px solid rgb(241, 243, 244);
          width: 70px;
          height: 70px;
        }
      }
    }
    .playboxr {
      width: 314px;
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-wrap: nowrap;
      align-items: stretch;
      flex-direction: column;
      .name {
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 5px;
        justify-content: center;
        .alias {
          overflow: hidden;
          text-overflow: ellipsis;
          color: #888;
          margin-left: 4px;
        }
      }
      .audio {
        z-index: 1;
        margin: 0 auto;
      }
    }
  }
}
</style>
