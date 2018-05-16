<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  margin:0;
  padding: 0;
}
ul {
  list-style: none;   
}
#app {
   position: absolute;
   top: 0;
   bottom: 0;
   right: 0;
   left: 0;

}
</style>
