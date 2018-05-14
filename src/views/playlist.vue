<template>
    <div v-title="name">
        <section class="playlist_header">
            <div class="playlist_banner">
                 <div class="playlist_bg" :style="{backgroundImage: 'url('+ img_url +')'}"></div>
                <div class="column justify content stretch">
                    <div class="head_img_wrap">
                        <div class="head_num"><i class="fa fa-headphones"></i>{{focus_num | toBillion}}万</div>
                        <img class="head_img" :src="img_url" alt="">
                    </div>
                    <div class="flex column justify row_column">
                        <h2>{{name}}</h2>
                        <div class="column">
                            <img class="character_img" :src="ca_img" alt="">
                            <p>{{author}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_wrap">
                <div class="playlist_tag">
                    标签 : <span v-for="item in tag">{{item}}</span>
                </div>
                <p class="playlist_describe" :class="{'hidden' : !is_folder}">
                    简介 ：{{describe}}
                </p>
                <i class="btn fa"  :class="[is_folder ? 'fa-angle-up' : 'fa-angle-down']"    @click="toggle"></i>
            </div>
        </section>
        <section class="playlist_list">
            <div class="list_title">歌曲列表</div>
            <song_item   class="active" :loop_data="song_list" :isShow_index="true" :color="true">
                <!--<p :class="{ 'active': index <= 2}" class="song_index">{{index + 1 | two}}</p>-->
            </song_item>
        </section>
    </div>
</template>

<script>
    import song_item from '../components/song_item'
    export default {
        name: 'hot_song',
        components : {song_item},
        data(){
            return {
                song_list : [],
                is_folder : false,
                img_url : '',
                ca_img : '',
                author : '',
                tag : [],
                name : '',
                describe : '',
                focus_num : 0,
                style_object : {
                    backgroundImage : "url( this.img_url )"
                },
                title : ''
            }
        },
        created(){
            this.$http.get(`/api/playlist/detail?id=${this.$route.params.id}`).then((data)=>{
                var result = data.data.result;
                this.img_url = result.coverImgUrl;
                this.focus_num = result.playCount;
                this.name = result.name;
                this.author = result.creator.nickname;
                this.ca_img = result.creator.avatarUrl;
                this.tag = result.tags;
                this.describe = result.description;
                this.title = result.name;
                result.tracks.forEach(function(val){
                    val.song = {
                        'name' : val.name
                    }
                    val.author = val.artists.reduce(function(init, cur, index){
                        var index = index === 0 ? '' : ' / '
                        return init + index + cur.name
                    },'');
                })
                this.song_list = result.tracks;
        })
        },
        methods : {
            toggle(){
                this.is_folder = !this.is_folder;
            }
        }
    }
</script>

<style lang="less" scoped>
    .content_wrap{
        padding:0.2rem;
        position:relative;
        padding-bottom:0.3rem;
        .btn{
            position:absolute;
            bottom:0rem;
            right:0.2rem;
            font-size:0.36rem;
            color:#ccc;
        }
        .playlist_tag{
            margin-bottom:0.2rem;
            font-size:0.24rem;

            span{
                padding:0.05rem 0.15rem;
                border:1px solid #eee;
                border-radius:2rem;
                margin-left:0.1rem;
            }
        }
        .playlist_describe{
            font-size:0.24rem;
            position:relative;

            &.hidden{
                -webkit-line-clamp:3;
                overflow:hidden;
                display:-webkit-box;
                 -webkit-box-orient:vertical;
                 text-overflow:ellipsis
             }
        }
    }
    img{
        display:block;
        max-width:100%;
    }
    .playlist_banner{
        padding:0.5rem 0.3rem;
        position:relative;
        overflow:hidden;
        background-color:#888;

        .playlist_bg{
            position:absolute;
            top:0px;
            left:0px;
            width:100%;
            height:130%;
            background-size:cover;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            transform:scale(1.5);
            filter:blur(15px);
            opacity:0.6;
        }
        .content{
            position:relative;
            z-index:2;
        }
        .head_img{
            width:2rem;
            height:2rem;
        }

        h2{
            color:#fff;
            font-size:0.28rem;
            font-weight:normal
        }

        .head_img_wrap{
            position:relative;
            margin-right:0.2rem;

            .head_num{
                position:absolute;
                top:0px;
                left:0px;
                background-color:rgba(0,0,0,0.5);
                color:#fff;
                width:100%;
                padding:0.05rem;
                text-align:right
            }
        }
        .character_img{
            width:0.5rem;
            height:0.5rem;
            border-radius:50%;
            margin-right:0.15rem;
        }
        p{
            color:#fff;
            font-size:0.24rem;
        }

    }
    .list_title{
        background-color:#eeeff0;
        color:#666;
        font-size:0.2rem;
        padding:0.05rem 0.15rem;
    }
</style>
