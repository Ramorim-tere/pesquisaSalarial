<template>
  <div>
    <div class="login-page">
      <div class="form">
        <h1>{{ title }}</h1>
        <form id="respostas" class="login-form">
          <input type="text"
            v-model.lazy="cbo"
            @change="cboChanger"
            maxlength="6"
            placeholder="CBO da sua profissão"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
          />
          <input type="text" v-model="newProfNome" placeholder="Nome do cargo" :disabled="newProf"/>
          <input type="number" step="0.01"
            v-model="salary"
            placeholder="Salario"
          />
          <div class="labelBeneficios">Marque os Beneficos que esse cargo possui:</div>
          <div class="termo" v-for="item in beneficios">
            <label class="container">{{ item.nome }}
              <input type="checkbox" v-model="item.ativo">
              <span class="checkmark"></span>
            </label>
          </div>
          <button v-on:click.prevent="salvar">Salvar</button>
        </form>
      </div>
    </div>
    <rodape></rodape>
  </div>
</template>

<script>
import Rodape from './Rodape.vue';
import axios from 'axios';
import Vue from 'vue'

export default {
  name: 'app',
  components: {
    'rodape': Rodape,
  },
  methods: {
    cboChanger: function () {
      if (this.cbo.length == 6) {
        var th = this;
        axios.get('http://localhost:3000/api/profissao/'+this.cbo).then( function(result) {
          if (!result.data.id) {
            th.newProf = false;
            th.newProfNome = '';
          } else {
            th.newProfNome = result.data.nome;
          }
        })
      }
    },
    salvar: function () {
      const th = this;
      axios.post('http://localhost:3000/api/salvarResposta',{
        salario: this.salary,
        prof: this.cbo,
        profNome: this.newProfNome,
        beneficios: this.beneficios
      }).then( function(result) {
        th.cbo = null;
        th.newProf = true;
        th.newProfNome = '';
      });
    }
  },
  data: function () {
    return {
      title: 'Resposta',
      cbo: '',
      newProf: true,
      newProfNome: '',
      salary: null,
      beneficio: null,
      beneficios: [
        {
          id: 1,
          nome:'Vale Alimentação/Refeição',
          ativo: false,
        },
        {
          id: 2,
          nome: 'Alimentação na empresa',
          ativo: false,
        },
        {
          id: 3,
          nome: 'Plano de Saúde',
          ativo: false,
        },
        {
          id: 4,
          nome: 'Plano Odontológico',
          ativo: false,
        },
        {
          id: 5,
          nome: 'Prêmio de Assiduidade',
          ativo: false,
        },
        {
          id: 6,
          nome: 'Prêmio de Produtividade',
          ativo: false,
        },
      ]
    }
  }
}
</script>

<style>

h1, h2 {
  font-weight: normal;
}
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.labelBeneficios {
  margin-bottom: 20px;
  margin-top: 10px;
}
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
  max-width: 500px;
  min-width: 200px;
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
  margin-top: 20px;
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

.container {
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: #eee;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #76b852;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 5px;
  top: 1px;
  width: 3px;
  height: 9px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
