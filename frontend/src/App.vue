<template>
  <div>
    <div v-if="entered==false" @click="entered=true">
      <landing-page></landing-page>
    </div>
    <div v-if="entered==true">
      <app-header></app-header>
      <router-view  v-bind:searchKeys="searchKeys"
                    v-on:mapping="findit($event)" v-on:keyChanged="changeKey($event)"
                    v-on:corChanged="changeCou($event)" v-on:subjectFound="subjectFound($event)"></router-view>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import SearchBooks from './components/SearchBooks.vue';
import HomePage from './components/HomePage.vue';
import SearchCourses from './components/SearchCourse.vue';
import CourseName from './File/coursenames.json';
import LandingPage from './components/LandingPage.vue';
import GoogleMaps from './components/GoogleMaps.vue';
import PDFs from './File/pdfbooks.json';

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'landing-page': LandingPage,
  },
  data () {
    return {
      searchKeys: {
        keyword: "",
        allBooks: [],
        courseName: "",
        courseCode: "",
        allCourses: CourseName,
        videoLinks: [],
        chosenBook: {},
        chosenSubject: "",
        hasPDF: false,
      },
      entered: false,
      pdfs: PDFs,
    }
  },
  methods: {
    subjectFound: function(data) {
      this.searchKeys.chosenSubject = data;
    },
    findit: function(data) {
      if (data['img']) {
        this.searchKeys.chosenBook['img'] = data['img'];
      }
      this.searchKeys.chosenBook['title'] = data['title'];
    },
    changeKey: function(data) {
      this.searchKeys.keyword = data;
      this.searchKeys.allBooks = [];
      this.searchKeys.courseName = "";
      this.searchKeys.videoLinks = [];
      this.getBooks();
    },
    changeCou: function(data) {
      this.searchKeys.courseCode = data;
      this.searchKeys.allBooks = [];
      this.searchKeys.courseName = "";
      this.searchKeys.videoLinks = [];
      this.getCourse();
      this.getBooks();
    },
    getCourse: function() {
      this.searchKeys.courseCode = this.searchKeys.courseCode.toUpperCase();
      for (let c in this.searchKeys.allCourses.courseinfo) {
        if (this.searchKeys.allCourses.courseinfo[c].code == this.searchKeys.courseCode) {
          this.searchKeys.courseName = this.searchKeys.allCourses.courseinfo[c].name;
          this.searchKeys.keyword = this.searchKeys.allCourses.courseinfo[c].name;
          break;
        }
      }
      //when API works should be changed into:
      this.$http.get('http://localhost:4000/api/youtube?search='+this.searchKeys.courseName).then(function(data) {
        for (let d in data.body) {
          var obj = {};
          obj = data.body[d];
          this.searchKeys.videoLinks.push(obj);
        }
        //only display 4 results:
        if (this.searchKeys.videoLinks.length > 4) {
          this.searchKeys.videoLinks = this.searchKeys.videoLinks.slice(0,4);
        }
      })
    },
    getBooks: function() {
      this.searchKeys.hasPDF = false;
      this.searchKeys.allBooks = new Array();
      //google books
      this.$http.get('http://localhost:4000/api/googleBooks?search='+this.searchKeys.keyword).then(function(data) {
        for (let e in data.body){
          var obj = new Object();
          obj = data.body[e];
          this.searchKeys.allBooks.unshift(obj);
        }
      });
      //free pdfs
      for (let p in this.pdfs.pdfinfo) {
        var word = this.searchKeys.keyword.toLowerCase();
        if (this.pdfs.pdfinfo[p].title.includes(word)) {
          var obj = {};
          obj['title'] = this.pdfs.pdfinfo[p].title;
          obj['type'] = 'PDF';
          obj['price'] = 0;
          obj['author'] = this.pdfs.pdfinfo[p].author;
          obj['img'] = this.pdfs.pdfinfo[p].image;
          obj['getit'] = this.pdfs.pdfinfo[p].getit;
          obj['description'] = this.pdfs.pdfinfo[p].description;
          this.searchKeys.allBooks.push(obj);
          this.searchKeys.hasPDF = true;
        }
      };
      //national library
      this.$http.get('http://localhost:4000/api/nla?search='+this.searchKeys.keyword).then(function(data) {
        for (let b in data.body) {
          var obj = new Object();
          obj = data.body[b];
          this.searchKeys.allBooks.push(obj);
        }
      });
      //goodreads
      this.$http.get('http://localhost:4000/api/goodRead?search='+this.searchKeys.keyword).then(function(data) {
        for (let b in data.body) {
          var obj = new Object();
          obj = data.body[b];
          this.searchKeys.allBooks.push(obj);
        }
      });
      //ebay
        this.$http.get('http://localhost:4000/api/ebay?search='+this.searchKeys.keyword).then(function(data) {
            for (let c in data.body) {
                var obj = new Object();
                obj = data.body[c];
                this.searchKeys.allBooks.push(obj);
            }
        });
      //this.searchKeys.allBooks = this.searchKeys.allBooks.sort(function(a,b) {return (b.type > a.type) ? 1 : ((a.type > b.type) ? -1 : 0);} );
    },
  }
}
</script>

<style>

</style>
