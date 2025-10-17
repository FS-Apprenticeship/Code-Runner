import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
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
