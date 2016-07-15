/**
 * Created by jack on 16/2/17.
 */

var Vue = require("component_modules/vue.js");
var Router = require("component_modules/vue-router.js");
var Service = require("main/service.js");

Vue.component("loading",require("loading/index.js"));

Vue.use(Router);


Store = {
    uid:"",
    //token:"575e45026da1e212e48c8ec3",
    showLoading:true
};

router = new Router();
var App = Vue.extend({
    data: function () {
        return {
            showLoading:false
        }
    },
    ready: function () {
        //this.token = Service.GetQueryString("token");
    }
});

router.redirect({
    "/":"/confirm"
});

router.map({
    "/auth":{
        component:require("page/auth/auth.js") /*调班审核列表*/
    },
    "/confirm":{
        component:require("page/confirm/confirm.js") /*审核页面*/
    },
    //"/login":{
    //    component:require("page/login/login.js") /*调班给我*/
    //},
    "/choose":{
        component:require("page/choose/choose.js") /*小区选择*/
    },
    "success":{
        component:require("page/success/success.js")
    }
});

router.start(App,'#app');
