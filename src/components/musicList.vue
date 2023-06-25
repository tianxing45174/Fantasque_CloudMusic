<template>
  <div class="music-list">
    <div class="song" v-for="(item, i) in musicList" :key="i">
      <!-- 左 -->
      <div class="fl">
        <div :class="{ top3: i <= 2 }" class="rank" v-if="showNum">
          {{ i >= 9 ? i + 1 : "0" + (i + 1) }}
        </div>
        <div class="content">
          <!-- 歌名 -->
          <div class="name">
            <span> {{ item.name }} </span>
            <span class="alias" v-if="item.song.alias.length != 0">
              ({{
                item.song.alias[0] ? item.song.alias[0] : item.song.alia[0]
              }})
            </span>
          </div>
          <!-- 歌手 - 专辑 -->
          <div class="artist">
            <i class="maxBr" v-if="item.song.privilege.maxbr > 320000"></i>
            <span v-for="(artist, i) in item.song.artists" :key="i">
              {{ artist.name }}{{ i }}
              <i v-if="i != item.song.artists.length - 1">/</i>
            </span>
            -
            <span class="album-name">
              {{ item.song.album.name }}
            </span>
          </div>
        </div>
      </div>
      <!-- 右 -->
      <div class="fr">
        <!-- 播放按钮 -->
        <div class="play" @click="play(item)"></div>
      </div>
    </div>
    <div ref="loading" class="loading" v-if="musicList.length == 0 && showNum == false">
      加载中
    </div>
  </div>
</template>

<script>
export default {
  name: "musicList",
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    showNum: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      limit: 20,
    };
  },

  mounted() {
  },
  computed: {
    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    //...mapState(['sum','school','subject']),
    //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
    //...mapGetters(['bigSum'])
  },

  methods: {
    play(music) {
      this.$store.commit("ADDPLAYLIST",music)
    },
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  .loading {
    text-align: center;
    color: #999;
    padding-top: 10px;
    padding-bottom: 5px;
  }

  .song {
    display: flex;
    padding-left: 10px;
    border-bottom: 1px solid rgba(199, 171, 171, 0.2);
    margin: 10px 0;
    justify-content: space-between;

    .fl {
      display: flex;
      padding: 6px 0;
      flex: 1 1 auto;
      width: 0;

      .rank {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        font-size: 17px;
        color: #999;
        margin-left: -10px;
      }

      .top3 {
        color: #df3436;
      }

      .content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        flex: 1 1 auto;
        width: 0;

        .name {
          font-size: 17px;
          overflow: hidden;
          text-overflow: ellipsis;

          .alias {
            color: #888;
            margin-left: 4px;
          }
        }

        .artist {
          font-size: 12px;
          color: #888;
          overflow: hidden;
          text-overflow: ellipsis;

          .maxBr {
            display: inline-block;
            width: 12px;
            height: 8px;
            margin-right: 4px;
            background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=) no-repeat;
            background-size: 166px 97px;
          }
        }
      }
    }

    .fr {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      padding: 0 10px;

      .play {
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=) no-repeat;
        background-position: -24px 0;
        background-size: 166px 97px;
      }
    }
  }
}
</style>