<template>
    <div class="wrap">
        <public_title :title="'推荐歌单'"></public_title>
        <div class="list bfc_block">
            <div @click="jump(item.id)" class="item" v-for="item in list" >
                <div class="list_detail">
                    <div class="img_wrap">
                        <img :src="item.picUrl" alt="">
                    </div>
                    <div class="hot_num"><i class="fa fa-headphones"></i>{{item.playCount | toBillion}}万</div>
                </div>
                <div class="list_title">
                    <p class="cur">{{item.name}}</p>
                </div>
            </div>
        </div>
        <public_title :title="'最新音乐'"></public_title>
        <song_item :url="'/api//personalized/newsong'" :isShow_index="true"  class="active">
            <!--<p :class="{ 'active': index <= 2}" class="song_index">{{index + 1 | two}}</p>-->
        </song_item>

    </div>

</template>

<script>
    import public_title from '../components/public_title'
    import song_item from '../components/song_item'
    export default {
        name: 'App',
        components : {public_title,song_item},
        data(){
            return {
                song_list : []
            }
        },
        computed : {
            'list' : function(){
                var data = this.$store.state.list.HomeRecommend.data._list;
                return Array.prototype.concat.apply([],data);
            },
        },
        methods : {
            jump(id){
                this.$router.push({ path: `/list/${id}` })
            }
        },
        created : function(){

        }
    }
</script>

<style scoped lang="less">
.wrap{
    overflow:hidden
}
.list{
    margin-right:-0.1rem;
    margin-bottom:0.25rem;
}
.item{
    width:2.1rem;
    float:left;
    margin-right:0.05rem;
    -webkit-flex-shrink:0;
    margin-bottom:0.15rem;

    .list_detail{
        position:relative;

        .img_wrap{
            width:100%;
            padding:50% 0%;
            position:relative;

            img{
                position:absolute;
                top:0px;
                left:0px;
                width:100%;
                height:100%
            }
        }

        .hot_num{
            position:absolute;
            right:0.1rem;
            top:0.1rem;
            color:#fff;
            z-index:2;

            i{
                margin-right:0.1rem;
            }
        }

    }
}
p.cur{
    text-align:left;
    padding:0rem 0.05rem;
    word-break: break-all;
    -webkit-line-clamp:2;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient : vertical;
    height:0.6rem;
    margin-top:0.05rem
}
</style>
