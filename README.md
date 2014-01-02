<img src="http://https://raw.github.com/regou/overseer/master/icon.jpg" >
OVERSEER
========

Overseer.js A light weight, simple Object.observe shim


### Why overseer.js?

Observe JavaScript Object  in simple way;

Small : Only 1.54k after minified!

Use it now :

Not like native Object.observe , Overseer support FF2.0+ Chrome IE8+ Opera9.5+ Safari3+


### Basic usage
    Overseer.watch(obj,["age"],function(key,newval,oldval,Obj){
        //Handle Change here:
    });



### Getting Started

Include the `overseer.js` in your project.

    <script src="overseer.js"></script>

nodejs:

	var oseer=require("./overseer.js");


### Example:

Watch obj.name and obj.age

     var obj={name:"wx",age:"24",gen:"male"};
     Overseer.watch(obj,["name","age"],function(key,newval,oldval,Obj){
            //Handle Change here
       console.log("change ",key," from ",oldval," to ",newval);
     });


Try these:

     obj.name="regou";  // output: "change name from wx to regou"
     obj.age="45";  // output: "change age from 24 to 45"
     obj.name;  //output: "regou"
     obj.age;   //output: 45


You can unwatch it if you want:

    Overseer.unwatch(obj,["name"]); //unwatch obj.name
    obj.name="pop"; // no console output,just change the value


### APIs
*****
**Overseer.watch(Obj,keyArray,callback[,highPerformance]);**

Observe one or more properties in this Object(shallow watch).

`Obj` -- The object you want to observe;

`keyArray` - The keynames of the object your want to observe,must be array;

`callback` - Will pass 4 parameters (key,newValue,oldValue,Obj);

`highPerformance` - If you do something crazy and the value changing in very high frequency,you should set it to true(may reduce callback times).Default is false.
*****


**Overseer.watchAll(Obj,callback[,highPerformance]);**

Observe all properties in this Object (shallow watch).
*****

**Overseer.unwatch(Obj,keyArray);**

Unwatch.
*****

**Overseer.unwatchAll(Obj);**

Unwatch All all properties in this Object.

