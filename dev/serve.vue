<script>
import Vue from 'vue';
import { CodeWarpper } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    CodeWarpper,
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
  methods: {
    handleCopySuccess() {
      console.log(1);
    },
    handleCopyFail() {
      console.log(0);
    },
  },
});
</script>

<template>
  <div id="app">
    <CodeWarpper 
      fn="notification.alert"
    >
      {{code}}
    </CodeWarpper>
  </div>
</template>
