<template>
  <div
    class="fullScreenBox"
    :style="{ '--bgurl': `url(${playmusic.song.album.picUrl}?param=200y200)`}"
    @click="playListStatus = false"
    >
    <div class="Inner">
      <div class="fullScreenHeader">
        <van-icon
          class="x"
          name="arrow-down"
          @click.stop="music.FullScreenShow = 0"
        />
        <div class="Name">
          <div
            class="songName"
            :class="
              Array.from(`${playmusic.name}` + `${playmusic.name}`).length >= 34
                ? 'textAnima'
                : ''
            "
          >
            {{ playmusic.name }}
          </div>
          <div class="arName">
            <span
              v-for="(item, index) in music.thisPlay.music.song.artists"
              :key="index"
            >
              {{ item.name }}
              <span v-if="index < music.thisPlay.music.song.artists.length - 1"
                >/</span
              >
            </span>
          </div>
        </div>
        <!-- <div class="forward">分享</div> -->
        <svg
          t="1687655798202"
          class="icon forward"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1569"
          width="25"
          height="25"
        >
          <path
            d="M288 373.333333c-82.432 0-149.333333 66.922667-149.333333 149.333334a149.333333 149.333333 0 0 0 149.333333 149.333333c82.496 0 149.333333-66.816 149.333333-149.333333 0-82.410667-66.88-149.333333-149.333333-149.333334z m0 64c47.104 0 85.333333 38.250667 85.333333 85.333334 0 47.146667-38.186667 85.333333-85.333333 85.333333a85.333333 85.333333 0 1 1 0-170.666667zM757.333333 672a128.021333 128.021333 0 1 0 128 128c0-70.656-57.344-128-128-128z m0 64a64.021333 64.021333 0 1 1-64 64c0-35.328 28.672-64 64-64zM757.333333 117.333333a128.021333 128.021333 0 1 0 128 128c0-70.656-57.344-128-128-128z m0 64a64.021333 64.021333 0 1 1-64 64c0-35.328 28.672-64 64-64z"
            fill="#ffffff"
            p-id="1570"
          ></path>
          <path
            d="M356.565333 580.864a32 32 0 0 1 43.904-10.965333l266.666667 160a32 32 0 0 1-32.938667 54.869333l-266.666666-160a32 32 0 0 1-10.965334-43.904zM643.050667 264.789333a32 32 0 0 1 36.565333 52.522667l-256 178.282667a32 32 0 0 1-36.565333-52.522667l256-178.282667z"
            fill="#ffffff"
            p-id="1571"
          ></path>
        </svg>
      </div>
      <div class="soundVolume">
        <van-icon class="icon" color="#fff" size="14px" name="volume" />
        <van-slider
          class="slider"
          v-model="soundValue"
          @change="soundVolumeChange"
          step="0.01"
          max="1"
          button-size="8px"
          active-color="#fff"
          inactive-color="#999"
        />
      </div>
      <div class="boxBody" @click="changeLyricOrRecord">
        <ul class="bodyInner" v-show="lyricOrRecord" ref="lyricBox">
          <div ref="loading" class="loading" v-if="lyricList.length == 0">
            加载中
          </div>
          <li
            class="lyricText"
            :class="
              music.playTimeBySecond > item.time &&
              music.playTimeBySecond < item.nextTime
                ? 'active'
                : 'inactive'
            "
            :ref="
              music.playTimeBySecond > item.time &&
              music.playTimeBySecond < item.nextTime
                ? 'lyricroll'
                : ''
            "
            v-for="(item, index) in lyricList"
            :key="index"
          >
            {{ item.lyric == "" ? "————    间奏    ————" : item.lyric }}
          </li>
        </ul>
        <div
          class="record recordAnima"
          :class="music.playStatus ? 'recordAnimaStop' : 'recordAnimaStart'"
          v-show="!lyricOrRecord"
        >
          <div class="song-tur"></div>
          <div
            class="img"
            :style="{
              '--bgurl': `url(${playmusic.song.album.picUrl}?param=200y200)`,
            }"
          ></div>
        </div>
      </div>
      <div class="musicBar">
        <span class="nowTime">
          {{ music.playTime }}
        </span>
        <span class="timeBar">
          <van-slider
            v-model="music.playTimeBySecond"
            :max="music.playTotalTimeBySecond"
            button-size="6px"
            step="0.01"
            @change="changeCurrentTime"
          />
        </span>
        <span class="totalTime">
          {{ music.playTotalTime }}
        </span>
      </div>
      <div class="boxFooter">
        <div @click.stop="changePlayModel">
          <van-icon
            v-if="music.model == 1"
            size="30px"
            color="#fff"
            name="exchange"
          />
          <van-icon
            v-else-if="music.model == 2"
            size="30px"
            color="#fff"
            name="revoke"
          />
          <van-icon
            v-else-if="music.model == 3"
            size="30px"
            color="#fff"
            name="replay"
          />
        </div>
        <div class="togglePlay">
          <van-icon
            size="30px"
            color="#fff"
            name="arrow-left"
            @click.stop="playPre"
          />
          <van-icon
            v-if="music.playStatus"
            size="50px"
            color="#fff"
            name="play-circle-o"
            @click.stop="changePlayStatus(true)"
          />
          <van-icon
            v-else
            size="50px"
            color="#fff"
            name="pause-circle-o"
            @click.stop="changePlayStatus(false)"
          />
          <van-icon
            size="30px"
            color="#fff"
            name="arrow"
            @click.stop="playNext"
          />
        </div>
        <van-icon
          class="lists"
          size="30px"
          name="orders-o"
          @click.stop="showPlayList"
        />
      </div>
    </div>
    <transition name="PlayListAnima">
      <div class="PlayList" v-show="playListStatus">
        <play-list @click.stop="" class="List"></play-list>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from "vant";
import PlayList from "./playList.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "fullScreen",
  components: { Icon, PlayList },
  data() {
    return {
      lyricList: [],
      soundValue: 0,
      musicCurrentTime: 0,
      playListStatus: false,
      totalTime: "",
      thisAppAudio: {},
      lyricOrRecord: false,
      ScreenValue: 0,
      updatePlayBox: false,
    };
  },
  props: {
    playmusic: {
      type: Object,
      default: {},
    },
  },
  created() {
    this.getLyricData();
  },
  mounted() {
    //保存播放状态
    this.$store.state.musicPlay.music.playStatus =
      this.$store.state.musicPlay._refs.AppAudio.paused;
    //保存当前播放时间
    this.musicCurrentTime =
      this.$store.state.musicPlay._refs.AppAudio.currentTime;
    //保存播放音量
    this.soundValue = this.$store.state.musicPlay._refs.AppAudio.volume;
  },
  beforeUpdate() {},
  methods: {
    lyricRoll() {
      if (this.ScreenValue != this.$refs.lyricroll[0].offsetTop - 315) {
        this.ScreenValue = this.$refs.lyricroll[0].offsetTop - 315;
        this.$refs.lyricBox.scrollTo({
          top: this.ScreenValue,
          behavior: "smooth",
        });
      }
    },
    //显示歌词或唱片
    changeLyricOrRecord() {
      this.lyricOrRecord = !this.lyricOrRecord;
    },
    // ...mapMutations("musicPlay",{playPre:"PLAYPRE"}),
    showPlay() {
      this.$emit("showPlay");
    },
    //修饰歌词
    getLyricData() {
      this.updatePlayBox = false
      this.lyricList = [];
      this.$axios
        .get("/lyric?id=" + this.$store.state.musicPlay.music.thisPlay.music.id)
        .then((res) => {
          // console.log("res", res);
          let lyric = res.data.lrc.lyric;
          //把数组里的数据通过/n符分隔开
          let str = lyric.split("\n");
          //删除数组最后的空格符
          str.pop();
          //用正则匹配严谨
          let reg = /\[(\d+):(\d+\.\d+)]([\s\S.]*)/;
          //用map遍历过滤
          let lyricArray = str.map((item, i) => {
            //判断匹配
            if (reg.test(item)) {
              // console.log("item",item);
              //分钟数据
              let min = Number(RegExp.$1);
              //秒
              let s = parseFloat(RegExp.$2);
              //歌词
              let lyric = RegExp.$3;
              return {
                time: min * 60 + s,
                lyric: lyric,
              };
            }
          });
          lyricArray = lyricArray.map(({ time, lyric }, i) => {
            var nextTime;
            if (i == lyricArray.length - 1) {
              nextTime =
                this.$store.state.musicPlay.music.playTotalTimeBySecond;
            } else {
              nextTime = lyricArray[i + 1].time;
            }
            //判断匹配
            return {
              nextTime,
              time,
              lyric,
            };
          });
          // console.log(lyricArray);
          this.lyricList = lyricArray;
          this.updatePlayBox = true
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //拖动进度条
    changeCurrentTime(musicCurrentTime) {
      this.$store.state.musicPlay.music.playTime = musicCurrentTime;
      this.$store.state.musicPlay._refs.AppAudio.currentTime = musicCurrentTime;
    },
    //修改音量
    soundVolumeChange(value) {
      this.soundValue = value;
      this.$store.state.musicPlay._refs.AppAudio.volume = value;
    },
    //true 为暂停 false为播放
    changePlayStatus(value) {
      if (value) {
        // console.log("播放");
        this.$store.state.musicPlay._refs.AppAudio.play();
        this.$store.state.musicPlay.music.playStatus = false;
      } else {
        // console.log("暂停");
        this.$store.state.musicPlay._refs.AppAudio.pause();
        this.$store.state.musicPlay.music.playStatus = true;
      }
    },
    showPlayList() {
      this.playListStatus = !this.playListStatus;
    },
    //上一首
    playPre() {
      this.$store.commit("musicPlay/PLAYPRE");
      this.getLyricData();
    },
    //下一首
    playNext() {
      this.$store.commit("musicPlay/PLAYNEXT");
      this.getLyricData();
    },
    //改变播放模式
    changePlayModel() {
      if (this.$store.state.musicPlay.music.model == 3) {
        this.$store.state.musicPlay.music.model = 1;
      } else {
        this.$store.state.musicPlay.music.model++;
      }
    },
    // TODO 歌词滚动
  },
  computed: {
    ...mapState("musicPlay", ["music"]),
  },
};
</script>

<style lang="scss" scoped>
.fullScreenBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--bgurl);
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 101;
  /* 进入动画的第一帧 */
  .PlayListAnima-enter,
  .PlayListAnima-leave-to {
    transform: translateY(100%);
  }

  /* 进入动画的过程 */
  .PlayListAnima-enter-active,
  .PlayListAnima-leave-active {
    transition: all 0.3s ease-in;
  }

  /* 进入动画的第一帧 */
  .PlayListAnima-enter-to,
  .PlayListAnima-leave {
    transform: translateY(0);
  }
  &::before {
  }
  .Inner {
    backdrop-filter: blur(40px);
    background-color: rgba($color: #393939, $alpha: 0.6);
    height: 100%;
    .fullScreenHeader {
      height: 40px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0;
      .x {
        font-size: 20px;
        margin-left: 2%;
      }
      .Name {
        width: 80%;
        position: absolute;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        white-space: nowrap;
        word-wrap: break-word;
        word-break: normal;
        left: 40px;
        .songName {
          display: inline-block;
          font-size: 16px;
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
        .arName {
          font-size: 1px;
        }
      }

      .forward {
        margin-right: 2%;
      }
    }
    .soundVolume {
      display: flex;
      margin: 0 auto;
      width: 85%;
      align-items: center;
      justify-content: space-between;
      .icon {
        display: inline-block;
      }
      .slider {
        width: 90%;
      }
    }

    .boxBody {
      display: flex;
      justify-content: center;
      .recordAnima {
        animation: recordAnima 10s infinite linear;
        transform-origin: center center;
      }
      @keyframes recordAnima {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .recordAnimaStart {
        animation-play-state: running;
      }
      .recordAnimaStop {
        animation-play-state: paused;
      }
      .record {
        height: 520.412px;
        width: 100%;
        position: relative;
        .song-tur {
          position: absolute;
          width: 247px;
          height: 247px;
          margin: 136px 0 0 64px;
          z-index: 2;
          background-image: url(https://s3.music.126.net/mobile-new/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f=);
          background-size: contain;
        }
        .img {
          position: absolute;
          z-index: 1;
          margin: 168px 0 0 95px;
          width: 184px;
          height: 184px;
          border: #000 solid 2px;
          border-radius: 50%;
          background: var(--bgurl);
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
      .bodyInner {
        width: 100%;
        height: 78vh;
        padding: 50% 0;
        box-sizing: border-box;
        overflow: auto;
        text-align: center;
        .lyricText {
          margin: 20px 0;
        }
        .active {
          color: #fff;
        }
        .inactive {
          color: #999;
        }
        .loading {
          text-align: center;
          color: #fff;
          padding-top: 10px;
          padding-bottom: 5px;
        }
      }
    }
    .musicBar {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .nowTime {
        display: inline-block;
        margin-right: 6px;
        font-size: xx-small;
      }
      .timeBar {
        display: inline-block;
        width: 75%;
      }
      .totalTime {
        display: inline-block;
        margin-left: 6px;
        font-size: xx-small;
        color: #9a9a9a;
      }
    }
    .boxFooter {
      position: absolute;
      width: 100%;
      bottom: 0;
      margin: 2vh 0 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .togglePlay {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100px;
        .playbutton {
          color: #fff;
        }
      }
      .lists {
        color: #fff;
      }
    }
  }
  .PlayList {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    .List {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>