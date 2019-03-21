<template>
    <div class="x-form" ref= "form">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: 'XForm',
        data(){
            return {
                
            }
        },
        methods: {
            verify(){
                return new Promise((resolve, reject) => {
                    const childs = this.$slots.default.filter(item => !!item.componentInstance).map(item => item.componentInstance);
                    for(let item of childs){
                        item.verify()
                        console.log(item)
                        if(item.inputState === 3){
                            reject(item.errorMsg); return;
                        }
                    }
                    resolve();
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '@as/_index.scss';

</style>