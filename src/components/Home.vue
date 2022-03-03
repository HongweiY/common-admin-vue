<template>
  <div class="base-layout">
    <div class="nav-side"></div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread">url</div>
        <div class="user-">usr</div>
      </div>
      <div class="wrapper">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'Home',
}


</script>

<style scoped lang="scss">
.base-layout {
  position: relative;

  .nav-side {
    background: #001529;
    position: fixed;
    height: 100vh;
    width: 200px;
    color: white;
    overflow-y: auto;
    transition: width .5s;
  }

  .content-right {
    margin-left: 200px;

    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
    }

    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);

      .main-content {
        background: #ffffff;
        height: 100%;
      }
    }

  }
}

</style>
