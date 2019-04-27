<template>
    <div class="picker-wrapper">
        <div class="picker" @click="actionHandle('show')">
          {{showValue}}
        </div>
        <mt-popup position="bottom" v-model="popupVisible">
            <div class="picker-hd">
                <div class="__left">
                  <span :class="step === 0 ? 'active':''" @click="actionHandle('show')">{{provinceStr}}&nbsp;</span>
                  <span :class="step === 1 ? 'active':''" @click="actionHandle('show',1)">{{cityStr}}&nbsp;</span>
                  <span :class="step === 2 ? 'active':''" @click="actionHandle('show',2)">{{areaStr}}&nbsp;</span>
                </div>
                <div class="__right">
                  <div class="__cancle-btn" @click="actionHandle('cancle')">取消</div>
                  <div class="__confirm-btn" @click="actionHandle('confirm')">{{confirmStr}}</div>
                </div>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange" :value-key="valueKey"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import Address from '@/utils/address';
    import Comm from '@/utils/Comm';
    import {Picker, Popup,} from 'mint-ui';
    export default {
        name: 'androidAddressPicker',
        components: {
          'mt-picker': Picker,
          'mt-popup': Popup
        },
        props: {
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
                step: 0, //当前步骤 0选省，1选市，2选县
                // values: [], //选中的值
                popupVisible: false,
                picker: null, //实例
                showValue: '选择地址',
                province: {},
                city: {},
                area: {},
                slots: []
            }
        },
        computed: {
            confirmStr(){
              return this.step < 2 ? '下一步' : '完成';
            },
            provinceStr(){
              return this.province ? this.province.name : '选择省'
            },
            cityStr(){
              return this.city ? this.city.name : '市'
            },
            areaStr(){
              return this.area ? this.area.name : '区/县'
            }
        },

        created(){
          this.getSlots(true);
        },

        methods: {
            getSlots(falg = false){
                let provinces,citys,areas,province,city,area;
                provinces = this.oToArr();
                province = this.province = this.value[0] || provinces[0];
                citys = this.getCitys(province);
                city = this.city = this.value[1] || citys[0];
                areas = this.getAreas(province, city);
                area = this.area = this.value[2] || areas[0];

                if(this.value.length > 0 && falg){
                  this.showValue = `${this.provinceStr} ${this.cityStr} ${this.areaStr}`;
                }

                let data = [];

                switch(this.step){
                  case 0: data = provinces; break;
                  case 1: data = citys; break;
                  case 2: data = areas; break;
                  default: data = [];
                }

                let arr = [data];
                this.slots = arr.map((values, index) => {
                    //查找value在当前cell的索引
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

            actionHandle(action, step =0){

                  switch(action){
                      case 'show':
                          this.step = step
                          this.popupVisible = true;
                          this.getSlots();
                          return
                      case 'confirm':

                          if(this.step >= 2){
                            this.step = 0;
                            this.showValue = `${this.provinceStr} ${this.cityStr} ${this.areaStr}`;
                            this.doClose();
                            this.$emit('on-confirm', this.getValue())
                          }else{
                            this.step+=1;
                            this.getSlots();
                          }
                          return
                      case 'cancle':
                          this.doClose();
                          return
                  }

            },

            onValuesChange(e,values){
                if(values[0]){
                  switch(this.step){
                    case 0:
                      this.province = this.value[0] = values[0];break;
                    case 1:
                      this.city = this.value[1] = values[0];break;
                    case 2:
                      this.area = this.value[2] = values[0];break;
                  }
                }
            },

            getValue(){
                return [{...this.province},{...this.city},{...this.area}]
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
        padding: 0 1rem;
        font-size: 1.6rem;
        border-bottom: 1px solid $gray3;
        .__left{
            flex: 1;
            display: flex;
            overflow: hidden;
            white-space: nowrap;
            >span{
              padding: 1rem 0;
              &.active{
                border-bottom: $color-primary solid 2px;
              }
            }
        }

        .__right{
          display: flex;
          padding: 1rem 0;
          .__cancle-btn{
            flex: 1;
            color: $gray5;
            padding: 0 .6rem;
            white-space: nowrap;
          }
          .__confirm-btn{
            flex: 1;
            color: $color-main;
            padding: 0 .6rem;
            white-space: nowrap;
          }
        }
    }
</style>
