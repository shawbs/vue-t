<template>
    <div class="x-input">
        <textarea v-if="type=='textarea'" 
        :autofocus="autofocus" :name="name" 
        :disabled="disabled"  
        :maxlength="maxlength" 
        :placeholder="placeholder" 
        :rows="rows" 
        :value="value" 
        @input="$emit('input',$event.target.value)"></textarea>
        <input v-else 
        :placeholder="placeholder" 
        :autofocus="autofocus"  
        :disabled="disabled"  
        :name="name" 
        :type="type" 
        :maxlength="maxlength" 
        :value="value" 
        @input="$emit('input',$event.target.value)">
    </div>
</template>

<script>
    export default {
        name: 'XInput',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            autofocus:{
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: '123'
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            maxlength: {
                type: String,
                default: ''
            },
            rows: {
                type: Number,
                default: 3
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '@as/_index.scss';
    .x-input{
        display: flex;
        >input{
            flex: 1;
            padding: 1rem;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid $gray6;
        }
        >textarea{
            padding: 1rem;
            border: 1px solid $gray6;
            border-radius: .5rem;
        }
        
    }
</style>