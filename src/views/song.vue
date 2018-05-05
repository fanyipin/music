<template>
    <div>
        <div class="header_wrap">
            <t_header></t_header>
            <nav_bar></nav_bar>
        </div>
        <keep-alive>
            <router-view class="home_content"/>
        </keep-alive>
    </div>
</template>

<script>
    import t_header from  '../components/t_header';
    import nav_bar from '../components/nav_bar';
    export default {
        name: 'App',
        components : {
            t_header,
            nav_bar
        }
    }
</script>

<style>
    .header_wrap{
        position:fixed;
        top:0px;
        left:0px;
        width:100%;
        z-index:10;
    }
    .home_content{
        padding-top:1.7rem
    }
    /*#app {*/
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        /*text-align: center;*/
        /*color: #2c3e50;*/
        /*margin-top: 60px;*/
    /*}*/
</style>
