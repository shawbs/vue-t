import Vue from 'vue';
import { Comm } from '@util';

Vue.filter('formatTime', (value, arg = 'YYYY-MM-DD hh:mm:ss')=>{
    return Comm.formatTime(value, arg)
})