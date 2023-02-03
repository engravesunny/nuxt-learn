<template>
  我是子组件，我接受到了父组件的值{{ num }}
  <button @click="changeNum">修改它</button>
</template>

<script setup>
const props = defineProps({
  num:{
    type:Number,
    default:0
  }
})
const emit = defineEmits(['update:num'])
const changeNum = ()=>{
  emit('update:num',200)
}
</script>