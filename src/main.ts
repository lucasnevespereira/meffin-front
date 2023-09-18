import App from "./App.vue";
import './index.css';
import {createApp} from "vue";
import {createRouter} from "./router";
import {createAuth0} from "@auth0/auth0-vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faLink, faUser, faPowerOff, faWallet, faBars, faEuroSign} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import authConfig from "../auth_config.json";
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";
import {createPinia} from 'pinia'
import * as process from "process";

const pinia = createPinia()

hljs.registerLanguage('json', json);

const app = createApp(App);

library.add(faLink, faUser, faPowerOff, faWallet, faBars, faEuroSign);

app
    .use(hljsVuePlugin)
    .use(pinia)
    .use(createRouter(app))
    .use(
        createAuth0({
            domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
            clientId: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
            authorizationParams: {
                redirect_uri: window.location.origin,
            },
            cacheLocation: 'localstorage',
        })
    )
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
