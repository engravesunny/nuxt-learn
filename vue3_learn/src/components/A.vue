<template>
    <div>
        <h1>这是A组件</h1>
        <button @click="sendStr">传送数据</button>
    </div>
</template>

<script setup>
import emitter from '../plugins/Bus'
let str = ref('A组件传来的数据')
const sendStr = () => {
    emitter.emit('fn',str.value)
}
</script>