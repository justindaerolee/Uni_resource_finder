<template>
  <div id="course-search">
    <input type="text" v-model="newCourse" placeholder="Course Search" v-on:keyup.enter="couChanged" />
    <div v-if="this.searchKeys.courseName.length>0" >
      <span> {{this.searchKeys.courseCode}} {{this.searchKeys.courseName}} </span>
      <div id="videos">
        <iframe v-for="v in this.searchKeys.videoLinks" v-bind:src="v" frameborder="0" allowfullscreen>{{v}}</iframe>
      </div>
      <div id="books">
        <table border="0" align="center">
          <td v-for="b in this.searchKeys.allBooks.slice(0,4)" width="24%">
            <a v-bind:href="b.getit" target="_blank">
              <tr><img v-bind:src="b.img"></img></tr>
              <tr>{{b.title}}</tr>
            </a>
          </td>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['searchKeys'],
  data() {
    return {
      newCourse: this.searchKeys.courseCode,
      books: this.searchKeys.allBooks,
    }
  },
  methods: {
    couChanged: function() {
      this.$emit('corChanged',this.newCourse);
      this.searchKeys.keyword = this.searchKeys.courseName;
      this.getBooks();
    },
    getBooks: function() {
      this.books = [];
      for (let b in this.searchKeys.allBooks) {
        if (this.searchKeys.allBooks[b].img != "") {
          this.books.push(this.searchKeys.allBooks[b]);
          console.log(this.searchKeys.allBooks[b]);
        }
      }
    },
  },
}
</script>

<style scoped>
input {
  display: block;
  align: center;
  padding: 25px;
  border: 1px solid #015249;
  font-size: 16px;
  width: 60%;
  margin: 50px auto 50px auto;
}
#videos, #books {
  border: 1px;
  border-style: solid;
  padding: 10px 0;
  margin: 20px auto;
  box-sizing: border-box;
  background: linear-gradient(90deg,#c6e8f6,#c1c8e4);
  width: 75%;
  align: center;
  text-align: center;
}
span {
  margin: 10px auto;
  padding: 5px 10px;
  display: block;
  text-align: center;
  color: #4484CE;
  font-weight: bold;
  font-size: 130%;
}
iframe {
  display: inline-block;
  width: 45%;
  height: 300px;
  padding: 15px;
  align: center;
}
a {
  text-decoration: none;
  color: #003366;
  font-size: 16px;
}
a:hover {
  font-weight: bold;
}
</style>
