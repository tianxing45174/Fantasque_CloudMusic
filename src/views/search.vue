<template>
  <div class="search">
    <div class="inputbtn">
      <div class="inputcover">
        <i class="inputicon"></i>
        <input
          type="search"
          name="search"
          @input="change"
          class="input"
          v-model="value"
          @keyup.enter="submit"
        />
        <div class="holder" v-if="value == ''">搜索歌曲、歌手、专辑</div>
        <div class="close" @click="clearvalue" v-if="!(value == '')">
          <!-- <div class="close"> -->
          <i class="empty"></i>
        </div>
      </div>
    </div>
    <component
      :is="type"
      :musicList="searchSongsList"
      @searchFromHotlist="hotListSearch($event)"
      @playToRouter="$emit('playToApp', $event)"
    ></component>
  </div>
</template>

<script>
import SearchDefault from "@/components/searchDefault.vue";
import MusicList from "@/components/musicList.vue";
export default {
  name: "search",
  components: { SearchDefault, MusicList },

  data() {
    return {
      value: "",
      type: "SearchDefault",
      searchSongsList: [],
    };
  },

  mounted() {},
  watch: {
    value: {
      handler(newValue, oldValue) {
        if (newValue == "") {
          this.type = "SearchDefault";
        }
      },
    },
  },

  methods: {
    change(e) {
      // console.log("value",this.value);
    },
    hotListSearch(value) {
      // console.log('e',value);
      this.value = value;
      this.submit();
    },
    submit(e) {
      this.$axios
        .get("/cloudsearch?keywords=" + this.value)
        .then((res) => {
          // console.log(res.data.result.songs);
          this.searchSongsList = res.data.result.songs.map((item, index) => {
            item.song = {
              alias: item.alia,
              privilege: item.privilege,
              artists: item.ar,
              album: item.al,
            };
            return item;
          });
          // console.log('searchSongsList',this.searchSongsList);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
          // alert("请求失败")
        });

      var searchHistoryList;
      var index;
      //搜索历史为空
      if (
        (searchHistoryList = window.localStorage.getItem("searchHostory")) ==
        null
      ) {
        window.localStorage.setItem("searchHostory", [this.value]);
      } else {
        searchHistoryList = searchHistoryList.split(",");
        //判断是否曾经搜索过此歌
        if ((index = searchHistoryList.indexOf(this.value)) == -1) {
          //搜索历史中没有此歌
          if (searchHistoryList.length==6) {
            //历史超过6删除最早的历史
            searchHistoryList.pop()
          }
          searchHistoryList.unshift(this.value);
        } else {
          //如果曾经搜索过此歌
          searchHistoryList.splice(index, 1);
          searchHistoryList.unshift(this.value);
        }
        window.localStorage.setItem("searchHostory", searchHistoryList);
      }
      console.log(searchHistoryList);
      this.type = "MusicList";
    },
    clearvalue() {
      this.value = "";
      this.type = "SearchDefault";
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  .inputbtn {
    position: relative;
    padding: 15px 10px;

    .inputcover {
      position: relative;
      width: 100%;
      height: 30px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #ebecec;
      border-radius: 30px;

      .inputicon {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 9px;
        margin: 0 8px;
        vertical-align: middle;
        width: 13px;
        height: 13px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
        background-position: 0 0;
        background-size: contain;
        background-repeat: no-repeat;
      }

      .input {
        width: 100%;
        height: 30px;
        line-height: 18px;
        background: rgba(0, 0, 0, 0);
        font-size: 14px;
        color: #333;
        -webkit-appearance: none;
        border-radius: 0;
        border: 0;
        outline: 0;
        margin: 0;
        padding: 0;
      }

      .holder {
        position: absolute;
        left: 30px;
        top: 5px;
        font-size: 14px;
        color: #c9c9c9;
        background: rgba(0, 0, 0, 0);
        pointer-events: none;
        cursor: default;
      }

      .close {
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-user-select: none;
        margin: 0;
        padding: 0;

        .empty {
          position: relative;
          right: 50%;
          top: 30%;
          display: inline-block;
          width: 14px;
          height: 14px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
          vertical-align: middle;
          background-position: 0 0;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }

    &::after {
      border-bottom-width: 1px;
      width: 200%;
      height: 200%;
      transform: scale(0.5);
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
</style>