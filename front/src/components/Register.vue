<template>
  <div>
    <div class="login-page">
      <div class="form">
        <h1>{{ title }}</h1>
        <form id="login" class="login-form">
          <input type="email" v-model="email" placeholder="Email"/>
          <input type="password" v-model="senha" placeholder="Senha"/>
          <input type="text"
            v-model="cbo"
            maxlength="6"
            placeholder="CBO da sua profissão"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
          />
          <div class="termoAdesao"><pre>
          Termo de Adesão blablablabla
          </pre></div>
          <div class="termo">
            <span><input type="checkbox" class="check" name="termo" v-model="termo"> Aceito o termo de privacidade</span>
          </div>
          <button v-on:click.prevent="cadastrar" v-if="this.termo" :disabled="!this.termo" >Cadastar</button>
          <p class="message">Já possui um cadastro?
            <a href="/">Realizar login</a>
          </p>
        </form>
      </div>
    </div>
    <rodape></rodape>
  </div>
</template>

<script>
import Rodape from './Rodape.vue';
import axios from 'axios';
import Vue from 'vue';

export default {
  name: 'app',
  components: {
    'rodape': Rodape,
  },
  methods: {
    cadastrar: function (event) {
      const cboDig = this.cbo;
      const emailDig = this.email;
      const passwordDig = this.senha;

      const url = 'http://localhost:3000/api/profissao/'+ cboDig;
       axios.get(url).then( function (result) {
         if (!result.data.id) {
           const nomeProf = prompt("Qual é o nome da profissão?")
            if (nomeProf) {
              axios.post('http://localhost:3000/api/novo/profissao', {
                nome: nomeProf,
                cbo: cboDig,
              }).then( function (result) {
                axios.post('http://localhost:3000/api/novo/usuario', {
                  email: emailDig,
                  password: passwordDig,
                  cbo: result.data,
                }).then( function (result) {
                  Vue.cookie.set('userID',result.data,1)
                  window.location="http://localhost:8080/respostas";
                })
              }, function (err) {
                alert(err)
              })
            }
         } else {
           axios.post('http://localhost:3000/api/novo/usuario', {
              email: emailDig,
              password: passwordDig,
              cbo: result.data,
            }).then( function (result) {
              Vue.cookie.set('userID',result.data,1)
              window.location="http://localhost:8080/respostas";
            })
         } 
      }, function (err) {
        alert(err)
      })
    },
  },
  data: function () {
    return {
      title: 'Cadastro',
      email: '',
      senha: '',
      cbo: '',
      termo: false
    }
  }
}
</script>

<style>

h1, h2 {
  font-weight: normal;
}
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.termo {
  text-align: left !important;
  font-size: 13px !important;
  margin-bottom: 5px !important;
  cursor:pointer;
}

.check {
  margin: 0px !important;
  width: 15px !important;
}

.termoAdesao {
  overflow-y:scroll;
  font-family: "Roboto", sans-serif;
  max-height: 200px;
  max-width: 700px;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 10px;
}
.login-page {
  width: 800px;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 700px;
  min-width: 500px;
  margin: 0 auto auto ;
  padding: 15px 45px 45px 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form select {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852;
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
  background: -moz-linear-gradient(right, #76b852, #8DC26F);
  background: -o-linear-gradient(right, #76b852, #8DC26F);
  background: linear-gradient(to left, #76b852, #8DC26F);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
</style>
