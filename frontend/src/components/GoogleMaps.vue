<template>
  <div id="map-page">
    <div id="google-map">
      <gmap-map :center="center" :zoom="15" style="width: 700px; height: 500px; border: 1px solid black">
        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position">
        </gmap-marker>
      </gmap-map>
    </div>
    <table border="0" align="center">
      <tr>
        <td v-if="thumbnail" rowspan="2" max-width="15%"><img v-bind:src="thumbnail"></td>
        <td v-else rowspan="2" width="15%"><img src="../File/bookicon.png"></td>
        <td width="20%">Book Title:</td>
        <td align="left">{{title}}</td>
      </tr>
      <tr>
        <td width="20%">Location:</td>
        <td align="left">Parkes Pl W, Canberra ACT 2600</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDN4zBiJA_RA49ojeZpaJGNok0nCPo3c_8',
      libraries: 'places', //// If you need to use place input
    }
  });

  export default {
    props: ['searchKeys'],
    data () {
      return {
        title: this.searchKeys.chosenBook['title'],
        thumbnail: this.searchKeys.chosenBook['img'],
        center: {lat: -35.296623, lng: 149.129822},
        markers: [
          { position: {lat: -35.296623, lng: 149.129822 }},
        ]
      }
    },
  }
</script>

<style scoped>
  #google-map {
    padding: 10px;
    margin: auto 25%;
    text-align: center;
  }
  #map-page {
    text-align: center;
  }
  table {
    margin: 10px auto;
    width: 50%;
    text-align: center;
  }
  img {
    width: 120px;
  }
  tr {
    text-align: center;
  }
</style>
