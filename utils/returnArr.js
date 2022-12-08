exports.arrayAssemble = function(array,...age){
    // const ags = [...age] 
    // let obj = {} 
    // let arr = [] 
    //     for (let it = 0 ; it < array.length; it ++) { 
    //         for (const item in ags) { 
    //             if(obj.hasOwnProperty(ags[item])){ 
    //             obj = {} 
    //             obj[ags[item]] = array[it][ags[item]] 
    //             }else{  
    //             obj[ags[item]] = array[it][ags[item]]
    //             } 
    //         } 
    //     arr.push(obj)
    //     } 
      return Array.from(array).map(it=>{ //map可以印射数组 返回值即使数组的当前项 
        // Object.fromEntries() 这个方法可以将一个键值对形式的数组转化为一个对象 [['foo', 'bar'],['foo1', 'bar1']] => {foo:'bar',foo1:'bar1'}
        // Object.entries() 可以将一个对象转化为键值对形势的数组 {foo:'bar',foo1:'bar1'} => [['foo', 'bar'],['foo1', 'bar1']]
        // Array.filter() 每一项为['foo', 'bar'] 可以结构为[key,value]  
        // 在利用数组的includes方法过滤数组  includes方法返回的是boolean值 当过滤器中返回值为true时就能保留当前项 为fales则过滤掉
        return  exports.OpObj(it,age) // 当key值在数组中存在时及返回true
    })
   
}
exports.OpObj = (obj,ags)=>{
 return  Object.fromEntries(Object.entries(obj).filter(([key])=>ags.includes(key)))
}