<img src="https://raw.github.com/regou/overseer/master/icon.jpg" >
OVERSEER
========

Overseer.js A light weight, simple Object.observe shim


### Why overseer.js?

Simple  : Observe JavaScript Object/Array  in simple way;

Small   : Only 1.54k after minified!

Use Now :

Unlike native Object.observe , Overseer support FF2.0+ Chrome1.0+ IE8+ Opera9.5+ Safari3+


### Basic usage
    Overseer.watch(obj,["age"],function(change){
        //Handle Change here
    });



### Getting Started

Include the `overseer.js` in your project.

    <script src="overseer.js"></script>

nodejs:

	var Overseer=require("./overseer.js").Overseer;


### Example:

Watch obj.name and obj.age

     var obj={name:"wx",age:"24",gen:"male"};
     Overseer.watch(obj,["name","age"],function(change){
            //Handle Change here
       console.log("change ",change.key," from ",change.oldValue," to ",change.newValue);
     });


Then try these:

     obj.name="regou";  // output: "change name from wx to regou"
     obj.age="45";  // output: "change age from 24 to 45"
     obj.name;  //output: "regou"
     obj.age;   //output: 45

Watch Array : Watch arr[0]  and  arr[1]

	var arr=["Tom","Jim","Hank"];
	Overseer.watch(arr,[0,1],function(change){
        	//Handle Change here
		 console.log("change ",change.key," from ",change.oldValue," to ",change.newValue);
 	});

You can unwatch them if you want:

    Overseer.unwatch(obj,["name"]); //unwatch obj.name
    obj.name="pop"; // no console output,just change the value


### APIs

*****
**Overseer.support**
Boolean. if Browser support Overseer
*****

*****
**Overseer.watch(Obj,keyArray,callback[,config]);**

Observe one or more properties in this Object(shallow watch).

`Obj` - Object/Array. The Object/Array you want to observe;

`keyArray` - Array. The keynames/Index of the Object/Array your want to observe,must be array;

`callback` - Function. Will pass 1 object with 'key','newValue','oldValue','Obj';

`config` - Object. Do some config in this optional parameter.

`config.highPerformance` - Boolean. If you do something crazy and the value changing in very high frequency,you should set it to true(may reduce callback times).Default is false.
*****


**Overseer.watchAll(Obj,callback[,config]);**

Observe all properties in this Object/Array (shallow watch).
*****

**Overseer.unwatch(Obj,keyArray);**

Unwatch.
*****

**Overseer.unwatchAll(Obj);**

Unwatch All properties(shallow) in this Object/Array.Also this will restore the Obj/Array to original.

