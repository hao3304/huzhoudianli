/**
 * Created by jack on 16/7/1.
 */


var Vue = require("component_modules/vue.js");

module.exports = Vue.extend({
    template:__inline("success.html"),
    methods:{
        onOK: function () {
            window.opener=null;window.open('','_self');window.close();
        }
    }
});