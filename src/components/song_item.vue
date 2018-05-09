<template>
    <div>
        <router-link :to="'/song/' + item.id" class="out" v-for="(item,index) in  song_list" tag="div">
            <div class="column justify wrap">
                <div class="column flex">
                    <p v-if="isShow_index"  :class="{ 'active': index <= 2 && !color}" class="song_index">{{index + 1 | two}}</p>
                    <div class="flex">
                        <h2 class="song_name flex_content">{{item.song.name}}</h2>
                        <p class="song_author flex_content">{{item.author}}</p>
                    </div>
                </div>
                <div style="width:0.5rem;">
                    <i class="fa fa-play-circle-o"></i>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default{
    props : ['url','isShow_index','loop_data','color'],
    data(){
        return {
            song_list : []
        }
    },
    created(){
        if(this.loop_data === undefined){
            this.$http.get(this.url).then(function(data){
                var result = data.data.result.slice(0,10);
                result.forEach(function(item){
                    item.source = item.song.alias.length>0 ? item.song.alias[0] : '';
                    item.author = item.song.artists.reduce(function(init, cur, index){
                        var index = index === 0 ? '' : ' / '
                        return init + index + cur.name
                    },'');
                    item.author += ' - ' + item.name
                })
                this.song_list = result;
            }.bind(this))
        }else{
            this.song_list = this.loop_data;
        }
    },
    watch:{
        'loop_data' : function(){
            this.song_list = this.loop_data;
            console.log(this.song_list)
        }
    }
}
</script>
<style scoped lang = 'less'>
.wrap .column .flex_content{
    -webkit-flex-grow:1;
    -webkit-flex-shrink: 1;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
*{
    text-align: left;
}
.column{
    -webkit-box-align:middle;
    align-items:middle;
}
.out{
    padding:0.1rem;
    &:last-child .wrap{
         border-bottom-width:0px
     }
}
.wrap{
    border-bottom:1px solid #eee;
    padding-bottom:0.15rem;

    .flex{
        -webkit-box-flex:1
    }
    .song_index{
        font-size:0.26rem;
        margin-right:0.1rem;
        color:#ccc;
        &.active{
            color:#f00
         }
    }

    .song_name{
        font-size:0.3rem;
        font-weight:normal;
        white-space:nowrap;
        margin-bottom:0.1rem;
    }
    .song_author{
        font-size:0.2rem;
        color:#ccc;
    }
    .fa-play-circle-o{
        font-size:0.46rem;
        color:#ccc
    }

}
</style>