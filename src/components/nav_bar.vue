<template>
    <div>
        <ul class="column justify navbar">
            <router-link active-class="active" class="flex" to="/recommend"  exact tag="li">
                <div>
                    <span>推荐音乐</span>
                </div>
            </router-link>
            <router-link active-class="active" class="flex" to="/hot" tag="li">
                <div>
                    <span>热歌榜</span>
                </div>
            </router-link>
            <router-link active-class="active" class="flex" to="/search" tag="li">
                <div>
                    <span>搜索</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>

</script>
<style lang="less">
    @main_color:#d43c33;
    .navbar{
        height:0.8rem;
        border-bottom:1px solid #eee;
        background-color:#fff;
    }
    .navbar li{
        text-align:center;
        position:relative;
    }
    .navbar li.active{
        color:@main_color
    }
    .navbar li div{
        height:100%;
        position:relative;
        display:inline-block;
        line-height:0.8rem
    }
    .navbar li.active div:after{
        content:' ';
        position:absolute;
        bottom:-0.01rem;
        height:1px;
        width:100%;
        border-bottom:0.03rem solid @main_color;
        left:0px
    }
    .navbar li span{
        font-size:0.26rem;
        vertical-align:middle
    }
    svg{
        width:1.8rem;
    }

</style>