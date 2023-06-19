<template>
  <div class="recommend">
    <title-border>编辑推荐</title-border>
    <div class="recommend-lists">
      <div class="recommend-list" v-for="item in recommendList" :key="item.id">
        <imgitem :item="item"></imgitem>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <title-border>最新音乐</title-border>
    <music-list
      :musicList="newSongsList"
      @playToRouter="$emit('playToApp', $event)"
    ></music-list>
  </div>
</template>

<script>
import titleBorder from "@/components/titleBorder.vue";
import imgitem from "@/components/imgitem.vue";
import musicList from "@/components/musicList.vue";
export default {
  components: { titleBorder, imgitem, musicList },
  name: "recommend",

  data() {
    return {
      recommendList: [],
      newSongsList: [],
    };
  },

  created() {
    this.getRecommendList();
    this.getNewSongs();
  },

  methods: {
    getRecommendList() {
      // 请求 推荐歌单
      this.$axios
        .get("/personalized?limit=6")
        .then((res) => {
          this.recommendList = res.data.result;
          // console.log('recommendList=', this.recommendList);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    getNewSongs() {
      // 请求 推荐新音乐
      this.$axios
        .get("/personalized/newsong")
        .then((res) => {
          this.newSongsList = res.data.result;
          // console.log('newSongsList=', this.newSongsList);
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
.recommend {
  padding-top: 20px;

  .recommend-lists {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 24px;

    .recommend-list {
      padding-right: 2px;
      padding-left: 0;
      width: 33.3%;
      margin-bottom: 16px;
      box-sizing: border-box;

      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 6px 2px 0 6px;
        min-height: 30px;
        line-height: 1.2;
        font-size: 13px;
      }
    }
  }
}
</style>