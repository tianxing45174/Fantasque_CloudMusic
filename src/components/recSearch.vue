<template>
  <div class="recSearch">
    <div class="recom">
      <ul>
        <li @click="clickSearch(item.keyword)" class="recomitem" v-for="(item, index) in recList" :key="index">
          <i class="icon"></i>
          <span class="btm">
            {{ item.keyword }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "recSearch",
  props: {
    recSearchList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      recList: []
    };
  },

  created() {
  },
  watch: {
    recSearchList: {
      handler(newValue, oldValue) {
        this.recList = newValue
      },
    }
  },

  methods: {
    clickSearch(value){
      this.$emit("searchFromComponent",value)
    }
  },
};
</script>
  
<style lang="scss" scoped>
.recSearch {
  background: #fbfcfd;

  .recom {
    margin: 0 auto;

    .recomitem {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 45px;
      padding-left: 10px;
      border-bottom: 1px solid rgba($color: #e4e4e4, $alpha: 0.5);
      .icon {
        -webkit-box-flex: 0;
        flex: 0 0 auto;
        margin-right: 7px;
        width: 15px;
        height: 15px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=);
        display: inline-block;
        vertical-align: middle;
        background-position: 0 0;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .btm {
        position: relative;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        flex: 1;
        width: 1%;
        padding-right: 10px;
        font-size: 15px;
        line-height: 45px;
        color: #333;
      }
    }

  }
}
</style>