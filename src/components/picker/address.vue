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
    import { Comm, Address } from '@util';

    export default {
        name: 'addressPicker',
        props: {
            title: {
                type: String,
                default: ''
            },
            value: {
                type: Array,
                default: ()=> []
            },
            valueKey: {
                type: String,
                default: 'name'
            }
        },
        data(){
            return {
                values: [], //选中的值
                popupVisible: false,
                picker: null, //实例
                indexs: [], //每个cell中初始的索引
                slots: [],
            }
        },
        computed: {
            showValue(){
                let p = this.value[0] ? this.value[0].name : '',
                c = this.value[1] ? this.value[1].name : '',
                a = this.value[2] ? this.value[2].name : '';
                return `${p} ${c} ${a}`
            }
        },
        created(){    
            this.initSlots();
        },
        methods: {
            
            initSlots(){
                let provinces,citys,areas,province,city,area;
                provinces = this.oToArr();
                province = this.value[0] || provinces[0];
                citys = this.getCitys(province);
                city = this.value[1] || citys[0];
                areas = this.getAreas(province, city);
                area = this.value[2] || areas[0];

                let arr = [provinces, citys, areas];
                this.slots = arr.map((values, index) => {
                    let defaultIndex = values.findIndex(item=>Comm.eq(item,this.value[index]));
                    defaultIndex = defaultIndex < 0 ? 0 : defaultIndex;
                    return {
                        defaultIndex,
                        flex: 1,
                        textAlign: 'center',
                        values
                    }
                })
            },
            
            oToArr(o = Address){
                let arr = [];
                for(let i in o){
                    if(o[i]){
                        arr.push({
                            id: i,
                            name: o[i].name ? o[i].name : o[i]
                        })
                    }
                }
                return arr;
            },

            getCitys(p){
                return this.oToArr(Address[p.id].child)
            },

            getAreas(p,c){
                if(Address[p.id] && Address[p.id].child[c.id]){
                    return this.oToArr(Address[p.id].child[c.id].child)
                }else{
                    return []
                }
            },

            getProvinces(){
                this.provinces = this.oToArr();
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
                        this.$emit('input', this.getValue())
                        this.$emit('on-confirm', this.getValue())
                        return
                    case 'cancle': 
                        this.doClose(); 
                        return
                }
            },
            onValuesChange(e,values){
                this.values = values;
                if (values[0]) {
                    e.setSlotValues(1, this.getCitys(values[0]))
                }
                if (values[1]) {
                    e.setSlotValues(2, this.getAreas(values[0],values[1]))
                }
                if(!this.picker){
                    this.picker = e;
                    this.$emit('input', this.getValue());
                }else{
                    this.$emit('on-change', this.getValue());
                }
                
            },
            getValue(){
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