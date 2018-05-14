<template>
    <div v-title="title">
        <div class="song_detail_wrap" >
            <audio src="url"></audio>
            <div class="song_detail_bg_wrap">
                <div class="song_detail_bg" :style="{backgroundImage:'url(' + current_img + ')'}">
            </div>


            </div>
            <div class="detail_logo"></div>
            <div class="song_detail_play_wrap fullHeight">
                <div class="song_detail_play">
                    <div class="song_detail_main" @click="play">

                        <img onclick="javascript: return false" :src="current_img" class="play_bg"  alt="" :class="{pause:!isPlay}">
                        <transition name="fade">
                            <img v-show="!isPlay" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAABJlBMVEUAAAAAAAD////l5eX///9iYmKDg4Pn5+f///9YWFj////09PT////4+Pjt7e3///////9oaGhBQUH////////////////CwsIaGhr///8xMTEkJCT////7+/vp6en///////////////+srKyoqKienp58fHz////y8vKTk5P///8EBAT////////////////V1dW3t7f////////////////////v7++jo6N9fX3///////+UlJT////s7Oz////Nzc3///////+RkZGPj495eXkTExP////////29vb////k5OTPz882Njb////////////c3Nz///////9ycnJsbGz///9dXV3////////Q0ND///9QUFD///////////////////9FeiN6AAAAYXRSTlNmAP3c+oWT3ueB9vA19ealRId5EQbuurpu83RxD/nh05dfAquooo+M7JtzaSolE+vMspJ3Wj7w6KSQj6ucKeXNxLWnmpmObVYd8t3axXZRSt7TvbKLideCeSzHnn4V3Nh6YarbPAAABlRJREFUeNrU14lWEmEYh/GXcdj3HQTZRCkS913UNE2zbLd9Oc/930Q2LmVpwPAC03MD/M5835n/IC6dkqHnzcVoZvdkLp2HfHruZDcTXWw+DyVdOilAt6uNjI8782Ua1W2XjTShtdDSmzRdlH6zFKq5bKQBTS5H57gqXJrP1tsb7kShkBPJFQoJ90a7np0vhblqLrrc8R7oQ4vVPZOLIp8mp8flzsanJ59FuMjcqxZdHVKFxvYDWK1lPQXpooInu4ZVYD/m6pAWNLn0DSvvekJ6KLHuxerb0qyrQwrQViV/oZzKSc/lpi6sgUrLdSN16MyWARBcOBWbnS4EAYytj67r1KGtqMUseaSvPCWLGr14u+pDZysmwFhc+i4+BmBWZgcATTXTFvO9qOS3qOlmShu68g7A6xa13F6A7yuq0ORnA9jZENU2dgDjc1IPGvMB4QNR7+AJ4IspQVObBjDmF+Wur6qxmdKAbpeBoEcGlCcIlLf7hx7lOzxOlYeaP+oTmmoYQFsGWhswGql+oMUMEInLgItHgEzRPvS43OHYVY+/fGwXGvIBkzKU6oAvZA8aywOPZEg9AvIxO9AXAZg4lKF1OAGBF71DX5jw5EyG2NkTMJ/3Co2ZcM8tQ819D8xYb9CVgA2nijSw0gs0tArBzk59aRBWQ91Dj30QjssIiofBd9wttFiGiTMZSWcTUC52B629Bg5lRB0Cr2tdQRvAfRlZ94FGN9AjA+oywupgHHWGzuRhTEbaGORnOkFTZYj4ZaT5I1BOdYBuAnEZcXFg89/QmAFtGXltMGL/ghZ9I7+g19fUV/wHtAJBvzggfxAqd0NXDPCII/KAsXIXNPXOIQd/efjvUndAmxB2xMH/zB+G5u3Qr2k4EMd0AOmvt0IrsCMOagcqt0FbJkyLg5oGs3ULNApecVReiP4NnTHALY7KDcbHv6BbDno1XTUGW39CWwa8F4flB6P1B3TRgQ/UeqSLN6GzAQd83f1dHAKzN6AfoCQOrARLN6Andr9GpiITT9/KwPLAye/QGATFTusAxsOCDKogxH6D7sOC2GkNq+B9GVALsP8LWgzAqdjJ4LJXCRlIpxAoXkOrtteT6yYmH8gg8kL1GroHU/1CoTSQBZ6CvSto0oRc/1DM7GNRLwdm8hK6DF5RgMI9j6jnheVLaBTWdaAwPy7KrUP0Alqbg4QWlPCU6JaAuZoFDcGaqEHh6RdRLQIhC/oBsppQzAXVN1UWlixoBjyqUIhozr8H3vyE1lYhpwnVnv8CpH9CZyAi2lAIPtK8pDPn0Cp8UoWqz/8zqJ5DGzCpCdWf/0lonEMzMK0J1Z//acicQ30wrgnVn/9x8LkkCWFRherPfxiSEgKvLlR//r0QkmWY14Xqz/88LEsTsqpQ/fm3RlQWoa4L1Z//OixKFNq6UP35vw9RycDGMKAYD3P9vEhlF9y6UP35d8OuvISELlR//hPwUqxh0oTqz781TbIKueFB4em4rb/Mq5IfMpRn0nOPIS+ADBUatvcz/w/0B/X2VgMACMNQ9AMnWOADKwT/QuahyZYcDcte7e146X9W+vFmWmEzOeOJGfjMCmWOEubMYw7no7wizHPHvMuMAMFIOo5IxsiOjJDLSOOM2cDYN44hxliMjGnL2OAOWMCgGgz84uBEDKDFIG8ORLhzLPO2Y5kK6PpMdJiBsR28nQkMOBEMJtTixISY4JUTZWPCgVXevesgCINhGG7dZPLEIg7GRRsMTsaoMTEOnmLUuBgn+e//JuTHGt0aKT3y3QIFpj6vO9ctnbnAmr9PIysefn0E0PfhkjW92HFtnQHULn5AAG9aISZGF3NaQYxVrInRrcVYBW4H5vkPEPIfuIV5UGXhClHT8Qv9oXQ/MckoTfb+wVTGqK8ZUl9+4mmUnpGj03pOmzlH5y/w5w6ZiAil+G9qA0KpkfWMTxKsJ6530wel3try9CwjSscg27BTDcw321gHjzyuEjj9IbwP1hPeDqHo2abP0pn5XMR/NhTB/fyo2gv3q0gh1JSkEHCrUuMSG1VxCdxDOtfR1ZDr4AGUwIUACi5JJZMyx1RHUgY3kIn0LBuFQk2EFlv7J3t0+id7JPi86wlJsfm9FUVbQrZR1LrPmQ0hKZfSXC7Fzr5LeD7uGoYBQBCGV56PS2g5ewGy+NkUNbjr9gAAAABJRU5ErkJggg==" class="play_btn" alt="">

                        </transition>
                    </div>
                </div>
                <div class="song_lrc">
                    <h3 class="song_lrc_p">
                        <span class="white">{{title}}-</span>
                        <span>{{author}}</span>
                    </h3>
                    <div class="song_lrc_container" >
                        <div class="song_lrc_container_scroll" :style="{transform:'translate(0px,' + top + 'px)'}">
                            <p :class="{high : index == lineNo}" class="song_lrc_p" v-for="(item,index) in lytic">{{item[1]}}</p>
                        </div>
                    </div>

                </div>
                <audio ref="audio" @timeupdate="update" id="audio" style="display:none" :src="url" controls></audio>
            </div>
            <div class="fullHeight">
                <public_title :title="'精彩评论'"></public_title>
                <div class="comment_item_container">
                    <div class="comment_item column justify border" v-for="item in comment">
                        <div class="author_img">
                            <img :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="flex">
                            <div class="header column justify">
                                <div class="flex">
                                    <div class="white">{{item.user.nickname}}</div>
                                    <div>{{item.time | toString}}</div>
                                </div>
                                <div>
                                    {{item.likedCount}} <i class="fa fa-thumbs-o-up"></i>
                                </div>
                            </div>
                            <p class="white detail_comment">
                                {{item.content}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <section>

        </section>
    </div>

</template>

<script>
    import song_item from '../components/song_item'
    import public_title from '../components/public_title'
    export default {
        name: 'hot_song',
        components : {song_item, public_title},
        data(){
        return {
            current_img : '',
            comment : [],
            lytic : {},
            title : '',
            author : '',
            url : '',
            src : '',
            isPlay : false,
            lineNo : 0,
            top : 0

        }
    },
    created(){
        console.log(this.isPlay)
        this.$http.get(`/api/comment/music?id=${this.$route.params.id}`).then((data)=>{
           if(data.data.code == 200){
                this.comment = data.data.comments;
            }
        })
        this.$http.get(`/api/lyric?id=${this.$route.params.id}`).then((data)=>{
            if(data.data.code == 200 && data.data.lrc){
                this.parseLyric(data.data.lrc.lyric)
            }
        })
        this.$http.get(`/api/song/detail?ids=${this.$route.params.id}`).then((data)=>{
            this.title = data.data.songs[0].al.name;
            this.author = data.data.songs[0].ar.reduce(function(init, cur, index){
                var index = index === 0 ? '' : ' / '
                return init + index + cur.name
            },'');
            this.current_img = data.data.songs[0].al.picUrl;
        })
        this.$http.get(`/api/music/url?id=${this.$route.params.id}`).then((data)=>{
            this.url = data.data.data[0].url
        })
    },
    methods : {
        toggle(){
            this.is_folder = !this.is_folder;
        },
        parseLyric : function(str){
            var parse_arr = str.split('\n');
            var pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g;
            var result = [];
            while(!pattern.test(parse_arr[0])){
                parse_arr = parse_arr.slice(1);
            }
            parse_arr[parse_arr.length - 1].length === 0 && parse_arr.pop();
            parse_arr = parse_arr.forEach(function(val){
                var time = val.match(pattern);
                time.forEach(function(v){
                    var t = v.slice(1, -1).split(':');
                    result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), val.replace(pattern,'')]);
                })
            })
            result.sort(function(a,b){
                return a[0] - b[0]
            })
            this.lytic = result;
        },
        play : function(){
            var ele = this.$refs.audio;
            if(this.isPlay){
                ele.pause()
            }else{
                ele.play()
            }
            this.isPlay = !this.isPlay
        },
        update : function(e){
            var curTime = parseFloat(e.target.currentTime);
            if(this.lytic[this.lineNo + 1]){
                if(curTime >= this.lytic[this.lineNo + 1][0]){

                    this.lineNo ++
                }
                if(this.lineNo > 1){
                    this.top = -(this.lineNo - 1) * this.rem * 0.5
                }

            }


        }
    },
    filters : {
        toString : function(v){
            var date = new Date(v);
            var year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate();
            return year + '年' + month + '月' + day + '日'
        }
    },
    computed : {
        rem : function(){
            return parseInt(document.documentElement.style.fontSize)
        }
    },
    mounted : function(){
        this.$refs.audio.addEventListener('ended', function () {
            this.isPlay = !this.isPlay
        }, false);
    }
    }
</script>

<style lang="less" scoped>
    .song_lrc_p.high{
        color : #fff;

    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .song_lrc_container_scroll{
        -webkit-transition:-webkit-transform 500ms linear
    }
    h1{
        color:#fff;
    }
    .fullHeight{
        height:100%
    }
    img{
        display:block
    }
    .center{
        position:absolute;
        top:0px;
        left:0px;
        right:0px;
        bottom:0px;
    }
    .song_detail_wrap{
        .center;
        overflow:auto;

        .song_detail_bg_wrap{
            .center;
            position:fixed;
            transform: translateZ(0px);
            overflow:hidden;
            .song_detail_bg{
                .center;
                    background-color:rgba(0,0,0,0.5);
                    background-attachment:fixed;
                    height:100%;
                    overflow:auto;
                    background-repeat:no-repeat;
                    background-size:auto 150%;
                    -webkit-transform:scale(1.5);
                    background-position:center center;
                    z-index:0;
                    filter:blur(10px);

                &:after{
                 .center();
                     background-color:rgba(0,0,0,0.5);
                     content: ' ';
                     position:fixed;
                     display:block;
                 }


            }
        }

        .detail_logo{
            position: absolute;
            top: 0.24rem;
            left: 0.2rem;
            display: block;
            width: 2rem;
            height: 0.34rem;
            background: url(//s3.music.126.net/m/s/img/logo.png?0c21b75…) no-repeat;
            background-size: 2rem auto
        }
        .song_detail_play_wrap{
            padding-top:1.5rem;
            position:relative;
            z-index:2;
            .song_detail_play{
                width:5rem;
                height:5rem;
                position:relative;
                z-index:2;
                margin:0px auto;
                background-image:url('http://s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48');
                background-size:5rem auto;
                background-repeat:no-repeat;

                &:after{
                    content:' ';
                    position:absolute;
                    top:-1.5rem;
                    left:2.2rem;
                    background-image:url('http://s3.music.126.net/m/s/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862');
                    background-size:1.9rem auto;
                    z-index:10;
                    width:1.9rem;
                    height:2.6rem;

                 }
                 .song_detail_main{
                     width:3.3rem;
                     height:3.3rem;
                     border-radius:50%;
                     position:absolute;
                     top:50%;
                     left:50%;
                     -webkit-transform:translate(-50%,-50%);
                    overflow:hidden;

                     .play_bg{
                         .center;
                         width:100%;
                         height:100%;
                         z-index:2;
                     }
                     .play_btn{
                         .center;
                         width:0.9rem;
                         height:0.9rem;
                         z-index:3;
                         top:50%;
                         left:50%;
                         -webkit-transform:translate(-50%,-50%)
                     }
                 }
            }
        }

    }
    .song_lrc{
        margin-top:0.5rem;
        h3>span.white{
        font-size:0.28rem;
        font-weight:normal;
        }
        .song_lrc_container{
            height:1.4rem;
            overflow:hidden
        }
    }
    .song_lrc_p{
        margin-bottom:0.13rem;
        text-align:center;
        color:#ccc;
        font-size:0.24rem;
        line-height:1.5;

        .white{
            color:#fff
        }
    }
    .white{
        color:#fff;
    }
    .comment_item_container{
        padding:0.5rem 0.2rem;
        color:rgba(255,255,255,0.6);

        .comment_item{
            align-items:start;
            -webkit-box-align:start;
            margin-top:0.25rem;
        }

        .author_img{
            width:0.6rem;
            height:0.6rem;
            border-radius:50%;
            overflow:hidden;
            margin-right:0.15rem;

            img{
                width:100%;
            }
        }
        .detail_comment{
            font-size:0.28rem;
            line-height:1.5;
            margin-top:0.25rem;
            padding-bottom:0.25rem;
            position:relative;
            text-align:justify;
            word-break: break-all;
            word-wrap: break-word;


        }
    }
    .play_bg{
        animation : rotate 5000ms linear infinite;
    }
    .play_bg.pause{
        animation-play-state:paused
    }
    @keyframes rotate {
        from {transform:rotate(0deg)}
        to{
            transform:rotate(360deg)
        }
    }

</style>
