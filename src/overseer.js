/*
 * overseer.js by regou
 * https://github.com/regou/overseer
 * @license MIT License
 *
 * A light weight, simple Object.observe shim
 *
 */

(function(global) {
    'use strict';
    var prefix="oseer_";
    var error_keytype="2nd parameter must be a array of keys! eg. ['name','age','gender']";
    var calmdown = function(func, wait, immediate) {
        var holder=false,timer=null,timer2=null;;
        return function() {
            var context = this, args = arguments;
            var needRun = !holder;
            if (needRun) {
                func.apply(context, args);
                clearTimeout(timer);
                holder=true;
                timer=setTimeout(function(){holder=false},wait);
            }else{
                clearTimeout(timer2);holder=true;
                timer2=setTimeout(function(){
                    func.apply(context, args);
                    holder=false;
                },wait);
            }
        };
    };

    var clone=function(obj) {
        if (null == obj || "object" != typeof obj){return obj;}
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {copy[i] = clone(obj[i]);}
            return copy;
        }
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to handle this obj! Its type isn't supported.");
    }

    var Overseer={
        support:(function(){
            return ("keys" in Object && !!Object.defineProperty && !!Array.isArray);
        }()),
        watch:function(Obj,keys,call,conf){
            var self=Overseer;
            var conf=conf || {};
            if(typeof(call) !== "function"){
                throw new Error("Callback function (3rd parameter) not specified or type Error!");
            }

            var makeCallback=calmdown(call.bind(makeCallback),conf.highPerformance || 100,true);
            var binding=function(Obj,key){
                if(key in Obj){
                    var oseerStr=prefix+key;
                    Obj[oseerStr]=clone(Obj[key]);
                    Object.defineProperty(Obj,oseerStr,{enumerable:false});
                    Object.defineProperty(Obj,key,{
                        get:function(){return this[oseerStr];},
                        set:function(newval){
                            var oldval=this[oseerStr];
                            if(newval===oldval){return;}
                            this[oseerStr]=newval;
                            var change={
                                'key':key,'obj':Obj,
                                'newValue':newval,
                                'oldValue':oldval
                            };
                            if(conf.highPerformance){
                                makeCallback(change);
                            }else{
                                call(change);
                            }
                        }
                    });
                }
            };
            if(Array.isArray(keys)){
                keys.forEach(function(key){
                    binding(Obj,key);
                });
            }else{
                throw new Error(error_keytype);
            }

        },
        watchAll:function(Obj,call,conf){
            Overseer.watch(Obj,Object.keys(Obj),call,conf);
        }
    };

    Overseer.unwatch=function(Obj,keys){
        var unbind=function(Obj,key){
            var des=Object.getOwnPropertyDescriptor(Obj, key);
            if("get" in des && typeof des.get ==="function"){
                delete Obj[key];
                Obj[key]=clone(Obj[prefix+key]);
                delete Obj[prefix+key];
            }
        };

        if(Array.isArray(keys)){
            keys.forEach(function(key){
                unbind(Obj,key);
            });
        }else{
            throw new Error(error_keytype);
        }

    };

    Overseer.unwatchAll=function(Obj){
        Overseer.unwatch(Obj,Object.keys(Obj));
    };

    global.Overseer=Overseer;

})(typeof(exports) === "undefined" ? window : exports);