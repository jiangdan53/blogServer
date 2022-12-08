
//   enum Gender {
//     male="帅哥",
//     female = "美女", 
//     nomale = "外星来的"
//         }
//    interface User {
//     name:string,
//     age:number,
//    readonly sex:Gender
//    }   
//    type Arr = readonly string[]

   
   //    const  a:Arr = ['sss','sss']
//    console.log(a)
//    interface func {
//     funscname:string,
//     sayhaool:(a:string)=>void
//    }  
//    interface func {(a:number):boolean}
//    let obj:User = {
//         name:'dandan',
//         age:18,
//         sex:"男" as Gender.female        
//     }
//     console.log(obj.sex)
//    function t(a:number[],callBack:func){
//     let num:number = 0 ;
//     a.forEach(n=>{
//         if(callBack(n)){
//             num += n
//         }
//     })
//     return num
//    }
//    console.log(t([1,3,4,5,6,9,11],n => n % 2 !== 0))
//  import * as fsz from 'fs'
//  import {access} from 'fs'
//  import fs from 'fs'
//  console.log(fs.readFileSync('./'))
// export  const name:Gender = Gender.male
// export const sum = (a:number,b:number):number=>{
//     return a * b
// } 
// 类
// class User{
//     readonly id:string
//     name:string
//     age:number
//     private publicshNumber:number = 3
//     private curNumber:number = 0
//     constructor(name:string,age:number){
//         this.id = Math.random().toString(16).slice(2,8)
//         this.name = name
//         this.age = age
//     }
//     publish(title:string){

//     }
// }
// 泛型 
export enum Live {
    B = "篮球",
    S = "排球",
    F = "足球"
}
export enum Gender {
    male = "帅哥",
    female = "美女"
}
export interface User {
    name:string,
    live:Live,
    age:number,
    sex:Gender
}
export function logUser<U>(arr:U[],num:number):U[] {
    let Arr:U[] = [];
    if(num > arr.length){
        return arr
    }
    arr.forEach((n,i)=>{
        if(i <= num){
            Arr.push(n)
        }
    })
    return Arr
}
