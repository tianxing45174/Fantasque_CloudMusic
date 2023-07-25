<template>
  <div class="ListDetail"  v-if="listDetail.length != 0">
    <div class="top">
      <div class="bar">
        <div class="barr">
          <div class="x" @click="$emit('toDetailStatus', false)">
            <van-icon name="arrow-left" size="24px" />
          </div>
          <div class="text">歌单</div>
        </div>
        <div class="barl">
          <div class="searchByList">
            <van-icon name="search" size="30px" />
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div
        class="img"
        :style="{
          '--bgurl': `url(${listDetail.coverImgUrl})`,
        }"
      >
        {{ Math.round(listDetail.playCount / 10000) + "万" }}
      </div>
      <div class="text">
        <div class="title">{{ listDetail.name }}</div>
        <div class="creator">{{ listDetail.creator.nickname }}</div>
        <div class="description">{{ listDetail.description }}</div>
      </div>
    </div>
    <!-- TODO 歌单歌曲 -->
    <div class="List">

    </div>

    <!-- TODO 歌单最近关注 -->
    <div class="text">
      <!-- {{ detail }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: "playListDetail",
  props: {
    detailID: Number,
    default: 0,
  },
  data() {
    return {
      listDetail: [],
    };
  },
  created() {
    this.getPlaylistDetail()

  },

  methods: {
    getPlaylistDetail(){
      this.$axios
      .get("/playlist/detail?id=" + this.detailID)
      .then((res) => {
        var listDetail = res.data.playlist;
        console.log(listDetail);
        this.listDetail = listDetail;

        var ids = listDetail.tracks.map(({id}) => {
          return id
        })
        this.getPlaylistMusic(ids.toString())
        // this.getPlaylistMusic(ids)

      })
      .catch((err) => {
        console.log(err);
      });
    },
    getPlaylistMusic(ids){

      console.log(ids);
      console.log("/song/url?id=" + ids );

      this.$axios
      .get("/song/url?id=" + ids)
      // .get("/song/url?id=" + ids[0])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>

<style lang='scss' scoped>
.ListDetail {
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background-color: #212121;
  color: #fff;
  .top {
    .bar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .barr {
        display: flex;
        align-items: center;
        .x {
          margin-right: 10px;
        }
        .text {
        }
      }
      .barl {
        .searchByList {
        }
      }
    }
  }
  .banner {
    margin: 20px 0;
    display: flex;
    .img {
      display: flex;
      flex-direction: row-reverse;
      background: var(--bgurl);
      padding: 4px;
      margin-right: 20px;
      box-sizing: border-box;
      height: 126px;
      width: 126px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 4px;
      font-size: 10px;
    }
    .text {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      text-overflow: ellipsis;
      overflow: hidden;

      width: 225px;
      .title {
        overflow: hidden;
      }
      .creator {
      }
      .description {
        margin-top: 12px;
        //显示两行
        overflow: hidden;
        text-overflow: ellipsis;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
      }
    }
  }
  .List {
  }
  .text {
  }
}
</style>