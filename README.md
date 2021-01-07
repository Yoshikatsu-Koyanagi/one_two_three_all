# one_two_three_all
‣example

 ----index.html----
  ````
  <div id="App">

      <mycomp1
      :width = 200
      :height = 200
      @click1="click1"></mycomp1>

      <mycomp2
      :width = 200
      :height = 200
      @click2=click2></mycomp2>
      
      <mycomp3
      :width = 200
      :height = 200  
      @click3=click3></mycomp3>

      <mycompall
      :width = 200
      :height = 200  
      @clickall=clickall></mycompall>
      
    </div>

  ````
  
  ----index.js----
  ````
import Vue from 'vue';
import {component_btn1, component_btn2, component_btn3, component_btnAll} from 'one_two_three_all';

new Vue({
    el: '#App',
    data: {          
    },
    components: {
        'mycomp1': component_btn1,
        'mycomp2': component_btn2,
        'mycomp3': component_btn3,
        'mycompall': component_btnAll,
    },
    methods: {
        click1(){
            console.log("1")
        },
        click2(){
            console.log("2")
        },
        click3(){
            console.log("3")
        },
        clickall(){
            console.log("all")
        },
    }
}) 

 ````
