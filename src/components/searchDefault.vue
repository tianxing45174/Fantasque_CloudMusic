<template>
  <div class="default">
    <div class="hotlist">
      <div class="title">热门搜索</div>
      <div class="list">
        <li class="item" v-for="(item, i) in hotsList" :key="i">
          <span @click="hotlistsearch(item.first)">{{ item.first }}</span>
        </li>
      </div>
    </div>
    <div class="history">
      <div class="list">
        <div class="item"></div>
        <div class="history-l"></div>
        <div class="history-r"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchdefault",

  data() {
    return {
      hotsList: []
    };
  },

  created() {
    this.gethotsList()
  },

  methods: {
    gethotsList(){
      this.$axios.get("/search/hot")
      .then((res) => {
        // console.log(res.data.result.hots);
        this.hotsList = res.data.result.hots
      })
    },
    hotlistsearch(value) {
      // console.log("value");
      this.$emit('searchFromHotlist', value)
    },
  },
};
</script>

<style lang="scss" scoped>
.default {
  .hotlist {
    padding: 15px 10px 0;
    display: block;
    -webkit-text-size-adjust: 100%;

    .title {
      font-size: 12px;
      line-height: 12px;
      color: #666;
      font-weight: 400;
      margin-bottom: 5px;
    }
    .list{
      margin: 10px 0 7px;

    .item {
      border: 1px solid #999;
      position: relative;
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border-color: #d3d4da;
      border-radius: 32px;

      &::after {
        border-color: #d3d4da;
        border-radius: 32px;
        width: 200%;
        height: 200%;
        transform: scale(.5);
        border-width: 1px;
        position: absolute;
        z-index: 2;
        content: "";
        top: 0;
        left: 0;
        pointer-events: none;
        box-sizing: border-box;
        transform-origin: top left;
        border: 0 solid rgba(0, 0, 0, .1);
      }
      
    }
    }
  }

  .history {
    .list {
      .item {}

      .history-l {}

      .history-r {}
    }
  }
}
</style>