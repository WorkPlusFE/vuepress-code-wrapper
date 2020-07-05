<script>
import Vue from 'vue';
import { VueCodeComponentSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    ApiCode: VueCodeComponentSample,
  },
  data() {
    return {
      code: 
`// normal
w6s.notification.alert({
  message: '这是一条警告信息',
  title: '提示', //非必须
  buttonName: '收到',
  success : function() {},
  fail : function(err) {},
}); `,
    };
  },
});
</script>

<template>
  <div id="app">
    <ApiCode>{{code}}</ApiCode>
  </div>
</template>
