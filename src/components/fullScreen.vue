<template>
  <div
    class="fullScreenBox"
    :style="{ '--bgurl': `url(${playmusic.picUrl}?param=200y200)` }"
  >
    <div class="Inner">
      <div class="fullScreenHeader">
        <!-- <div class="x" @click="showPlay">x</div> -->
        <van-icon class="x" name="arrow-down" @click="showPlay" />
        <div class="songName">{{ playmusic.name }}</div>
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
      <div class="boxBody">
        <ul class="bodyInner">
          <div ref="loading" class="loading" v-if="lyricList.length == 0">
            加载中
          </div>
          <li
            :class="index % 2 == 0 ? 'inactive' : 'active'"
            v-for="(item, index) in lyricList"
            :key="item.time"
          >
            {{ item.lyric }}
          </li>
        </ul>
      </div>
      <div class="boxFooter">
        <div @click="changePlayModel">
          <option value="">顺序</option>
          <option value="">随机</option>
          <option value="">单曲循环</option>
        </div>
        <div class="togglePlay">
          <van-icon size="30px" color="#fff" name="arrow-left" @click="playPre" />
          <van-icon size="50px" color="#fff" name="play-circle-o" @click="changePlayStatus"/>
          <van-icon size="30px" color="#fff" name="arrow" @click="playNext" />
        </div>
        <van-icon class="lists" size="30px" name="orders-o" @click="showPlayList"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "fullScreen",
  components: { Icon },
  data() {
    return {
      lyricList: [],
    };
  },
  props: {
    playmusic: {
      type: Object,
      default: {},
    },
  },
  methods: {
    showPlayList() {
      var playList = window.localStorage.getItem("playList");
      console.log("playList", playList);
    },
    showPlay() {
      this.$emit("showPlay");
    },
    getLyricData() {
      // console.log(this.playmusic.id);
      this.lyricList = [];
      this.$axios
        .get("/lyric?id=" + this.playmusic.id)
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
          this.lyricList = lyricArray;
          // console.log('newlyricList',this.lyricList);
        })
        .catch((err) => {
          console.log(err);
        });
    },


    changePlayStatus(){
      var val = {
        music:"aaa",
        index:9
      }
      this.$store.dispatch("AddPlayList",val)
    },
    playPre() {},
    playNext() {},
    changePlayModel() {}
  },
  created() {
    // console.log("playmusic", this.playmusic);
    this.getLyricData();
  },
  computed: {
    // ScreenBoxImage() {
    //   return {'background-image': 'url(${'+this.playmusic.picUrl+'}?param=200y200)'}
    // }
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
  z-index: 99;
  &::before {
    // background: var(--bgurl);
    // background-size: cover;
    // background-repeat: no-repeat;
  }
  .Inner {
    backdrop-filter: blur(40px);
    background-color: rgba($color: #393939, $alpha: 0.2);
    height: 100%;
    .fullScreenHeader {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0;
      .x {
        font-size: 20px;
        margin-left: 2%;
      }

      .songName {
        word-wrap: break-word;
        word-break: normal;
        font-size: 16px;
      }

      .forward {
        margin-right: 2%;
      }
    }

    .boxBody {
      display: flex;
      justify-content: center;

      ul {
        .active {
          color: #fff;
        }
        .inactive {
          color: #999;
        }
      }
      .bodyInner {
        width: 100%;
        height: 80vh;
        padding: 10px;
        overflow: auto;
        text-align: center;

        .loading {
          text-align: center;
          color: #fff;
          padding-top: 10px;
          padding-bottom: 5px;
        }
      }
    }

    .boxFooter {
      margin: 2vh 0;
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
}
</style>