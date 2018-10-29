<template>
  <div id="home-page">
    <div id="back">
      <img src="../File/openbook.png">
      <input type="text" v-model="newKeyword" placeholder="search"/>
      <div id="search-buttons">
        <router-link to="/keywordsearch" exact>
          <button v-on:click="keyChanged"> Book Search </button>
        </router-link>
        <router-link to="/coursesearch" exact>
          <button v-on:click="corChanged"> Course Search </button>
        </router-link>
      </div>
    </div>

    <div id="tabset" border="1">
      <label v-bind:class={firstbar:isFirst} v-on:click="isFirst=true">Search By Course Code</label>
      <label v-bind:class={firstbar:!isFirst} v-on:click="isFirst=false">Search By Subject</label>
      <div id="tab-panels">
        <section id="coursecode" v-if="isFirst">
          <div id="scroll">
            <table id="alpha" border="0" align="center">
              <tr v-for="i in range(0,26,9)">
                <td v-for="a in range(i,i+9,1)" v-if="a<26"> <button v-on:click="alphaChanged(alpha[a])">{{alpha[a]}}</button> </td>
              </tr>
            </table>
            <br><br>
            <router-link to="/coursesearch" exact>
              <table id="listCourse" border="0">
                <tr v-for="c in this.lessCourses" @click="newKeyword=c.code" v-on:click="corChanged">
                  <td colspan="2">{{c.code}}</td>
                  <td colspan="5">{{c.name}}</td>
                </tr>
              </table>
            </router-link>
            <div id="showing">
              <button v-if="this.showing>0 && this.showing<=this.totalShowing" @click="showMore">Show More...</button>
            </div>
            <br>
          </div>
        </section>
        <section id="subjecttypes" v-if="!isFirst">
          <router-link to="/subject"><p v-for="s in this.subjects" v-on:click="subjectFound(s)">{{s}}</p></router-link>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['searchKeys'],
  data() {
    return {
      isFirst: true,
      newKeyword: "",
      courses: [],
      lessCourses: [],
      showing: 0,
      totalShowing: 0,
      alpha: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      subjects: ["Accounting & Finance","Business","Computer Science & Information Systems","Economics","Education","Humanities","Mathematics","Natural Sciences","Social Sciences"],
    }
  },
  methods: {
    subjectFound: function(s) {
      var sub = s;
      this.$emit('subjectFound',sub);
    },
    keyChanged: function() {
      this.$emit('keyChanged', this.newKeyword);
    },
    corChanged: function() {
      this.$emit('corChanged', this.newKeyword);
    },
    alphaChanged: function(letter) {
      this.showing = 10;
      this.courses = [];
      this.lessCourses = [];
      for (let c in this.searchKeys.allCourses.courseinfo) {
        if (this.searchKeys.allCourses.courseinfo[c].code.charAt(0) == letter) {
          var cor = {};
          cor['name'] = this.searchKeys.allCourses.courseinfo[c].name;
          cor['code'] = this.searchKeys.allCourses.courseinfo[c].code;
          this.courses.push(cor);
        }
      }
      this.lessCourses = this.courses.slice(0,this.showing);
      if (this.courses) {
        this.totalShowing = this.courses.length;
      }
    },
    showMore: function() {
      this.showing *= 2;
      if (this.courses && this.courses.length>this.showing) {
        this.lessCourses = this.courses.slice(0,this.showing);
      } else {
        this.lessCourses = this.courses;
      }
    },
  }
}
</script>

<style scoped>
  #landing-display img{
    /*background: linear-gradient(90deg,#c6e8f6,#c1c8e4);*/
    max-width: 35%;
    align-items: center;

  }
  #home-page img {
    max-width: 50%;
    align-items: center;
  }
  #scroll {
    width: 60%;
    table-layout: fixed;
    text-align: center;
    margin: auto;
    margin-top: 50px;
  }
  #showing button{
    background: transparent;
    font-size: 16px;
    border: 0;
    padding: 30px;
  }
  #showing button:hover{
    font-weight: bold;
  }
  #back {
    display: block;
    height: auto;
    text-align: center;
    margin-top: 30px;
  }
  input {
    display: block;
    align: center;
    padding: 20px;
    border: 1px solid #003366;
    font-size: 16px;
    width: 50%;
    margin: auto;
  }
  #search-buttons {
    width: 40%;
    text-align: center;
    display: flex;
    margin: 20px auto auto auto;
    justify-content: space-around;
  }
  #search-buttons button {
    margin: 15px auto;
    background: linear-gradient(90deg,#8860d0,#5680e9);
    color: WHITE;
    border-radius: 12px;
    height: 60px;
    width: 150px;
    border: 0px;
    font-size: 15px;
  }
  #search-buttons button:hover {
    font-size: 20px;
  }
  a {
    text-decoration: none;
    color: BLACK;
  }
  table {
    width: 40%;
    text-align: center;
    margin: auto;
  }
  #alpha {
    width: 60%;
    table-layout: fixed;
    text-align: center;
    margin: auto;
  }
  #alpha button{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    font-size: 18px;
    background: #5a2ee5;
    border: 0;
    color: WHITE;
  }
  #alpha button:hover{
    color: #5a2ee5;
    background: WHITE;
    font-size: 23px;
  }
  #listCourse{
    table-layout: fixed;
    width: 100%;
    text-align: center;
  }
  #listCourse tr:hover {
    font-weight: bold;
  }
  th, td {
    color: #333A56;
    padding: 8px;
  }
  #tab-panels {
    border-top: 1px solid transparent;
    background: #c1c8e4;
    padding-bottom: 5px;
  }
  #tabset {
    margin: 100px;
    text-align: right;
  }
  label{
    position: relative;
    display: inline-block;
    padding: 20px 40px;
    border: 1px solid #c1c8e4;
    border-bottom: 0;
    cursor: pointer;
    background: white;
  }
  .firstbar{
    background: #c1c8e4;
  }
  #subjecttypes {
    text-align: center;
  }
  #subjecttypes p:hover{
    font-weight: bold;
  }
</style>
