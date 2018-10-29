
<template>
  <div id="search-books">
    <table id="search-bar" border="0" align="center" width="70%">
      <tr>
        <td width="60%">
          <input type="text" v-model="newKeyword" placeholder="Keyword Search" v-on:keyup.enter="keyChanged" />
        </td>
        <td style='text-align: right'>
          <select v-model="selectedFilter" @change="filterUtil">
            <option disabled value=""> Filter </option>
            <option v-for="f in filters" v-bind:value="f"> {{f}} </option>
          </select>
        </td>
        <td style='text-align: right'>
          <select v-model="selectedSort" @change="sortUtil">
            <option disabled value=""> Sort By </option>
            <option v-for="s in sorts" v-bind:value="s"> {{s}} </option>
          </select>
        </td>
      </tr>
    </table>
    <p v-if="hasPDF==true" align="center">*free PDF available for this search*</p>
    <div v-for="book in books">
      <table id="singlebook" border="0" padding="1">
        <tr>
          <td rowspan="5" v-if="book.img"><img v-bind:src="book.img"></img></td>
          <td rowspan="5" v-else><img src="../File/bookicon.png"></img></td>
          <td id="book-type" colspan="4" valign="bottom" align="right" v-if="book.type=='PDF'" style="font-weight: bold"> FREE&nbsp&nbsp{{book.type}} </td>
          <td id="book-type" colspan="4" valign="bottom" align="right" v-else> {{book.type}} </td>
        </tr>
        <tr>
          <td width="71%"> <h3> {{book.title | to-uppercase}} </h3> </td>
          <td width="11%" valign="bottom" align="center" v-if="book.publish"> Published </td>
          <td width="11%" valign="bottom" align="center" v-else> &nbsp </td>
          <td width="11%" valign="bottom" align="center"> Price </td>
        </tr>
        <tr>
          <td width="77%" v-if="book.author && book.author.length>0"> <strong>Author: &nbsp&nbsp</strong> {{book.author}} </td>
          <td width="77%" v-else></td>
          <td width="11%" valign="top" align="center"> <font> {{book.publish}} </font> </td>
          <td width="11%" valign="top" align="center"> <font> {{book.price}} </font> </td>
        </tr>
        <tr>
          <td v-if="book.isbn && book.isbn.length>0"> <strong>ISBN: &nbsp&nbsp</strong> {{book.isbn}}</td>
          <td v-else></td>
        </tr>
        <tr>
          <td colspan="1" width="40%" v-if="book.description && book.description.length>0"> <article> <strong>Description: &nbsp&nbsp</strong> {{book.description | snippet}} </article> </td>
          <td colspan="1" width="40%" v-else></td>
          <td width="10%" valign="bottom" align="right">
            <router-link to="/googlemaps">
            <button v-if="hasLocation(book)" v-on:click="mapping(book)"> Find it </button>
            </router-link>
          </td>
          <td width="10%" valign="bottom" align="right">
            <a v-bind:href="book.getit" target="_blank"><button> Get it </button></a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>

export default {
  props: ['searchKeys'],
  data() {
    return {
      selectedFilter: "",
      selectedSort: "",
      filters: ['New','Borrowable','PDF','Ebook','Used'],
      sorts: ['Price: lowest','Price: highest', 'Publish: newest', 'Publish: oldest'],
      newKeyword: this.searchKeys.keyword,
      books: this.searchKeys.allBooks,
      hasPDF: this.searchKeys.hasPDF,
    }
  },
  methods: {
    sortUtil: function() {
      if (this.selectedSort == 'Price: lowest') {
          this.books = this.books.sort(function(a, b){ return a.price-b.price});
      } else if (this.selectedSort == 'Price: highest') {
          this.books = this.books.sort(function(a, b){return b.price-a.price});
      } else if (this.selectedSort == 'Publish: newest') {
          this.books = this.books.sort(function(a, b){return b.publish-a.publish});
      } else {
          this.books = this.books.sort(function(a, b){return a.publish-b.publish});
      }
    },
    filterUtil: function() {
      this.books = [];
      for (let b in this.searchKeys.allBooks) {
        if (this.searchKeys.allBooks[b].type == this.selectedFilter) {
          this.books.push(this.searchKeys.allBooks[b]);
        }
      }
    },
    mapping: function(book) {
      this.$emit('mapping', book);
    },
    keyChanged: function() {
      this.$emit('keyChanged',this.newKeyword);
      this.books = this.searchKeys.allBooks;
      this.hasPDF = this.searchKeys.hasPDF;
      this.selectedFilter = "";
      this.selectedSort = "";
    },
    hasLocation: function(book) {
      if (book.type == "Borrowable" && !book.rating) {
        return true;
      } else {
        return false;
      }
    },
  },
  filters: {
    'to-uppercase': function(value) {
      return value.toUpperCase();
    },
    'snippet': function(value) {
      if (value) {
        value = value.replace(/\<[^>]+\>/g, "");
      }
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
  #search-bar {
    margin: 50px auto 50px auto;
  }
  #search-books input {
    display: block;
    align: center;
    padding: 25px;
    border: 1px solid #015249;
    font-size: 16px;
    width: 85%;
  }
  #search-books select {
    width: 90%;
    height: 50px;
    border-radius: 3px;
    border: 1px solid #015249;
    font-size: 16px;
    font: italic 16px;
  }
  #singlebook {
    padding: 10px;
    margin: 20px auto;
    box-sizing: border-box;
    background: #F5F5F5;
    width: 75%;
    align: center;
  }
  font {
    color: #1c51d7;
    font-weight: bold;
  }
  strong {
    color: #e95680;
    font-weight: bold;
  }
  button {
    background: linear-gradient(90deg,#8860d0,#5680e9);
    color: white;
    border: none;
    border-radius: 50px;
    height: 30px;
    font-size: 15px;
  }
  button:hover {
    color: black;
  }
  #book-type {
    color: #e95680;
  }
  img {
    padding-right: 15px;
    width: 120px;
  }
  a {
    text-decoration: none;
    color: white;
  }
  #showing {
    text-align: center;
  }
  #showing button{
    font-size: 16px;
    border: 0;
    padding-bottom: 50px;
    color: #5680e9;
    background: transparent;
  }
  #showing button:hover{
    font-weight: bold;
  }
  p {
    font-weight: bold;
    font-size: 15px;
    color: #5680e9;
  }
</style>
