<template>
  <div class="welcome">
    <div class="content">
      <div class="subtitle">欢迎体验</div>
      <div class="title">通用后台管理系统</div>
      <div class="desc">
        - vue 3.0 +elementPlus + Node + Mongo打造通用后台管理系统
      </div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style lang="scss">
.welcome {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;

  .content {
    position: relative;
    bottom: 40px;
    .subtitle{
      font-size: 30px;
      line-height: 45px;
    }
    .title{
      font-size: 40px;
      line-height: 65px;
      color: #337ED9;
    }
    .desc{
      font-size: 15px;
      line-height: 14px;
      text-align: right;
      color: #747474;
    }

  }
  .img{
    width: 371px;
    height: 438px;
    margin-left: 100px;
    background-image: url("../assets/images/welcome.png");
  }
}

</style>