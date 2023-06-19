<template>
    <div class="titleBorder">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'titleBorder',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
    .titleBorder {
        height: 20px;
        line-height: 20px;
        font-size: 17px;
        padding-left: 9px;
        margin-bottom: 14px;
        &::after {
            content: "";
            position: absolute;
            left: 0px;
            width: 2px;
            height: 16px;
            background: #d33a31;
        }
    }
</style>