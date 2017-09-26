<template>
    <div>
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link to="/manage">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/manage/chat">消息管理</router-link></el-menu-item>
        <el-menu-item index="3">成员管理</el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      
    }
  }
</script>