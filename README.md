# vue-contentmenus

##效果图

[![fHu2qI.gif](https://z3.ax1x.com/2021/08/19/fHu2qI.gif)](https://imgtu.com/i/fHu2qI)


##实现功能
```
1、右健菜单
2、多级菜单
3、可放置到任意元素之上
4、支持弹出层消失方式 mouseleave | click
5、弹出层按窗口大小自动适应位置
6、动态设置show内容来控制菜单内容的显示与隐藏
```

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
    {'title':'复制','icon':'el-icon-copy-document',show:true,callback:()=>{
      console.log( 'res' )
    }}
]

icon: 图标，该属性为图标class，如：elementUI的删除 -> el-icon-delete
type: 类型， title=>标题类型 ｜ line => 横线
title: 标题名称
show: 是否显示，可动态设置
callback: 菜单点击点的回调事件


Prop：
options => 接收options的值
hidingMode => 弹出框消失方式   mouseleave | click, 默认为 mouseleave 方式

```


### Customize configuration
See [Configuration Reference](https://github.com/nacker1/vue-contextmenus).


