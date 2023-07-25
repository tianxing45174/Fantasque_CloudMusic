<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view
      class="router"
      :class="playafter()"
      @toMusicDetail="musicDetailShow"
    ></router-view>
    <!-- TODO 歌单 -->
    <transition name="fullscreenchange">
      <play-list-detail
        v-if="detailStatus"
        @toDetailStatus="detailStatus = false"
        :detailID="detailID"
      ></play-list-detail>
    </transition>
    <div class="playbox">
      <div
        class="playmusic"
        v-if="music.playList.length != 0"
        @click="toggleFullScreen"
      >
        <div class="playimg">
          <img
            :src="music.thisPlay.music.song.album.picUrl + '?param=200y200'"
            alt=""
          />
        </div>
        <div class="playboxr">
          <!-- 歌名 -->
          <div
            class="name"
            :class="
              Array.from(`${music.thisPlay.music.name}`).length >= 25
                ? 'textAnima'
                : ''
            "
          >
            <span> {{ music.thisPlay.music.name }} </span>
            <span
              class="alias"
              v-if="music.thisPlay.music.song.alias.length != 0"
              >({{
                music.thisPlay.music.song.alias[0]
                  ? music.thisPlay.music.song.alias[0]
                  : music.thisPlay.music.song.alia[0]
              }})
            </span>
          </div>
          <audio
            class="audio"
            ref="AppAudio"
            @canplay="canplaysong"
            @timeupdate="updateCurrentTime"
            @ended="endToPlayNextMusic"
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
        ref="fullscreenInAPP"
        v-if="music.FullScreenShow && music.playList.length != 0"
      ></full-screen>
    </transition>
  </div>
</template>

<script>
import FullScreen from "./components/fullScreen.vue";
import navView from "./components/navView.vue";
import PlayListDetail from "./components/playListDetail.vue";
import { mapState } from "vuex";
export default {
  components: { navView, FullScreen, PlayListDetail },
  data() {
    return {
      isShowPlay: false,
      detailStatus: false,
      detailID: 0,
    };
  },
  mounted() {},
  updated() {},
  computed: {
    ...mapState("musicPlay", ["music"]),
    playafter() {
      return (index) => {
        return {
          "play-after": this.music.playBoxStatus === true,
        };
      };
    },
  },
  methods: {
    //显示歌单
    musicDetailShow(item) {
      this.detailID = item.id;
      this.detailStatus = true;
    },
    //播放器组件加载完成后触发
    canplaysong() {
      this.$store.state.musicPlay._refs = this.$refs;
      var min = Math.trunc(this.$refs.AppAudio.duration / 60);
      var second = Math.trunc(this.$refs.AppAudio.duration % 60);
      if (min < 10) {
        min = "0" + min;
      }
      if (second < 10) {
        second = "0" + second;
      }
      this.$store.state.musicPlay.music.playTotalTime = min + ":" + second;
      this.$store.state.musicPlay.music.playTotalTimeBySecond = Math.trunc(
        this.$refs.AppAudio.duration
      );
    },

    //播放时间变化事件触发
    updateCurrentTime() {
      var min = Math.trunc(this.$refs.AppAudio.currentTime / 60);
      var second = Math.trunc(this.$refs.AppAudio.currentTime % 60);
      min = "0" + min;
      if (second < 10) {
        second = "0" + second;
      }
      this.$store.state.musicPlay.music.playTime = min + ":" + second;
      this.$store.state.musicPlay.music.playTimeBySecond =
        this.$refs.AppAudio.currentTime;
      if (this.$store.state.musicPlay.music.FullScreenShow) {
        this.$refs.fullscreenInAPP.lyricRoll();
      }
    },
    //显示
    toggleFullScreen() {
      this.$store.state.musicPlay.music.FullScreenShow =
        !this.$store.state.musicPlay.music.FullScreenShow;
    },
    endToPlayNextMusic() {
      if (this.$store.state.musicPlay.music.model == 3) {
        this.$store.state.musicPlay._refs.AppAudio.load();
      } else {
        this.$store.commit("musicPlay/PLAYNEXT");
      }
      if (this.$store.state.musicPlay.music.FullScreenShow) {
        this.$refs.fullscreenInAPP.getLyricData();
      }
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
    margin-bottom: 101px;
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
    z-index: 100;

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
      height: 101px;
      .playimg {
        margin: 0 auto;
        img {
          border-radius: 60px;
          border: 1px solid rgb(241, 243, 244);
          width: 70px;
          height: 70px;
          // z-index: ;
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
        margin-top: 5px;
        justify-content: center;
        animation: playboxr 10s linear infinite;
        flex-direction: column;
        .alias {
          overflow: hidden;
          text-overflow: ellipsis;
          color: #888;
          margin-left: 4px;
        }
      }

      .textAnima {
        animation: songName 10s linear infinite;
      }
      @keyframes songName {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-100%));
        }
      }
      .audio {
        z-index: 100;
        margin: 0 auto;
      }
    }
  }
}
</style>
