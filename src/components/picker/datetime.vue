<template>
    <div class="picker-wrapper">
        <div class="picker" @click="actionHandle('show')">{{value | formatTime(formatTime)}}</div>
        <mt-popup position="bottom" v-model="popupVisible">
            <div class="picker-hd">
                <div class="__cancle-btn" @click="actionHandle('cancle')">取消</div>
                <div class="__title">{{title}}</div>
                <div class="__confirm-btn" @click="actionHandle('confirm')">确定</div>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange" value-key="value"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import { Comm } from '@util';
    export default {
        name: 'datetimePicker',
        props: {
            type:{
                type: String,
                default: 'datetime', //datetime,date,time
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
                type: Date,
                default: () =>new Date()
            }
        },
        data(){
            return {
                slots: [],
                values: [], //选中的值
                popupVisible: false,
                picker: null, //实例

                /**---------date */
                now: new Date(), //当前的时间对象
                year: new Date().getFullYear(), //今年
                month: new Date().getMonth() + 1, //今月
                day: new Date().getDate(), //今日
                hour: new Date().getHours(), //当前小时
                mm: new Date().getMinutes(), //当前分钟
                beforeYear: 90, //设置年的范围，起始 今年的前90年
                afterYear: 10, //设置年的范围，结尾 今年的后10年
                selectDate: new Date(), //选中的时间
            }
        },
        computed: {
            range(){
                return [this.now.getFullYear()-10,this.now.getFullYear()+10];
            },
            years(){
                return Comm.createRangeArr(this.range[0], this.range[1]).map(item=>{
                    return {
                        value: item,
                        type: 'year'
                    }
                })
            },
            months(){
                return Comm.createRangeArr(1,12).map(item => {
                    return {
                        value: Comm.formatNum(item),
                        type: 'month'
                    }
                })
            },
            days(){
                let max = this.year && this.month ? new Date(this.year,this.month,0).getDate() : 31;
                return Comm.createRangeArr(1,max).map(item => {
                    return {
                        value: Comm.formatNum(item),
                        type: 'day'
                    }
                })
            },
            hours(){
                return Comm.createRangeArr(0,23).map(item => {
                    return {
                        value: Comm.formatNum(item),
                        type: 'hour'
                    }
                })
            },
            mms(){
                return Comm.createRangeArr(0,59).map(item => {
                    return {
                        value: Comm.formatNum(item),
                        type: 'mm'
                    }
                })
            },
            formatTime(){
                switch(this.type){
                    case 'datetime':
                            return 'YYYY-MM-DD hh:mm:ss'
                    case 'date':
                            return 'YYYY-MM-DD'
                    case 'time':
                            return 'hh:ss'
                }
            }
        },
        created(){
            // 初始slots数据
            switch(this.type){
                case 'datetime':
                        this.slots = [this.getDateCell(this.years, 1), this.getDateCell(this.months,2), this.getDateCell(this.days,3),this.getDateCell(this.hours,4), this.getDateCell(this.mms,5)]
                        break;
                case 'date':
                        this.slots = [this.getDateCell(this.years,1), this.getDateCell(this.months,2), this.getDateCell(this.days,3)]
                        break;
                case 'time':
                        this.slots = [this.getDateCell(this.hours,4), this.getDateCell(this.mms,5)]
                        break;
            }
            console.log(this.value)
        },
        methods: {
            /**
             * type: 1 年， 2月， 3日， 4时， 5分
             */
            getDateCell(values, type){
                let index = 0;
                switch(type){
                    case 1: index = this.years.findIndex(item=>~~item.value===this.year);break;
                    case 2: index = this.months.findIndex(item=>~~item.value===this.month);break;
                    case 3: index = this.days.findIndex(item=>~~item.value===this.day);break;
                    case 4: index = this.hours.findIndex(item=>~~item.value===this.hour);break;
                    case 5: index = this.mms.findIndex(item=>~~item.value===this.mm);break;
                }
                return {
                    defaultIndex: index,
                    flex: 1,
                    textAlign: 'center',
                    values
                }
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
                    this.$emit('input', this.getSelectData());
                }else{
                    this.onDateChange();
                    this.$emit('on-change', this.getSelectData());
                }
            },
            onDateChange(){
                switch(this.type){
                    case 'datetime':
                    case 'date':
                        // 当年月的值变化时，改变days的值
                        this.year = this.values.find(item=>item.type==='year').value;
                        this.month = this.values.find(item=>item.type==='month').value;
                        this.picker.setSlotValues(2,this.days)
                        break;
                }
            },

            getSelectData(){
                switch(this.type){
                    //如果是时间选择器则返回时间对象到回调
                    case 'datetime':
                    case 'date':
                    case 'time':
                        this.year = this.values.find(item=>item.type==='year')?this.values.find(item=>item.type==='year').value : this.year;
                        this.month = this.values.find(item=>item.type==='month')?this.values.find(item=>item.type==='month').value : this.month;
                        this.day = this.values.find(item=>item.type==='day')?this.values.find(item=>item.type==='day').value : this.day;
                        this.hour = this.values.find(item=>item.type==='hour')?this.values.find(item=>item.type==='hour').value : this.hour;
                        this.mm = this.values.find(item=>item.type==='mm')?this.values.find(item=>item.type==='mm').value : this.mm;
                        this.selectDate = new Date(`${this.year}/${this.month}/${this.day} ${this.hour}:${this.mm}`);
                        return this.selectDate
                }
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