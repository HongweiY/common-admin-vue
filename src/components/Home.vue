<template>
  <div>
    <h3>Home1</h3>
    <el-button>login</el-button>
  </div>

</template>
<script>
export default {
  name: 'Home',
  mounted() {
    this.$requset.get('/login',{name:'jack'},{mock:true}).then(res=>{
      console.log(res)
    })


  }
}


</script>

<style scoped>
a {
  color: #42b983;
}
</style>
