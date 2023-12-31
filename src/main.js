import { createApp } from 'vue'

import router from './router/index.js';
import store from './store/index.js';
import App from './App.vue';

import BaseCard from './components/base/BaseCard.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseBadge from './components/base/BaseBadge.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';
import BaseDialog from './components/base/BaseDialog.vue';

const app = createApp(App)
    .use(router)
    .use(store);
    
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app')
