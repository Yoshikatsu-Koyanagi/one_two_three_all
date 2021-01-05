# one_two_three_button
‣example
  ````
  <div id="App">

      <mycomp1
      :width = 200
      :height = 200
      :bg_c_1 = bg_c_1
      :bg_c_2 = bg_c_2
      @click1="click1"></mycomp1>

      <mycomp2
      :width = 200
      :height = 200
      :bg_c_2 = bg_c_2
      :bg_c_3 = bg_c_3
      @click2=click2></mycomp2>
      
      <mycomp3
      :width = 200
      :height = 200  
      :bg_c_2 = bg_c_2
      :bg_c_3 = bg_c_3
      @click3=click3></mycomp3>

      <mycompall
      :width = 200
      :height = 200  
      :bg_c_1 = bg_c_1
      :bg_c_2 = bg_c_2
      @clickall=clickall></mycompall>
      
    </div>

  ````
  
  ----index.js----
  ````
import Vue from 'vue';
import {component1, component2, component3, componentAll} from 'one_two_three_all';

new Vue({
    el: '#App',
    data: {
        bg_c_1: "rgba(20,49,237,0.1)",                //背景の端の色
        bg_c_2: "rgba(20,49,237,0.15)",               //背景の端と中央の間の色
        bg_c_3: "rgba(20,49,237,0.3)",                //背景の中央の色
    },
    components: {
        'mycomp1': component1,
        'mycomp2': component2,
        'mycomp3': component3,
        'mycompall': componentAll,
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
