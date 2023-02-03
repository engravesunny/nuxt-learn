<template>
    <div>
        <h1>这是B组件</h1>
        <h2>{{ str }}</h2>
    </div>
</template>

<script setup>
import { onBeforeMount } from '@vue/runtime-core';
import emitter from '../plugins/Bus';
let str = ref('我还没有获得数据')
onBeforeMount(()=>{
    emitter.on('fn',e=>{
        str.value = e
    })
})
</script>