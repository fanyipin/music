<template>
    <input :type="type" :placeholder="placeholder" :name="name"
     @keyup = 'keyUp'
     @keydown="keyDown"
     @input="input"
     @compositionstart="start"
     @compositionend="end"
    >
</template>
<script>
export default{
    props : ['type', 'placeholder', 'name', 'fn'],
    methods : {
        keyUp : function(e){
            var flag = e.target.isNeedPrevent;
            if(flag)  return;
            this.$emit(this.fn, e.target.value)
            e.target.keyEvent = false ;
        },
        keyDown(e){
            e.target.keyEvent = true ;
        },
        input(e){
            if(!e.target.keyEvent){
                this.$emit(this.fn, e.target.value)
            }
        },
        start(e){
            e.target.isNeedPrevent = true ;
        },
        end(e){
            e.target.isNeedPrevent = false;
        }
    }
}
</script>
<style>

</style>