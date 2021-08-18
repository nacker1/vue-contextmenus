<template>
  <ul class="init">
    <li
      v-for="(item, index) in options"
      :key="`${propLevel}_${index}`"
      class="nopadding box box-lr box-align-center box-pack-between"
      style=""
    >
      <template v-if="item.show !== false" >
        <div v-if="item.type === 'line'" class="contextMenuLine"></div>
        <div v-else-if="item.type === 'title'" class="contextMenuTitle">
          {{ item.title }}
        </div>
        <div
          v-else
          @click="clickCallback(item.callback, propLevel)"
          @mouseenter="handleShowMenuChildList(item, $event, index, propLevel)"
          class="box box-lr box-align-center box-pack-start contextMenuContent"
        >
          <div class="box box-lr box-align-start ">
            <i :class="item.icon" class="iconfont"></i>
            <span>{{ item.title }}</span>
          </div>
        </div>
        <template v-if="item.children && item.children.length" >
          <i class="container"></i>
          <div v-if="showIndex == index && showLevel == propLevel" :id="id" class="context-menu" :style="{left:x+'px',top:y+'px'}">
            <Menus :options="item.children" :propLevel="propLevel+1" @closeTips = "clickCallback"/>
          </div>
        </template>
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Options } from "@/types/ContextMenu.ts";

@Component
export default class Menus extends Vue {
  @Prop() private options!: Array< Options >;
  @Prop({ default: 0 }) private propLevel!: number;
  private showFlag = false;
  private x = 0;
  private y = 0;
  private id = `context-menu-${`${Math.random()}`.substr(2, 8)}`;
  private checkPass = false;
  private showIndex = 0;
  private showLevel = 0;

  @Emit('closeTips')
  clickCallback(cb: ()=>void, level: number){
    if( level != this.propLevel ) return;
    typeof cb === 'function' && cb();
  }

  //多级菜单支持
  handleShowMenuChildList(item: Options, event: PointerEvent, index: number, propLevel: number){
    const target: HTMLElement = (event.target as HTMLElement).parentElement as HTMLElement;
    this.y = target.offsetTop-2;
    this.x = target.offsetLeft + target.offsetWidth;
    this.showLevel = propLevel;
    this.showIndex = index;
    if( !item.children ) return;
    this.changeMenuOffset(event);
  }

  //自动调整弹出窗口位置
  private changeMenuOffset(e: PointerEvent) {
    //自动调整右键弹出窗口的位置
    const mouseTarget: HTMLElement = (e.target as HTMLElement).parentElement as HTMLElement;
    const mouseTop = e.clientY - e.offsetY;
    const mouseLeft = e.clientX - e.offsetX;
    this.$nextTick(() => {
      const div: HTMLElement = document.getElementById(this.id) ?? window.document.body;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const top = windowHeight - mouseTop - div.offsetHeight;
      const left = windowWidth - mouseLeft - 2*div.offsetWidth;
      if (top < 0) this.y += top;
      if (left < 0){
        if( mouseLeft > mouseTarget.offsetWidth ){
          this.x = mouseTarget.offsetLeft - mouseTarget.offsetWidth;
        }else{
          this.x = mouseTarget.offsetWidth;
        }
      } 
      
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .init{
    padding: 0;
    margin: 0;
  }
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
  .context-menu li > .contextMenuContent {
    width: 100%;
    height: 27px;
    line-height: 27px;
    min-width: 123px;
    overflow: hidden;
    max-width: 123px;
    position: relative;
    padding: 0 0 0 5px;
    cursor: pointer;
  }
  .context-menu li > .contextMenuContent:hover {
    background: #edf7ff;
  }
  .context-menu li > .contextMenuContent > i{
    margin: 0 3px;
  }
  .contextMenuLine {
    width: 100%;
    height: 1px;
    background: #e6eff6;
  }
  .contextMenuTitle {
    min-width: 48px;
    font-weight: 400;
    color: #cad9e5;
    line-height: 18px;
  }

  .box {
    display: flex;
  }

  .box-lr {
    flex-direction: row;
  }

  .box-rl {
    flex-direction: row-reverse;
  }

  .box-tb {
    flex-direction: column;
  }

  .box-bt {
    flex-direction: column-reverse;
  }

  .box-pack-center {
    justify-content: center;
  }

  .box-pack-start {
    justify-content: flex-start;
  }

  .box-pack-end {
    justify-content: flex-end;
  }

  .box-pack-between {
    justify-content: space-between;
  }

  .box-pack-around {
    justify-content: space-around;
  }

  .box-align-center {
    align-items: center;
  }

  .box-align-start {
    align-items: flex-start;
  }

  .box-align-end {
    align-items: flex-end;
  }
  .container{
    width: 0;
    height: 0;
    border: 5px solid;
    border-color: transparent transparent transparent #def;
    position: relative;
  }
  .container::after{
      content: '';
      position: absolute;
      top: -3px;
      left: -5px;
      border: 3px solid;
      border-color: transparent transparent transparent white;
  }
</style>
