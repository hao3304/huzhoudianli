/**
 * Created by jack on 16/7/1.
 */


var Vue = require("component_modules/vue.js");
var Service = require("main/service");

module.exports = Vue.extend({
    template:__inline("choose.html"),
    data: function () {
      return {
          list:[],
          loading:true
      }
    },
    methods:{
        render: function () {
            this.loading = true;
            var self = this;
            Service.community(JSON.stringify({}), function (rep) {
                self.loading = false;
                self.list = rep;
            })
        }
    },
    ready: function () {
        this.render();
    }
});