<template>
  <div class="footer" style="z-index: 99999">
    <p class="copyright" ><a  href="https://www.linkedin.com/in/arielzimbrao/" target="_blank" >
      ©2018 - Ariel Zimbrão - Direitos reservados - v0.0.1
    </a></p>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      title: "Cabeçalho"
    }
  }
}
</script>

<style>
.footer {
  border: 2px;
  border-color: #4CAF50;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 45px;
  width: 100%;
  background-color: #FFFFFF;
  color: black;
  font-size: 13px;
}

.copyright {
  text-align: right;
  margin-right: 15px;
}
</style>
