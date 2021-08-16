<template>
  <div @click.stop @contextmenu.stop.prevent="handleContext">
    <slot></slot>
    <div v-if="showFlag && checkPass" @mouseleave='hiding("mouseleave")'>
      <div :id="id" class="context-menu" :style="{left:x+'px',top:y+'px'}">
        <Menus :options="options" @closeTips = "showFlag = false"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Options } from "@/types/ContextMenu.ts";
import Menus from "./Menus.vue";

@Component({
  components: {
    Menus
  },
})
export default class ContextMenu extends Vue {
  @Prop() private options!: Array< Options >;
  @Prop({ default: 'mouseleave' }) private hidingMode!: string;
  private showFlag = false;
  private x = 0;
  private y = 0;
  private id = `context-menu-${`${Math.random()}`.substr(2, 8)}`;
  private checkPass = false;
  //初始化时
  mounted(){
    for( const option of this.options ){
      if( option.type === 'line' )continue;
      else if( option.type === 'title' ){
        if( !option.title ) this.catch(`${JSON.stringify( option )}，参数格式不正确，请查看官网使用说明!`);
      }
      else if( !option.title )this.catch(`${JSON.stringify( option )}，参数格式不正确，请查看官网使用说明!`);
      else if( !option.callback && !option.children ) this.catch(`${JSON.stringify( option )}，参数格式不正确，请查看官网使用说明!`);
    }
    this.checkPass = true;
    this.$nextTick(()=>{
      document.addEventListener('click',()=>{this.hiding('click');})
    })
  }

  //弹框消失方式
  hiding( mode: 'mouseleave' | 'click' ){
    if( this.hidingMode == mode ){
      this.showFlag=false;
    }
  }

  //监听右键事件
  handleContext(e: PointerEvent){
    if(!this.checkPass)return;
    this.showFlag = true;
    this.x = e.clientX-2;
    this.y = e.clientY-2;
    this.changeMenuOffset();
  }
  //自动调整弹出窗口位置
  private changeMenuOffset() {
    //自动调整右键弹出窗口的位置
    const mouseTop = this.y;
    const mouseLeft = this.x;
    this.$nextTick(() => {
      const div: HTMLElement = document.getElementById(this.id) ?? window.document.body;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const top = windowHeight - mouseTop - div.offsetHeight - 2;
      const left = windowWidth - mouseLeft - div.offsetWidth - 2;
      if (top < 0) this.y += top;
      if (left < 0) this.x += left;
    });
  }
  //中断执行
  private catch( msg: string ){
    throw new Error( msg );
  }
}
</script>
<style scoped>
  .context-menu{
    padding:5px;
    border: 1px solid #def;
    border-radius: 4px;
    position: absolute;
    min-height: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 18px 3px rgba(197, 219, 237, 0.61);
    text-align: left;
    z-index: 1;
    font-size: 12px;
    font-family: SourceHanSansCN-Normal, SourceHanSansCN;
  }
</style>