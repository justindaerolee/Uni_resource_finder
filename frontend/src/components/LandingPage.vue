<template>
  <div id="landing-page">
    <img src="../File/logo.png">
    <article id="caption">
        <img id="caption_image" src="../File/book.png" />
        <div id="caption_overlay">
            <h1 id="caption_overlay_title">About Us</h1>
            <p>At Ventures we came up with an easy solution for current and/or future university students.</p>
            <p>Ventures utilises various api to assist you in finding the perfect book for you studies, whether you are looking for the cheapest book, the newest publication, or even in a specific format.</p>
            <p>Our goal is to provide books that suits student the most, and therefore our contents will be mostly free and affordable to uni students.</p>
            <p>For future uni students we also provide the functionality to search by subject, where students can experience what it's like to study this subject, by enrolling in a course or read some relevant textbooks all absolutely free.</p>
            <p>We also provide, for current uni students, to search by coursecode, where students can also gain knowledge by watch tutorials of the relevant course and discover text materials.</p>
            <p><br>Browse through as discover more!</p>
        </div>
    </article>
</div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  h1 {
    margin: auto 0 20px auto;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.5);
    padding: 8px;
    width: 10%;
    text-align: center;
  }
  p {
    margin: 0;
    padding: 0 0 .5em;
    color: white;
  }
  #landing-page {
    margin: 0 auto;
    width: 90%;
    text-align: center;
  }
  #landing-page img {
    margin: 30px auto;
  }
  #caption_image {
    display: block;
    width: 65%;
  }
  #caption {
    position: relative;
    overflow: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  #caption::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
    transition: background .35s ease-out;
  }
  #caption:hover::before {
    background: rgba(0, 0, 0, .9);
  }
  #caption_overlay {
    position: absolute;
    top: 10%;
    right: 5%;
    bottom: 5%;
    left: 5%;
    color: white;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    transition: -webkit-transform .35s ease-out;
    transition: transform .35s ease-out;
    font-size: 20px;
    text-align: left;
  }
  #caption:hover #caption_overlay {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  #caption:hover h1 {
    background: transparent;
  }
  #caption_overlay_title {
    -webkit-transform: translateY(-webkit-calc(-100% - 10px) );
    transform: translateY(calc(-100% - 10px) );
    transition: -webkit-transform .35s ease-out;
    transition: transform .35s ease-out;
  }
  #caption:hover #caption_overlay_title {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
</style>
