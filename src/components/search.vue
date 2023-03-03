<template>
   <el-container style="height: 670px; width: 1200px;margin: 1% 10%;">
      <el-aside style="height: 670px;width: 200px;background-color: #f9f9f9;">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      >
      <el-menu-item index="1" @click="jump1()" >
        <i class="el-icon-document"  ></i>
        <span slot="title">文章</span>
      </el-menu-item>
      <el-menu-item index="2" @click="jump2()">
        <i class="el-icon-s-data" ></i>
        <span slot="title">专题</span>
      </el-menu-item>
      <el-menu-item index="3" @click="jump3()" >
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户</span>
      </el-menu-item>
    </el-menu>
      </el-aside> 
      <el-main style="height: 685;width: 1000px;">
         <router-view>
         </router-view>
      </el-main>
     
   </el-container>
   


</template>
<script>

import router from '@/router';

  export default {
    data(){
      return{
        article_name:this.$route.params.article_name
      }
    },
    methods: {
        jump1() {
            router.push({ path: "/search/note/"+this.article_name });
        },
        jump2() {
            router.push({ path: "/search/notebook/"+this.article_name });
        },
        jump3() {
            router.push({ path: "/search/user/"+this.article_name });
        }
    },
    components: { router }
}
</script>