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
            this.emit(e)
            e.target.keyEvent = false ;
        },
        keyDown(e){
            e.target.keyEvent = true ;
        },
        input(e){
            if(!e.target.keyEvent){
                this.emit(e)
            }
        },
        start(e){
            e.target.isNeedPrevent = true ;
        },
        end(e){
            e.target.isNeedPrevent = false;
        },
        emit(e){
            this.fn = typeof this.fn =='string' ? [this.fn] : this.fn;
            this.fn.forEach(function(i,val){
                this.$emit(i, e)
            }.bind(this))
        }
    }
}
</script>
<style>

</style>