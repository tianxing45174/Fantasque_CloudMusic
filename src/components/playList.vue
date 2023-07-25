<template>
  <div class="outer" @click.stop="">
    <div class="playList">
      <div class="playTopBox">
        <div class="nowplayText">
          <span class="nowplayTextL">当前播放</span>
          <span class="nowplayTextR">({{ music.playList.length }})</span>
        </div>
        <div class="topBottomBar">
          <div class="model" @click.stop="changePlayModel">
            <div class="modelIcon" v-if="music.model == 1">
              <van-icon
                size="16px"
                class="icon"
                color="#b2b2b2"
                name="exchange"
              />
              <span class="text">列表循环</span>
            </div>
            <div class="modelIcon" v-if="music.model == 2">
              <van-icon
                size="16px"
                class="icon"
                color="#b2b2b2"
                name="revoke"
              />
              <span class="text">随机播放</span>
            </div>
            <div class="modelIcon" v-if="music.model == 3">
              <van-icon
                size="16px"
                class="icon"
                color="#b2b2b2"
                name="replay"
              />
              <span class="text">单曲循环</span>
            </div>
          </div>
          <div class="closeAll">
            <van-icon
              name="delete-o"
              size="16px"
              color="#b2b2b2"
              @click="deleteAllPlayMusic"
            />
          </div>
        </div>
      </div>
      <!-- 播放列表 -->
      <ul class="list">
        <li
          class="item"
          v-for="(item, index) in music.playList"
          :key="index"
          @click="changePlayMusic(index)"
          :class="music.thisPlay.index == index ? 'active' : 'inactive'"
        >
          <div class="music">
            <span class="name">{{ item.name }}</span>
            <span class="tns" v-if="item.tns"> ({{ item.tns[0] }}) </span>
            <span class="artist">
              -
              <span v-for="(artist, i) in item.song.artists" :key="i">
                {{ artist.name }}
                <i v-if="i != item.song.artists.length - 1">/</i>
              </span>
            </span>
          </div>
          <van-icon
            size="16px"
            name="cross"
            class="icon"
            @click.stop="deletePlayMusic(index)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "playList",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    changePlayModel() {
      if (this.$store.state.musicPlay.music.model == 3) {
        this.$store.state.musicPlay.music.model = 1;
      } else {
        this.$store.state.musicPlay.music.model++;
      }
    },
    deleteAllPlayMusic() {
      this.$store.commit("musicPlay/DELETEPLAYMUSIC", "ALL");
    },
    deletePlayMusic(index) {
      this.$store.commit("musicPlay/DELETEPLAYMUSIC", index);
    },
    // TODO 
    changePlayMusic(index) {
      this.$store.commit("musicPlay/CHANGEPLAYMUSIC", index);
    },
  },
  computed: {
    ...mapState("musicPlay", ["music"]),
  },
};
</script>

<style lang='scss' scoped>
.outer {
  height: 70%;
  .playList {
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    width: 90%;
    color: #fff;
    background-color: #232323;
    border-radius: 20px;
    margin: 0 auto;
    .playTopBox {
      .nowplayText {
        display: flex;
        align-items: center;
        .nowplayTextL {
          font-size: 16px;
          margin-right: 4px;
        }
        .nowplayTextR {
          font-size: 12px;
          color: #9a9a9a;
        }
      }
      .topBottomBar {
        display: flex;
        justify-content: space-between;
        margin: 6px 0;
        .model {
          .modelIcon {
            display: flex;
            align-items: center;
            .icon {
            }
            .text {
              color: #fff;
              font-size: 13px;
            }
          }
        }
        .closeAll {
        }
      }
    }
    .list {
      height: 85%;
      overflow-y: auto;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      .item {
        display: flex;
        height: 40px;
        justify-content: space-between;
        align-items: center;
        color: #b2b2b2;
        .music {
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          white-space: nowrap;
          word-break: normal;
          color: #b2b2b2;
          font-size: 6px;
          width: 80%;
          .name {
            color: #fff;
            font-size: 14px;
          }
          .tns {
          }
          .artist {
            color: #b2b2b2;
          }
        }
        .icon {
        }
      }
      .active {
        .music {
          color: red;
          .name {
            color: red;
            font-size: 14px;
          }
          .artist {
            color: red;
          }
        }
      }
    }
  }
}
</style>