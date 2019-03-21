<template>
    <div class="x-input" :class="inputState === 3 ? 'invalid' : (inputState === 2 ? 'valid' : 'initial')">
        <div class="x-input-row">
            <label v-if="label">{{label}}</label>
            <textarea v-if="type=='textarea'"
            :autofocus="autofocus" 
            :name="name" 
            :disabled="disabled"  
            :maxlength="maxlength" 
            :placeholder="placeholder" 
            :rows="rows" 
            :value="value" 
            @input="input"></textarea>
            <input v-else 
            :placeholder="placeholder" 
            :autofocus="autofocus"  
            :disabled="disabled"  
            :name="name" 
            :type="type" 
            :maxlength="maxlength" 
            :value="value"
            @input="input">
        </div>
        <div class="error-tip" v-if="inputState === 3">{{errorMsg}}</div>
    </div>
</template>

<script>
    import rules from '@/scripts/rules.js'
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
            },
            
            rule: { //路由的规则，对应rules的键名
                type: String,
                default: ''
            },

            required: {
                type: Boolean,
                default: false
            },

            label: {
                type: String,
                default: ''
            },

            title: { //用于错误提示的关键字
                type: String,
                default: ''
            }
        },

        data(){
            return {
                inputState: 1, //1-初始，2-正确，3-错误
                errorMsg: '',
                timer: null,
            }
        },

        methods: {
            input(e){
                const {value} = e.target;
                this.$emit('input',value)
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.verify(e)
                },1000)
            },
            verify(){
                console.log('verify ing ...', this.value)
                const value = this.value;
                if(this.required && !value){
                    this.inputState = 3
                    this.errorMsg = `${this.title}是必填项`
                    return
                }
                if(this.rule){
                    const rule = rules[this.rule], reg = rule.reg;
                    if(rule){
                        this.inputState = reg.test(value) ? 2 : 3;
                        reg.lastIndex = 0;
                        this.errorMsg = this.inputState === 3 ? `${this.label}的格式错误`: ''
                        return
                    }else{
                        throw new Error(`没有匹配到${this.rule}的规则！`)
                    }
                }
                this.inputState = 2;
            }
        },

        mounted(){
            // this.verify()
        }
    }
</script>

<style scoped lang="scss">
    @import '@as/_index.scss';
    .x-input{
        // display: flex;
        .x-input-row{
            display: flex;
            padding: 10px 20px;
            align-items: center;
            label{
                padding: 0 20px;
            }
        }
        .error-tip{
            color: $color-danger;
            font-size: .9em;
            padding: 20px 40px;
        }
        input{
            flex: 1;
            padding: 1rem 0;
            border-radius: 0;
            border-bottom: $border;
        }
        textarea{
            flex: 1;
            padding: 1rem 0;
            border-bottom: $border;
        }

        &.invalid{
            input,textarea{
                border-color: $color-danger;
            }
        }
        &.valid{
            input,textarea{
                border-color: $color-success;
            }
        }
        
    }
</style>