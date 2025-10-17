import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

export const pinia = createPinia();

const app = createApp(App)

app.use(pinia)
app.use(router)

// import VueCodemirror from 'vue-codemirror';
// import { basicSetup } from 'codemirror'

// app.use(VueCodemirror, {
//   // optional default global options
//   autofocus: true,
//   disabled: false,
//   indentWithTab: true,
//   tabSize: 2,
//   placeholder: 'Code goes here...',
//   extensions: [basicSetup]
//   // ...
// })

app.mount('#app')
