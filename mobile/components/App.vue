<template>
  <div id="app">
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="tabbar" v-if="$route.path=='/chat' || $route.path == '/user'">
      <router-link to="/chat"><i class="fa fa-wechat fa-2x"></i></router-link>
      <router-link to="/user"><i class="fa fa-user fa-2x"></i></router-link>
    </div>
  </div>
</template>

<script>

  import 'font-awesome/css/font-awesome.css'
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="css">
@import '../public/css/reset.css';
body {
  background-color: #f5f5f5;
}
html,body{
  width:100%;
  height:100%;
}
#app{
  display: flex;
  flex-direction: column;
  width:100%;
  height:100%;
}
.content{
  flex:1;
  overflow: auto;
}
.tabbar{
  background-color:#fff;
  padding-top:0.2667rem;
  border-top:1px solid #ccc;
  display: flex;
  justify-content: space-around ;
  height: 1.0667rem;
  line-height: 1.0667rem;
}
.tabbar a{
  color:#999
}
.router-link-active i{
  color: #3cb034;
}
</style>