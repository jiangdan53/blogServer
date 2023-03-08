// enum Gender {
//     male = "男",
//     female = "女"
// }
// enum laove {
// loave1 = 1,
// loave2,
// loave4
// }
// type user = { //使用同type 关键字 就可以定义一个类型别名 
//     name:string,
//     age:number,
//     sex:Gender   
// }
// const obj:user ={
//     name:'丹丹',
//     age:18,
//     sex:Gender.female
// } 
// const l:laove = laove.loave4
// console.log(l)
// function tset(a:string,b:string):string;
// function tset(a:number,b:number):number
// function tset (a:string | number,b:number| string,c?:number|string):string | number{
//     if(c){
//         if(typeof a === 'string' && typeof b === 'string' && typeof c === 'string'){
//             console.log(a.substring(Math.ceil(Math.random()* a.length - 1),a.length-1));
//           return   a + b + c
//         }else if( typeof a === 'number' && typeof b === 'number'&& typeof c === 'number' ){
//           return a * b + c
//         } 
//     }else{
//         if(typeof a === 'string' && typeof b === 'string'){
//             console.log(a.substring(Math.ceil(Math.random()* a.length - 1),a.length-1));
//           return   a + b 
//         }else if( typeof a === 'number' && typeof b === 'number' ){
//           return a * b
//         } 
//     }

import { logUser, User, Live, Gender } from "./moduel/myModel";

// import { name, sum } from "./moduel/myModel";

    
//     throw new TypeError('a和b必须为相同类型的参数 ')
   
// }
// // let sex:"男" | "女" 
// let arr:[string,number,boolean]; //这样就表示该变量为一个数组 且长度为3每一项的类型必须对应 
// arr = ['ss',1,true] //这样都不行 因为会将其约束为一个空的数组 并且不带任何值 
// let obj :{
//     name:string,
//     age:number,
//     sex:"男" | "女"
// }
// obj = {
//     name:'dandan',
//     age:18,
//     sex:'男'
// }
// tset('holl ts',['aa','bb','sss']) 
// console.log('ssss') 
// let str = tset(10,20)
// console.log(str)
// enum Permission {
//     Read = 1 , // 0001
//     Write = 2 , // 0010
//     Create = 4 , // 0100
//     Delete = 8  // 1000
// }
// // | 或运算 这个运算是将两个值转化位二进制码 然后进行或运算 
// /**
//  * 运算过程 
//  * 0001
//  *  |
//  * 0010  
//  * 他们会将每一位进行比较相同唯0不同为1 
//  * 那么我们就能得到结果 0011 
//  */
// let p:Permission = Permission.Read | Permission.Create | Permission.Write | Permission.Delete
//  function ckePer(p:Permission,per:Permission):boolean {
//     /**
//      * & 符为且运算符 且运算是将相同为1 不同为0 
//      * 我们传入的p参数为0111 权限判断的参数为 1000 
//      * 运算过程 
//      * 0111
//      * &
//      * 1000
//      * 结果就是 0000 那么就代表此用户没有该项操作权限 
//      * 
//      */
//     return (p & per) === per
//  }
//  console.log(ckePer(p,Permission.Delete))
//  //删除权限 
//   /**
//    * 使用 ^ 异或运算 异或运算 是将相同取0 不同取1
//    *
//    */
//   p = p ^ Permission.Create
//   /**
//    * 执行过程 
//    * 1111 
//    * ^ 
//    * 0100
//    * 结果 
//    * 1011
//    */
//   console.log(ckePer(p,Permission.Create))
// console.log(name)
// console.log(sum(1,1))
console.log(logUser<User>([{name:'dan',live:Live.B,age:18,sex:Gender.male},{name:'dandan',live:Live.F,age:18,sex:Gender.male},{name:'dan',live:Live.S,age:18,sex:Gender.female},{name:'dan',live:Live.S,age:18,sex:Gender.female}],2))
