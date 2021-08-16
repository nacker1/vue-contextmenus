<template>
  <div id="app" @click="alert">
    <img alt="Vue logo" src="./assets/logo.png">
    <context-menu :options="options" hidingMode="click">
      <b>slot test</b>
    </context-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import ContextMenu from 'vue-contextmenus';
// import "vue-contextmenus/lib/contentmenus.css";
import ContextMenu from './components/ContextMenu.vue';

@Component({
  components: {
    ContextMenu
  },
})
export default class App extends Vue {
  options = [
    {'type':'title',title:'测试标题'},
    {'type':'line'},
    {title:'测试点击1',callback:()=>{
      console.log('测试点击1')
    }},
    {title:'这是第二个菜单',callback:()=>{
      console.log('这是第二个菜单')
    }},
    {'type':'title',title:'测试标题'},
    {'type':'line',show:false},
    {title:'测试点击2', icon:'', show:false,callback:()=>{
      console.log('测试点击2')
    }},
    {title:'这是第二级菜单这是第二级菜单这是第二级菜单这是第二级菜单',children:[
      {'type':'title',title:'测试标题'},
      {'type':'line',show:true},
      {title:'测试点击二级', icon:'', show:true,callback:()=>{
        console.log('测试点击二级')
      }},
      {'title':"三级",children:[
        {'type':'title',title:'测试标题'},
        {'type':'line',show:true},
        {title:'测试点击三级', icon:'', show:true,callback:()=>{
          console.log('测试点击三级')
        }},
        {title:'这是第二个菜单',callback:()=>{
          console.log('这是第二个菜单')
        }},
        {title:'这是第二个菜单',callback:()=>{
          console.log('这是第二个菜单')
        }},
        {title:'这是第二个菜单',callback:()=>{
          console.log('这是第二个菜单')
        }},
        {title:'这是第二个菜单',callback:()=>{
          console.log('这是第二个菜单')
        }},
        {title:'这是第二个菜单',callback:()=>{
          console.log('这是第二个菜单')
        }}  
      ]}
    ]},
  ]

  alert(){
    console.log('====== click -=======')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
