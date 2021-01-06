<template>
   <canvas ref="canv" :width="width" :height="height"></canvas>
</template>

<style scoped>

</style>


<script>
export default { 
  props: ["width","height","bg_c_2","bg_c_3"],
  data() {
    return {
      num_width_ratio: 0.95,
      num_height_ratio: 0.95,
      flame_weight_ratio: 0.02, //キャンバスの横幅と高さの平均に対するボタンの枠の太さの割合
      font_ratio: 0.8, //数字ボタンの高さに対するフォントサイズの割合
      font_name: "meirio", //フォントの書体
      r_ratio: 0.1, //キャンバスの横幅と高さの平均に対する数字ボタンの枠の角の半径の割合
    }
  },
  methods: {
    draw_3_btn(num_color){
      //数字ボタンの枠
      this.context.globalCompositeOperation = "destination-out";
      this.context.beginPath();
      this.context.moveTo(this.num_side_margin+this.r,this.num_top_margin);
      this.context.arc(this.num_side_margin+this.r, this.num_top_margin+this.r, this.r, Math.PI*1.5, Math.PI, true);  
      this.context.lineTo(this.num_side_margin, this.num_top_margin+this.num_height-this.r);
      this.context.arc(this.num_side_margin+this.r, this.num_top_margin+this.num_height-this.r, this.r, Math.PI, Math.PI*0.5, true); 
      this.context.lineTo(this.num_side_margin+this.num_width-this.r,this.num_top_margin+this.num_height);
      this.context.arc(this.num_side_margin+this.num_width-this.r, this.num_top_margin+this.num_height-this.r, this.r, Math.PI*0.5, Math.PI*0, true); 
      this.context.lineTo(this.num_side_margin+this.num_width,this.num_top_margin+this.r);
      this.context.arc(this.num_side_margin+this.num_width-this.r, this.num_top_margin+this.r, this.r, Math.PI*0, Math.PI*1.5, true); 
      this.context.closePath();
      this.context.fillStyle = "rgba(0,0,0,1)";
      this.context.fill();

      this.context.globalCompositeOperation = "source-over";
      this.context.fillStyle = num_color;
      this.context.fill();

      //数字ボタンの"数字"
      this.context.font = this.font;
      this.context.fillStyle = "rgba(0,0,0,1)";
      this.context.textAlign = "center";
      this.context.fillText(3, this.nbw*0.5, this.num_top_margin+this.num_height*0.8,this.num_width);
    
      this.context.lineWidth = this.flame_weight;	
      this.context.strokeStyle = "rgb(0,0,0)"; 
      this.context.stroke();
    },
  },
  mounted() {
    this.nbw = this.width;
    this.nbh = this.height;

    this.flame_weight = (this.nbw+this.nbh)*0.5*this.flame_weight_ratio //ボタンの枠の太さ
    this.num_width = this.nbw*this.num_width_ratio;
    this.num_height = this.nbh*this.num_height_ratio;
    this.num_side_margin = this.nbw*(1-this.num_width_ratio)*0.5;
    this.num_top_margin = this.nbh*(1-this.num_height_ratio)*0.5;
    this.r = (this.nbw+this.nbh)*0.5*this.r_ratio;
   
    let canvas = this.$refs.canv;
    this.context = canvas.getContext('2d');

    if (this.bg_c_2 === undefined){
      this.bg2 = "rgba(20,49,237,0.15)";
    } else {
      this.bg2 = this.bg_c_2;
    }
    if (this.bg_c_3 === undefined){
      this.bg3 = "rgba(20,49,237,0.3)";
    }
    else {
      this.bg3 = this.bg_c_3;
    }

    this.gradient_b = this.context.createLinearGradient(0, this.nbh*0.5, this.nbw, this.nbh*0.5);
    this.gradient_b.addColorStop(0.0 , this.bg3);
    this.gradient_b.addColorStop(1.0 , this.bg2);
    this.context.fillStyle = this.gradient_b;
    this.context.fillRect(0,0,this.nbw,this.nbh);  
    
    //数字ボタンを作成
    this.font_size = this.num_height*this.font_ratio; //フォントサイズ
    this.font = `${this.font_size}px ${this.font_name}`; //フォントサイズと書体    
    let num_color; //数字ボタンの色
    this.gradient = this.context.createLinearGradient(this.nbw*0.5,this.num_top_margin,this.nbw*0.5,this.num_top_margin+this.num_height);
    this.gradient.addColorStop(0.0 , 'rgba(0,0,0,0.35)');
    this.gradient.addColorStop(0.8 , 'rgba(0,0,0,0.05)');
    num_color = this.gradient;
    this.draw_3_btn(num_color);
    let num_down = false;
    let touch = false;   


    //タッチされたとき（スマホ）
    canvas.addEventListener('touchstart', () => { 
        let gradient2 = this.context.createLinearGradient(this.nbw*0.5,this.num_top_margin,this.nbw*0.5,this.num_top_margin+this.num_height);
        gradient2.addColorStop(0.0 , 'rgba(0,0,0,0.5)');
        gradient2.addColorStop(0.8 , 'rgba(0,0,0,0.3)');
        num_color = gradient2;
        this.draw_3_btn(num_color);
        num_down = true;
        touch = true;
    },　{
      passive: true
    });

    //タッチが離れたとき（スマホ）
    canvas.ontouchend = (e) => {
        num_color = this.gradient;
        this.draw_3_btn(num_color);  
        //数字ボタンが押されて且つ数字ボタン上で離されたとき        
        if (num_down == true) {
        this.$emit("click3");
        num_down = false;
        touch = true;
        }
    }

    //クリックが押されたとき
    canvas.onmousedown = (e) => {
      if (touch == false) {
        let gradient2 = this.context.createLinearGradient(this.nbw*0.5,this.num_top_margin,this.nbw*0.5,this.num_top_margin+this.num_height);
        gradient2.addColorStop(0.0 , 'rgba(0,0,0,0.5)');
        gradient2.addColorStop(0.8 , 'rgba(0,0,0,0.3)');
        num_color = gradient2;
        this.draw_3_btn(num_color);
        num_down = true;
      }
    }

    //クリックが離されたとき
    canvas.onmouseup = (e) => {
      if (touch == false) {
        num_color = this.gradient;
        this.draw_3_btn(num_color); 
        //数字ボタンが押されて且つ数字ボタン上で離されたとき        
        if (num_down == true) {
          this.$emit("click3");
          num_down = false;
        }
      }
    } 

    //マウスがキャンバス外に出た時
    canvas.onmouseout = (e) => {
      if (touch == false) {
        num_color = this.gradient;
        this.draw_3_btn(num_color);
        num_down = false;
      }
    }             
  },
}
</script>