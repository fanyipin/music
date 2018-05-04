<template>
    <div class="wrap">
        <div class="form">
            <div>
                <i class="input_fa fa fa-search"></i>
                <cn_input @search="search" @search_mutil = "search_mutil" :fn="['search','search_mutil']"  class="input" :type="'search'" :placeholder="'搜索专辑、歌手、歌曲'" :name="'search'"></cn_input>
            </div>
        </div>
        <div class="result" v-if="!show_result">
            <h5>热门搜索</h5>
            <ul class="hot_search">
                <li v-for="item in authors">{{item.name}}</li>
            </ul>
        </div>
        <div v-else class="result">
            <h5 class="blue">搜索“{{keyword}}”</h5>
            <ul class="search_result">
                <li v-for = '(item, index) in result'>
                    <i class="fa fa-search"></i>{{item.keyword}}
                </li>
            </ul>
            <ul class="multi_result">
                <li>
                    <h5>最佳匹配</h5>
                    <div  class="justify column mv">
                        <div class="column flex stretch">
                            <div><img src="http://p1.music.126.net/1YmWAoU0nYEgIHx4sIhNWg==/2520080750865619.webp?imageView&thumbnail=178x0&quality=75&tostatic=0&type=webp" alt=""></div>
                            <div class="flex row_column justify">
                                <h3>標題</h3>
                                <p>內容</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </div>
                </li>
                <li>
                    <h5>最佳匹配</h5>
                    <div  class="justify column mv chr">
                        <div class="column flex stretch">
                            <div><img src="http://p1.music.126.net/1YmWAoU0nYEgIHx4sIhNWg==/2520080750865619.webp?imageView&thumbnail=178x0&quality=75&tostatic=0&type=webp" alt=""></div>
                            <div class="flex row_column justify">
                                <h3>標題</h3>
                                <p>內容</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import cn_input from '../components/cn_input'
    export default {
        name: 'App',
        components : {
            cn_input
        },
        data(){
            return {
                song_list : [],
                show_result : false,
                result : [],
                keyword : '',
                authors : []
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
                if(e.keyCode != 13){
                    var value = e.target.value;
                    this.keyword = value;
                    this.show_result = value ? true : false;
                    this.get_data(value)
                }

            },
            get_data : function(value){
                console.log(arguments)
                this.$http.get(`/api/search/suggest/keyword?keywords= ${value}`).then((data) => {
                    if(data.data.result){
                        this.result = data.data.result.allMatch;
                    }

                })
            },
            search_mutil : function(data){
                console.log(data.keyCode)
                if(data.keyCode === 13){
                    this.$http.get(`/api/search/multimatch?keywords= ${data.target.value}`).then((data) => {
                        if(data.data.result)
                        {
                            this.result = data.data.result.allMatch;
                        }
                     })
                }

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
        padding:0.15rem 0rem
    }
    .multi_result .mv{

        img{width:1.8rem;height:1rem;display:block;margin-right:0.1rem}
        i{font-size:0.28rem}
        h3{
            font-family:normal;
            font-size:0.3rem
        }
        p{font-size:0.2rem;color:#ccc}

        &.chr img{
            width:1rem;
            height:1rem
         }
    }

</style>
