<template>
    <div class="wrap">
        <div class="form">
            <div>
                <i class="input_fa fa fa-search"></i>
                <cn_input @search="search"  :fn="['search']"  class="input" :type="'search'" :placeholder="'搜索专辑、歌手、歌曲'" :name="'search'"></cn_input>
            </div>
        </div>
        <div class="result" v-show="!show_result && !show_search_result">
            <h5>热门搜索</h5>
            <ul class="hot_search">
                <li v-for="item in authors">{{item.name}}</li>
            </ul>
        </div>
        <div v-show="show_result || show_search_result" class="result">
            <div v-show="(!show_search_result && !show_search_result)">
                <h5 class="blue">搜索“{{keyword}}”</h5>
                <ul class="search_result">
                    <li v-for = '(item, index) in result'>
                        <i class="fa fa-search"></i>{{item.keyword}}
                    </li>
                </ul>
            </div>
            <div v-show="show_search_result">
                <div>已顯示“{{keyword}}”的搜索結果，任然搜索<span @click="search_value">{{value}}</span></div>
                <div id="multi_result">
                    <h5>最佳匹配</h5>
                </div>
                <ul class="multi_result">
                    <li v-for="mv_item in search_result['mv']">
                        <div  class="justify column mv">
                            <div class="column flex stretch">
                                <div><img :src="mv_item.cover" alt=""></div>
                                <div class="flex row_column justify">
                                    <h3>MV:{{mv_item.name}}</h3>
                                    <p>{{mv_item.artistName}}</p>
                                </div>
                            </div>
                            <div>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </div>
                    </li>
                    <li v-for="album_item in search_result['album']">
                        <div  class="justify column mv chr">
                            <div class="column flex stretch">
                                <div><img :src="album_item.picUrl" alt=""></div>
                                <div class="flex row_column justify">
                                    <h3>專輯:{{album_item.name}}</h3>
                                    <p>{{album_item.artist.name}}</p>
                                </div>
                            </div>
                            <div>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </div>
                    </li>
                    <li v-for="artist_item in search_result['artist']">
                        <div  class="justify column mv chr">
                            <div class="column flex stretch">
                                <div><img :src="artist_item.picUrl" alt=""></div>
                                <div class="flex row_column justify">
                                    <h3>作者:{{artist_item.name}}</h3>
                                </div>
                            </div>
                            <div>
                                <i class="fa fa-angle-right"></i>
                            </div>
                        </div>
                    </li>
                </ul>
                <song_item   class="active" :loop_data="song_list" :isShow_index="false" :color="true">
                    <!--<p :class="{ 'active': index <= 2}" class="song_index">{{index + 1 | two}}</p>-->
                </song_item>
            </div>


        </div>

    </div>
</template>

<script>
    import cn_input from '../components/cn_input';
    import song_item from '../components/song_item'

    export default {
        name: 'App',
        components : {
            cn_input,
            song_item
        },
        data(){
            return {
                song_list : [],
                show_result : false,
                result : [],
                keyword : '',
                authors : [],
                search_result : {
                    album : [],
                    mv : [],
                    video : [],
                    artist : []
                },
                show_search_result : false,
                value : '',
                showDiff : false
            }
        },
        computed : {

        },
        created : function(){
            // 获取初始热搜
            this.$http.get('/api/top/artists?limit=10').then((data)=>{
                this.authors = data.data.artists;
            })
        },
        methods : {
            search : function(e){
                var value = e.target.value;
                this.value = value;
                this.show_result = value ? true : false;
                this.show_search_result = false;
                this.get_data(this.value)
                if(e.keyCode == 13){
                    this.search_mutil(this.keyword)
                }

            },
            get_data : function(value){
                this.$http.get(`/api/search/suggest/keyword?keywords= ${value}`).then((data) => {
                    if(data.data.code != 200) return
                    if(data.data.result){
                        this.result = data.data.result.allMatch;
                    }

                    if(!this.result.length) return
                    this.keyword = this.result[0].keyword;

                })
            },
            search_value(){
                this.keyword = this.value;
                this.search_mutil(this.keyword)
            },
            search_mutil : function(value){
                if(this.keyword != this.value){
                    this.showDiff = true
                }else{
                    this.showDiff = false
                }
                this.$http.get(`/api/search/multimatch?keywords= ${value}`).then((data) => {
                    if(data.data.code === 200)
                    {
                        var result = data.data.result;
                        this.search_result = {
                            album : [],
                            mv : [],
                            video : [],
                            artist : []
                        };
                        var that = this;
                        result.orders.forEach(function(value){
                            that.search_result[value] = result[value]
                        })
                        that.show_search_result = result.orders.length > 0 ? true : false;
                        that.show_result = false;
                    }
                 })
                this.$http.get(`/api/search?keywords=${value}`).then((data) => {
                    if(data.data.code == 200 && data.data.result.songCount > 0){
                        var arr = data.data.result.songs.slice(0,10);
                        arr.forEach(function(val){
                            val.song = {
                                'name' : val.name
                            }
                            val.author = val.artists.reduce(function(init, cur, index){
                                var index = index === 0 ? '' : ' / '
                                return init + index + cur.name
                            },'');
                            val.author += ' - ' + val.album.name;
                        })
                        this.song_list = arr;
                    }
                })



            }
        }
    }
</script>

<style  lang="less">
    .search_result{
        margin-top:0.3rem
    }
.search_result li{
    font-size:0.26rem;
    padding:0.2rem 0rem;
    border:1px solid #eee;
    border-width:1px 0px 1px 0px;

    i{
        margin-right:0.1rem
    }
}
.blue{color:#507daf}
.form{
    padding:0.3rem;
    border-bottom:1px solid #eee;
}
.form div{
    position:relative;

.fa.input_fa{
    position:absolute;
    top:0.13rem;
    left:0.1rem;
    font-size:0.22rem;
    color:#ccc
}

.input{
    display:block;
    height:0.5rem;
    font-size:0.24rem;
    background-color:#eee;
    width:100%;
    -webkit-appearance: none;
    border:0px;
    outline:none;
    padding-left:0.4rem;
    border-radius:0.25rem;
    padding-right:0.2rem;
}
}
.result{
    padding:0.3rem;
    h5{
        font-weight:normal;
        font-size:0.2rem;

    }

    ul.hot_search{
        padding-top:0.3rem;

        li{
            display:inline-block;
            height:0.64rem;
            line-height:0.64rem;
            padding:0rem 0.2rem;
            text-align:center;
            border:1px solid #eee;
            border-radius:0.32rem;
            font-size:0.26rem;
            margin-bottom:0.25rem
        }
    }
}

    .multi_result li{
        padding:0.15rem 0rem;
        border-bottom:1px solid #efefef
    }
    .multi_result .mv{

        img{width:1.8rem;height:1rem;display:block;margin-right:0.1rem}
        i{font-size:0.28rem}
        h3{
            font-family:normal;
            font-size:0.3rem
        }
        p{font-size:0.2rem;color:#ccc}

        &.chr {
            img{
                width:1rem;
                height:1rem
            }
            .column{
                -webkit-box-align:center;
                align-items:center
            }
         }
    }

</style>
