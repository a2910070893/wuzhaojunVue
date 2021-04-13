<template>
  <div class="home" style="text-align: center">
    <Index></Index>
  </div>
</template>
<style>

</style>

<script>
import Index from '../components/index.vue'

  export default {
    components: {
      Index
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
