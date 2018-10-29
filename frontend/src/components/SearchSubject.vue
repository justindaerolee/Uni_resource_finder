<template>
  <div id="subject-page">
    <h2>{{this.chose}}</h2>
    <div id="learning">
      <h3 align="center">Free Course</h3>
      <table id="learning-table" v-for="s in subjects" border="0" cellpadding="5px">
        <tr>
          <td rowspan="3"><iframe v-bind:src="s.promoMediaUrl" frameborder="" allowfullscreen height="200px"></iframe></td>
          <td width="100px">Course Name:</td>
          <td>{{s.name}}</td>
          <td rowspan="2" align="right"><a v-bind:href="s.courseUrl" target="_blank"><button>Join Course</button></a></td>
        </tr>
        <tr>
          <td width="100px">Tutor:</td>
          <td>{{s.creator.fullName}}</td>
        </tr>
        <tr>
          <td colspan="3">Summary: &nbsp{{s.summary | snippet}}</td>
        </tr>
      </table>
    </div>
    <div id="files">
      <div id="single-file" >
        <h3 align="center">Free PDF</h3>
        <table id="files-table" v-for="f in pdfs" border="0">
          <tr>
            <td rowspan="3" width="20px"><img v-bind:src="f.image"></td>
            <td width="50px">Title:&nbsp</td>
            <td width="330px">{{f.title}}</td>
          </tr>
          <tr>
            <td width="50px">Author:&nbsp</td>
            <td width="330px">{{f.author}}</td>
          </tr>
          <tr>
            <td colspan="2" align="right"><a v-bind:href="f.getit" target="_blank"><button>Get It</button></a></td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import pdfbooks from '../File/pdfbooks.json';
import openlearning from '../File/openlearning.json';

export default {
  props: ['searchKeys'],
  data() {
    return {
      pdfs: pdfbooks.pdfinfo,
      subjects: openlearning.courses,
      chose: this.searchKeys.chosenSubject,
    }
  },
  beforeMount() {
    this.pdfs = [];
    for (let p in pdfbooks.pdfinfo) {
      if (this.searchKeys.chosenSubject == pdfbooks.pdfinfo[p].subject) {
        this.pdfs.push(pdfbooks.pdfinfo[p]);
      }
    }
    this.subjects = [];
    for (let c in openlearning.courses) {
      if (this.searchKeys.chosenSubject == openlearning.courses[c].category) {
        this.subjects.push(openlearning.courses[c]);
      }
    }
  },
  filters: {
    'snippet': function(value) {
      if (value && value.length > 600) {
        return value.slice(0,600) + '...';
      } else {
        return value;
      }
    }
  }
}
</script>

<style scoped>
img {
  padding: auto;
  padding-right: 10px;
  width: 100px;
  height: 150px;
}
#subject-page h2{
  text-align: center;
}
#single-file {
  padding: 10px;
  margin: 50px auto;
  box-sizing: border-box;
  background: #eef2fc;
  width: 90%;
  align: center;
  height: 600px;
  overflow-y: scroll;
}
#files-table {
  display: inline-block;
  margin: 15px;
  background: #fcfcfc;
}
#learning {
  padding: 20px;
  margin: 50px auto;
  box-sizing: border-box;
  background: #f3effa;
  width: 90%;
  align: center;
  height: 800px;
  overflow-y: scroll;
  display: block;
}
#learning-table {
  padding: 10px;
  background: #fcfcfc;
  display: inline-block;
  margin: 10px auto;
}
button {
  background: linear-gradient(90deg,#8860d0,#5680e9);
  color: white;
  border: none;
  border-radius: 50px;
  height: 30px;
  font-size: 12px;
}
button:hover {
  color: black;
}
h2 {
  color: #003366;
  margin: 50px auto;
}
</style>
