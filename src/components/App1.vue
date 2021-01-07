<template>
   <canvas ref="canv" :width="width" :height="height"></canvas>
</template>

<style scoped>
  canvas{
    background-color: white;
  }
</style>

<script>
export default { 
  props: ["width","height","bg_c_1","bg_c_2"],
  data() {
    return {
      font_ratio: 0.8, //数字ボタンの高さに対するフォントサイズの割合
      font_name: "meirio", //フォントの書体
    }
  },
  methods: {
    draw_1_btn(num_color){
      this.context.clearRect(0,0,this.width,this.height);
      this.context.fillStyle = num_color;
      this.context.fillRect(0,0,this.width,this.height);

      //数字ボタンの"数字"
      this.context.font = this.font;
      this.context.fillStyle = "rgba(0,0,0,1)";
      this.context.textAlign = "center";
      this.context.fillText(1, this.width*0.5, this.height*0.8,this.width);
    },
  },
  mounted() {
    let canvas = this.$refs.canv;
    this.context = canvas.getContext('2d');

    if (this.bg_c_1 === undefined){
      this.bg1 = "rgba(20,49,237,0.1)";
    } 
    else {
      this.bg1 = this.bg_c_1;
    }
    if (this.bg_c_2 === undefined){
      this.bg2 = "rgba(20,49,237,0.15)";
    }
    else {
      this.bg2 = this.bg_c_2;
    }
    
    //数字ボタンを作成
    this.font_size = this.height*this.font_ratio; //フォントサイズ
    this.font = `${this.font_size}px ${this.font_name}`; //フォントサイズと書体    
    let num_color; //数字ボタンの色
    this.gradient = this.context.createLinearGradient(this.width*0.5,0,this.width*0.5,this.height);
    this.gradient.addColorStop(0.0 , 'rgba(0,0,0,0.35)');
    this.gradient.addColorStop(0.8 , 'rgba(0,0,0,0.05)');
    num_color = this.gradient;
    this.draw_1_btn(num_color);

    let num_down = false;
    let touch = false;   

    //タッチされたとき（スマホ）
    canvas.addEventListener('touchstart', () => { 
        let gradient = this.context.createLinearGradient(this.width*0.5,0,this.width*0.5,this.height);
        gradient.addColorStop(0.0 , 'rgba(0,0,0,0.5)');
        gradient.addColorStop(0.8 , 'rgba(0,0,0,0.3)');
        num_color = gradient;
        this.draw_1_btn(num_color);
        num_down = true;
        touch = true;
    },　{
      passive: true
    });

    //タッチが離れたとき（スマホ）
    canvas.ontouchend = (e) => {
        num_color = this.gradient;
        this.draw_1_btn(num_color);  
        //数字ボタンが押されて且つ数字ボタン上で離されたとき        
        if (num_down == true) {
        this.$emit("click1");
        num_down = false;
        touch = true;
        }
    }

    //クリックが押されたとき
    canvas.onmousedown = (e) => {
      if (touch == false) {
        let gradient = this.context.createLinearGradient(this.width*0.5,0,this.width*0.5,this.height);
        gradient.addColorStop(0.0 , 'rgba(0,0,0,0.5)');
        gradient.addColorStop(0.8 , 'rgba(0,0,0,0.3)');
        num_color = gradient;
        this.draw_1_btn(num_color);
        num_down = true;
      }
    }

    //クリックが離されたとき
    canvas.onmouseup = (e) => {
      if (touch == false) {
        num_color = this.gradient;
        this.draw_1_btn(num_color); 
        //数字ボタンが押されて且つ数字ボタン上で離されたとき        
        if (num_down == true) {
          this.$emit("click1");
          num_down = false;
        }
      }
    } 

    //マウスがキャンバス外に出た時
    canvas.onmouseout = (e) => {
      if (touch == false) {
        num_color = this.gradient;
        this.draw_1_btn(num_color);
        num_down = false;
      }
    }      
  },
}
</script>