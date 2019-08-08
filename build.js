/**
 * bind函数总结
 * 函数A调用bind方法时 需要传递的参数obj,原本函数的参数x,y,z
 * 返回新的函数的B
 * 函数B在执行的时候其实还是调用的A的方法，只不过this指向了obj
 * 函数B在执行的时候添加的参数会拼接到x,y,z后面，一并在内部传递给A执行
 * new B()的构造函数依然是A 而且obj不会起到作用
 */

Function.prototype.newBind = function(target){
    //target 改变函数执行的this指向
    var self = this
    console.log(this)
    var args = [].slice.call(arguments,1)
    var temp = function(){}
    var f = function(){
        var _arg = [].slice.call(arguments,0)
        return self.apply(this instanceof temp ? this : (target || undefined),args.concat(_arg))
    }
    temp.prototype = self.prototype
    f.prototype = new temp()
    return f
}
function show () {
    console.log(this.x,[...arguments])
}

var tzxObj = {
    x : 20
}
 
var newShow = show.newBind(tzxObj,1,2,3)
newShow(5)
console.log(new newShow().constructor)
console.log(new newShow())