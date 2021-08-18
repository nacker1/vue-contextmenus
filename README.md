# vue-contentmenus

#效果图
![Image text](https://github.com/nacker1/vue-contextmenus/blob/master/vue-contextmeuns.gif)

## 安装组件
```
npm i vue-contextmeuns
```

## 组件引入、初始化
```
import ContextMenu from "vue-contextmenus";
import "vue-contextmenus/lib/vue-contextmenus.css";

@Component({
  components: {
    ContextMenu
  },
})
```

##使用方法
```
example.vue

//全局监听右健事件
<template>
  <ContextMenu :options="options" hidingMode="click">
    <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
    </div>
  </ContextMenu>
</template>

//只监听IMG图片的右健事件
<template>
  <div id="app">
  	<ContextMenu :options="options" hidingMode="click">
      <img alt="Vue logo" src="./assets/logo.png">
  	</ContextMenu>
  </div>
</template>

数据：
options = [
    {'type':'title', 'title':'基本操作'},
    {'type':"line"},
    {'title':'复制',show:true,callback:()=>{
      console.log( 'res' )
    }}
]


type: 类型， title=>标题类型 ｜ line => 横线
title: 标题名称
show: 是否显示，可动态设置
callback: 菜单点击事件


Prop：
options => 接收options的值
hidingMode => 弹出框消失方式   mouseleave | click, 默认为 mouseleave 方式

```


### Customize configuration
See [Configuration Reference](https://github.com/nacker1/vue-contextmenus).


