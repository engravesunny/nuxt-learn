# setup内部写法

## 定义数据

- 死数据，不可以修改，但是可以展示

```js
let str = '1'
```

----------------------

- 响应式数据： ref

```js
import { ref } from 'vue'
let str = ref('1')

const fun = () => {
    str.value = '2'
}
```

> 在使用的时候需要`.value`

- 响应式数据： reactive

```js
import { reactive } from 'vue'
let str = reactive({a:'1',b:'2'})

const fun = () => {
    str.a = '3'
    str.b = '4'
}
```

> 在使用的时候不需要`.value`
> reactive 只能写对象或数组

----------------------

- vue2和vue3中的数据拦截不同的点
  - vue2.x ===> Object.defineProperty   循环  
  - vue3.x ===> new Proxy   不循环  效率提升

----------------------

- toRefs
  - 解构 ===> 响应式数据

```js
let obj = {
    name: '张三',
    age: 18
}

let { name, age } = obj
// 此时name和age都为死数据
let { name, age } = toRefs( obj )
// 通过toRefs，name和age仍为响应数据 
```

- **computed**

```js
// 此时无法修改changeStr到页面
let changeStr = computed(() => {return str.value})
// 第二种写法
let changeStr = computed({
    get() {
        return str.value
    },
    set(value) {
        str.value = val
    }
})
```

- **watch**

```js
// 监听某一个
watch( str, (newValue, oldValue) => {
    console.log( newVal, oldVal)
})
// 同时监听多个
watch( [str, num], (newValue, oldValue) => {
    console.log( newVal, oldVal)
})
// 初始化监听
watch( [str,num], (newVal,oldVal)=>{
    console.log(newVal,oldVal)
},{
    immediate:true
})
// vue3中watch具备深度监听，无需另外配置
// 监听对象的某一个key时，对key深度监听
watch( obj.a, (newVal)=>{console.log(newVal)}, {
    immediate:true,
    deep:true
})
// 立即执行函数
watchEffect(()=>{console.log(str.value)})

// 监听路由
let router = useRouter();
watch( ()=>router.currentRoute.value, ( newVal ) =>{
    console.log(newVal)
},{
    immediate:true
})

```

## 组件通信

- 父传子

```vue
// 父组件
<template>
    <h1>Home页面</h1>
    <hr>
    <List :num="num"></List>
</template>

<script setup>
import List from "@/components/List.vue"
let num = ref(100)
</script>

// 子组件
<template>
  我是子组件我接到了父组件的数据：{{ num }}
</template>

<script setup>
const props = defineProps({
  num:{
    type:Number,
    default:1
  }
})
console.log(props);
</script>
```

- 子传父

```vue
// 父组件
<template>
    <h1>Home页面</h1>
    <h2>{{ str }}</h2>
    <hr>
    <List @fn="changeNum"></List>
</template>

<script setup>
import List from "@/components/List.vue"
let str = ref('我正在接收数据')
const changeNum = ( n ) => {
    str.value = n
}
</script>

// 子组件
<template>
  我是子组件
</template>

<script setup>
let str = ref('子组件传来的数据')

const emit = defineEmits(['fn'])

emit('fn',str.value)
</script>
```

- v-modle传值

```vue
// 父组件
<template>
    <h1>Home页面</h1>
    <hr>
    <List v-model:num="num"></List>
</template>

<script setup>
import List from "@/components/List.vue"
let num = ref(100)
</script>

// 子组件
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
```

- 兄弟组件传递数据

```vue
// A组件
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

// B组件
<template>
    <div>
        <h1>这是B组件</h1>
        <h2>{{ str }}</h2>
    </div>
</template>

<script setup>
import emitter from '../plugins/Bus';
let str = ref('我还没有获得数据')
onBeforeMount(()=>{
    emitter.on('fn',e=>{
        str.value = e
    })
})
</script>
```

## setup语法糖插件

- 解决import { ref, reactive .... } 引入的问题
  - 下载安装
  - npm i unplugin-auto-import -D
  - 在vite.config.js 中进行配置
  
```js
// 引入
import AutoImport from 'unplugin-auto-import/vite'

// 在plugin中
AutoImport({
    imports:['vue']
})
```
