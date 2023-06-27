<template>
    <div class="playList">
        <div class="playTopBox">
            <div class="nowplayText">
                <span class="nowplayTextL">当前播放</span>
                <span class="nowplayTextR">({{ $store.state.musicPlay.music.playList.length }})</span>
            </div>
        </div>
        <!-- TODO -->
        <ul class="list">
            <li class="item" v-for="(item,index) in $store.state.musicPlay.music.playList" :key="index">
                {{ item.name }}
                <span class="tns" v-if="item.tns">
                    ({{ item.tns[0] }})
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'playList',

        data() {
            return {};
        },

        mounted() {},

        methods: {},
    };
</script>

<style lang='scss' scoped>
    .playList {
        .playTopBox {
            .nowplayText {
                .nowplayTextL{
            
                }
                .nowplayTextR{
            
                }
            }
        }
        .list {
            .item {
                .tns {
                    
                }
            }
        }
    }
</style>