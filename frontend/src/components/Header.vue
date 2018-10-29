<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/" exact> Home </router-link></li>
        <li><router-link to="/keywordsearch" exact> Book Search </router-link></li>
        <li><router-link to="/coursesearch" exact> Course Search </router-link></li>
      </ul>
    </nav>
     <div id="logo">
       <img src="../File/logo.png">
     </div>
  </header>
</template>

<script>
export default {
  props: ['searchKeys'],
  data () {
    return {
      title: 'Ventures'
    }
  },
}
</script>

<style scoped>
  header {
    /*background: linear-gradient(145deg,#8860d0,#5680e9,#5ab9ea,#84ceeb,#c1c8e4);*/
    padding-bottom: 15px;
  }
  #logo {
    margin: 20px, auto, 20px, auto;
    text-align: center;
  }
  nav {
    background: WHITE;
    padding: 15px 0;
    margin-bottom: 30px;
    color: #003262;
    top: 0;
  }
  ul {
    list-style-type: none;
    text-align: center;
    margin: 0;
  }
  li {
    display: inline-block;
    margin: 0 20px;
  }
 a {
   text-decoration: none;
   color: #257ea5;
   padding: 6px 8px;
   border-radius: 10px;
 }
 .router-link-active {
   background: #1b9ce5;
   color: WHITE;
  }
  h1 {
    font-size: 65px;
  }
</style>
