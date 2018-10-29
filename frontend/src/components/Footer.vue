<template>
  <!-- everything within one div -->
  <footer>
    <p> {{ groupname }} </p>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      groupname: 'SENG2021'
    }
  }
}
</script>

<style scoped>
  footer {
    background: #003366;
    padding: 6px;
  }
  p {
    color: white;
    text-align: center;
  }
</style>
