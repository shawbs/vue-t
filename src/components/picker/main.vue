<template>
    <div class="picker-wrapper">
        <div class="picker" @click="actionHandle('show')">{{showValue}}</div>
        <mt-popup position="bottom" v-model="popupVisible">
            <div class="picker-hd">
                <div class="__cancle-btn" @click="actionHandle('cancle')">取消</div>
                <div class="__title">{{title}}</div>
                <div class="__confirm-btn" @click="actionHandle('confirm')">确定</div>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange" :value-key="valueKey"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import { Comm } from '@util';
    export default {
        name: 'picker',
        props: {
            valueKey: { //如果data中values是一个对象数组，该值设置picker显示的字段
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: ()=> [['2015-01', '2015-02'],['2015-04', '2015-05']]
            },
            value: {
                type: Array,
                default: ()=> []
            },
        },
        data(){
            return {

                values: null, //选中的值
                popupVisible: false,
                picker: null, //实例
                indexs: [], //每个cell中初始的索引
            }
        },
        computed: {
            slots(){
                return this.data.map((values, index)=> {
                    let o = {
                        defaultIndex: this.indexs[index] || 0,
                        flex: 1,
                        textAlign: 'center',
                        values
                    }
                    return o
                })
            },
            showValue(){
                if(this.valueKey){
                    return this.value.map(item=>item[this.valueKey]).join(' ')
                }else{
                    return this.value.join(' ')
                }
            }
        },
        created(){
            this.setIndexs();
        },
        methods: {
            setIndexs(){
                let arr = [];
                this.value.forEach((item, index) => {
                    let _type = Comm.getType(item), defaultIndex;
                    switch (_type){
                        case 'object':
                            defaultIndex = this.data[index].findIndex(_item=>Comm.eq(item, _item)) || 0;
                            arr[index] = defaultIndex;
                            break;
                        default:
                            defaultIndex = this.data[index].findIndex(_item=>_item===item) || 0;
                    }
                    arr[index] = defaultIndex;
                });
                this.indexs = [...arr];
            },
            doClose(){
                this.popupVisible = false;
            },
            actionHandle(action){
                switch(action){
                    case 'show': 
                        this.popupVisible = true;
                        return
                    case 'confirm': 
                        this.doClose();
                        this.$emit('input', this.getSelectData())
                        this.$emit('on-confirm', this.getSelectData())
                        return
                    case 'cancle': 
                        this.doClose(); 
                        return
                }
            },
            onValuesChange(e,values){
                this.values = values;
                if(!this.picker){
                    this.picker = e;
                    this.$emit('input', this.getSelectData())
                    this.$emit('on-confirm', this.getSelectData());
                }else{
                    this.$emit('on-change', this.getSelectData());
                }
            },
            
            getSelectData(){
                return [...this.values]
            }

        },
    }
</script>

<style scoped lang="scss">
@import '@as/_index.scss';
    .picker-hd{
        display: flex;
        background: #ffffff;
        justify-content: space-between;
        padding: 1rem;
        font-size: 1.6rem;
        border-bottom: 1px solid $gray3;
        .__title{
            flex: 1;
        }
        .__cancle-btn{
            color: $gray5;
        }
        .__confirm-btn{
            color: $color-main;
        }
    }
</style>