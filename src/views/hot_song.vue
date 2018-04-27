<template>
    <div>
        <div>
            <img src="http://s3.music.126.net/m/s/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee" alt="">
        </div>
        <div>
            <song_item :url="'/api//personalized/newsong'" :isShow_index="true"   class="active">

            </song_item>
        </div>
    </div>
</template>

<script>
    import song_item from '../components/song_item'
    export default {
        name: 'hot_song',
        components : {song_item},
        data(){
              return {
                  song_list : []
              }
        },
        created(){

        }
    }
</script>

<style>
img{
    display:block;
    max-width:100%;
}
</style>
