import Vue from 'vue';
import AppComponent from './App/index.vue';
import './css/main.scss';

let vm = new Vue({
  el: '#app',
  components: {
    app: AppComponent,
  },
  render: (h) => h('app'),
});
