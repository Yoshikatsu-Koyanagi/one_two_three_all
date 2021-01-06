# one_two_three_button
‣example
 ----index.html----
  ````
  <div id="App">

      <mycomp1
      :width = 200
      :height = 200
      :bg_c_1 = bg_c_1                                //背景の端の色 (書かなければデフォルト:"rgba(20,49,237,0.1)")
      :bg_c_2 = bg_c_2                                //背景の端と中央の間の色 (書かなければデフォルト:"rgba(20,49,237,0.1)")
      @click1="click1"></mycomp1>

      <mycomp2
      :width = 200
      :height = 200
      :bg_c_2 = bg_c_2                                
      :bg_c_3 = bg_c_3                                //背景の中央の色 (書かなければデフォルト:"rgba(20,49,237,0.1)")
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
import {component_btn1, component_btn2, component_btn3, component_btnAll} from 'one_two_three_all';

new Vue({
    el: '#App',
    data: {
        bg_c_1: "rgba(10,100,200,0.1)",                //背景の端の色 
        bg_c_2: "rgba(10,100,200,0.15)",               //背景の端と中央の間の色
        bg_c_3: "rgba(10,100,200,0.3)",                //背景の中央の色
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
