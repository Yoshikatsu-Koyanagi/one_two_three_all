// コンポーネントのインポート
import component_btn1 from './components/App1.vue'; //(1)Vueのファイル名に変更
import component_btn2 from './components/App2.vue';
import component_btn3 from './components/App3.vue';
import component_btnAll from './components/AppAll.vue';


// Vue.use() によって実行される install 関数を定義
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
}

// Vue.use() のためのモジュール定義を作成
// Create module definition for Vue.use()
const plugin = {
    install,
};

// vue が見つかった場合に自動インストールする (ブラウザで <script> タグを用いた場合等)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// (npm/webpack 等で) モジュールとして利用させるためコンポーネントを export する
export {component_btn1, component_btn2, component_btn3, component_btnAll};