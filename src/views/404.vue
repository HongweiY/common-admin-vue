<template>
  <div class="container">
    <div class="content-left">
      <h2>页面找不到了</h2>
      <p>你要访问的页面不见了，或许你的地址是错误的，或许是我们的服务器除了问题。</p>
      <router-link to="/welcome">
        <el-button>首页</el-button>
      </router-link>
    </div>
    <div class="content-right">
      <img src="@/assets/images/404.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: '404'
}
</script>

<style scoped lang='scss'>
.container {
  display: flex;
  position: absolute;
  height: 40vh;
  top: 50%;
  width: 50vw;
  left: 50%;
  margin-top: -20vh;
  margin-left: -20vw;

  .content-left {
    h2 {
      font-size: 46px;
      font-width: 300;
    }

    p {
      margin-top: 5vh;
      color: darkgray;
    }

    button {
      margin-top: 5vh;
      margin-left: 40px;
      height: 4vh;
      width: 7vw;
    }


  }

  .content-right {
    margin-left: 30px;

    img {
      margin-top: -10vh;
      height: 30vh;
    }

  }
}

</style>