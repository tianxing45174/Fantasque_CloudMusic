<template>
  <div class="hotRank">
    <div class="hotop">
      <div class="hotopct">
        <!-- 热歌榜icon -->
        <div class="hoticon"></div>
        <!-- 热歌榜更新时间 -->
        <div class="hottime">更新日期：{{ updateTime }}</div>
      </div>
    </div>
    <div class="hotcont">
      <music-list
        :musicList="showList"
        :showNum="true"
      ></music-list>
    </div>
    <div
      ref="loading"
      class="loading"
      v-if="!(limit >= hotSongsList.length) || !(hotSongsList == [])"
    >
      加载中
    </div>
    <div class="loading" v-else>没有更多了</div>
  </div>
</template>

<script>
import musicList from "@/components/musicList.vue";
export default {
  name: "hotRank",

  components: { musicList },

  data() {
    return {
      hotSongsList: [],
      limit: 20,
      updateTime: "",
      timer: null, //timer 作为计时清除依据
    };
  },

  computed: {
    showList() {
      return this.hotSongsList.slice(0, this.limit);
    },
  },

  created() {
    this.getHotListDetail();
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.scrollBottomRefresh);
    });
  },
  updated() {
    // console.log('updated',this.limit);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollBottomRefresh);
  },

  methods: {
    scrollBottomRefresh(e) {
      var delay = 1500; // 时间间隔 防反跳 最后一次调用时刻的delay毫秒之后执行

      if (this.limit < this.hotSongsList.length) {
        let $scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let $offsetTop = this.$refs.loading.offsetTop;
        let $offsetHeight = this.$refs.loading.offsetHeight;
        let $innerHeight = window.innerHeight;
        // 防反跳
        clearTimeout(this.timer);
        if (this.timer === null) {
          //时间间隔外立即执行
          if ($innerHeight >= $offsetTop - $offsetHeight - $scrollTop) {
            this.limit += 20;
          }
          this.timer = 0;
          return;
        }
        this.timer = setTimeout(() => {
          if ($innerHeight >= $offsetTop - $offsetHeight - $scrollTop) {
            this.limit += 20;
          }
          //初始化timer 作为计时清除依据
          this.timer = null;
        }, delay);
      }

      // if (this.limit < this.hotSongsList.length) {
      //     let relative = 100 // 相对距离
      //     // 防反跳
      //     clearTimeout(this.timer)
      //     if (this.timer === null) {
      //         //时间间隔外立即执行
      //         if (this.getScrollTop() + this.getWindowHeight() >= this.getScrollHeight() - relative) {
      //         // console.log('Refresh');
      //         this.limit += 20
      //         // console.log(this.limit);
      //     }
      //         this.timer = 0
      //         return
      //     }
      //     this.timer = setTimeout(() => {
      //         if (this.getScrollTop() + this.getWindowHeight() >= this.getScrollHeight() - relative) {
      //         // console.log('Refresh');
      //         this.limit += 20
      //         // console.log(this.limit);
      //     }
      //         //初始化timer 作为计时清除依据
      //         this.timer = null
      //     }, delay);

      // }
    },
    // //滚动条在Y轴上的滚动距离
    // getScrollTop() {
    //     return document.body.scrollTop + document.documentElement.scrollTop
    // },
    // //文档的总高度
    // getScrollHeight() {
    //     return document.documentElement.scrollHeight
    // },
    // //浏览器视口的高度
    // getWindowHeight() {
    //     return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight
    // }
    getHotListDetail() {
      //获取热歌榜id
      this.$axios
        .get("/toplist")
        .then((res) => {
          let hotlist = res.data.list.filter(({ name }) => name == "热歌榜")[0];
          let date = new Date(hotlist.trackUpdateTime);
          let month_;
          let day_;
          if ((month_ = date.getMonth() + 1) < 10) {
            month_ = "0" + month_;
          }
          if ((day_ = date.getDate()) < 10) {
            day_ = "0" + day_;
          }
          this.updateTime = month_ + "月" + day_ + "日";
          var hotlistid = hotlist.id;
          // console.log('hotlist.id',hotlist.id);
          // console.log(this.updateTime);
          //获取热歌榜歌单
          this.$axios
            .get("/playlist/detail?id=" + hotlistid)
            .then((res) => {
              this.hotSongsList = res.data.playlist.tracks.map(
                (item, index) => {
                  item.song = {
                    alias: item.alia,
                    privilege: res.data.privileges[index],
                    artists: item.ar,
                    album: item.al,
                  };
                  return item;
                }
              );
              // console.log(res.data.playlist.tracks);
              // console.log(this.hotSongsList);
            })
            .catch(function (error) {
              // 请求失败处理
              console.log(error);
              // alert("请求失败")
            });
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.hotRank {
  .hotop {
    position: relative;
    padding-top: 38.9%;
    overflow: hidden;
    background: url(https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=)
      no-repeat;
    background-size: contain;

    &.hotop:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .hotopct {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      padding-left: 20px;
      box-sizing: border-box;

      .hoticon {
        width: 142px;
        height: 67px;
        background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
          no-repeat;
        background-size: 166px 97px;
        background-position: -24px -30px;
      }

      .hottime {
        margin-top: 10px;
        color: hsla(0, 0%, 100%, 0.8);
        font-size: 12px;
        transform: scale(0.91);
        transform-origin: left top;
      }
    }
  }

  .loading {
    text-align: center;
    color: #999;
    padding-top: 10px;
    padding-bottom: 5px;
  }
}
</style>