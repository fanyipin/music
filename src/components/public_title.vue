<template>
    <h1>{{title}}</h1>
</template>
<script>
    export default {
        name: 'App',
        props : ['title']
    }
</script>
<style lang="less" scoped>
@main_color:#d43c33;
h1{
    font-size:0.3rem;
    padding-left:0.18rem;
    position:relative;
    font-weight:normal;
    text-align:left;
    margin-top:0.25rem;
    margin-bottom:0.25rem;
}
h1:after{
    content:' ';
    position:absolute;
    left:0px;
    top:20%;
    width:0.03rem;
    height:60%;
    background-color:@main_color;
    -webkit-transform:translate(0px,0.02rem)
}
</style>