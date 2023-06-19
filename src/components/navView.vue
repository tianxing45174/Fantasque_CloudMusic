<template>
  <div class="nav">
    <router-link to="/"><span>推荐音乐</span></router-link>
    <router-link to="/hotRank"><span>热歌榜</span></router-link>
    <router-link to="/search"><span>搜索</span></router-link>
  </div>
</template>

<script>
export default {
  name: "navView",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #fff;
  display: flex;
  position: fixed;
  flex: 1;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 99;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgba($color: #cdcdcd, $alpha: 1);

  a {
    flex: 1;
    text-align: center;
    font-style: 15px;

    span {
      height: 40px;
      padding: 0 5px;
      display: inline-block;
      box-sizing: border-box;
    }

    &.router-link-exact-active span {
      color: #dd001b;
      border-bottom: 1px solid #dd0018;
    }
  }
}
</style>