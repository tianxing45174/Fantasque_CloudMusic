<template>
  <div class="default">
    <div class="hotlist">
      <div class="title">热门搜索</div>
      <div class="list">
        <li class="item" v-for="(item, i) in hotsList" :key="i">
          <span @click="clickSearch(item.first)">{{ item.first }}</span>
        </li>
      </div>
    </div>
    <div class="history">
      <div class="list" v-for="(item, i) in historyList" :key="i">
        <li class="item">
          <i class="history-icon"></i>
          <div class="history-r">
            <span class="first" @click="clickSearch(item)">{{ item }}</span>
            <span class="close" @click.stop="deleteHistoey(item)">X</span>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchdefault",
  props: {},
  data() {
    return {
      hotsList: [],
      historyList: [],
    };
  },

  created() {
    this.gethotsList();
    if (window.localStorage.getItem("searchHostory") != null) {
      this.historyList = window.localStorage
        .getItem("searchHostory")
        .split(",");
    }
    // console.log("historyList", this.historyList);
  },

  methods: {
    gethotsList() {
      this.$axios.get("/search/hot").then((res) => {
        this.hotsList = res.data.result.hots;
      });
    },
    clickSearch(value) {
      this.$emit("searchFromComponent", value);
    },
    deleteHistoey(item) {
      console.log(this.historyList.length);
      if (this.historyList.length == 1) {
        window.localStorage.removeItem("searchHostory");
        this.historyList = []
      } else {
        this.historyList.splice(this.historyList.indexOf(item), 1);
        window.localStorage.setItem("searchHostory", this.historyList);
      }
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
    .list {
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
          transform: scale(0.5);
          border-width: 1px;
          position: absolute;
          z-index: 2;
          content: "";
          top: 0;
          left: 0;
          pointer-events: none;
          box-sizing: border-box;
          transform-origin: top left;
          border: 0 solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .history {
    display: block;
    .list {
      .item {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 45px;
        list-style: none;
        .history-icon {
          margin: 0 10px;
          width: 15px;
          height: 15px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
          display: inline-block;
          vertical-align: middle;
          background-position: 0 0;
          background-size: contain;
          background-repeat: no-repeat;
        }

        .history-r {
          position: relative;
          -webkit-box-flex: 1;
          flex: 1;
          width: 1%;
          align-items: center;
          height: 45px;
          display: flex;
          -webkit-box-align: center;
          .first {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
            margin-right: 10px;
            flex: 1;
            width: 1%;
            -webkit-box-flex: 1;
          }
          .close {
            display: block;
            margin-right: 6px;
            text-align: center;
            line-height: 20px;
            width: 20px;
            height: 20px;
            border: #666 solid 1px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>