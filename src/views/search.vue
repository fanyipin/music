<template>
    <div class="wrap">
        <div class="form">
            <div>
                <i class="input_fa fa fa-search"></i>
                <cn_input @search="search" :fn="'search'" class="input" :type="'search'" :placeholder="'搜索专辑、歌手、歌曲'" :name="'search'"></cn_input>
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
                    <i class="fa fa-search"></i>{{item.name}}
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
            search : function(value){
                this.keyword = value;
                this.show_result = value ? true : false;
                this.get_data(value)
            },
            get_data : function(value){
                this.$http.get(`/api/search/suggest?keywords= ${value}`).then((data) => {
                    if(data.data.result){
                        this.result = data.data.result.songs;
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
</style>
