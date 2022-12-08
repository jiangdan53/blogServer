# typescript 基本概念 
 - typescript 是一个超类 他是包含我们的js/es的一个类型校验语言 他不能代替js/es来单独运行 他需要通过编译来转化为我们需要运行的代码 
 - typescript 具有类型推导功能 他能更具我们函数传入的参数推到出我们所传入的参数的类型 来让我们使用参数时可以得到该类型下的所有js/es方法 当然返回值ts也可以推到出来 
 - typescript 具有类型校验功能 它可以定义我们的参数 常量因该是什么类型的 也可以约定我们的参数是什么类型 
 ```ts
 let a:string = 'ssss' //约定我们a这个变量是一个string类型 
 function tset(a:string,b:number):boolean{ //这里约束我们使用该函数时我们需要传入的参数a为一个字符串 参数b为一个数组类型的 约定我们的返回值时一个布尔类型的返回值 
  ...
 }
 ```
 - typescript 还可以校验我们的参数或者变量名是否书写正确 
 - **ts是一个可选的静态类型系统**
# 安装typescript 
 - 使用全局安装  npm i -g typescript 
 - 编译文件 tsc ./文件地址(为本地地址)
   **因为我们的ts代码需要编译后才能使用 而我们全局安装后会使用到tsc 命令行代码来编译我们的ts代码 转化为我们的js代码**
# typescript 配置 
 - 使用 命令行工具 tes --init 来生成一个tsconfig.json文件来配置我们的ts编译后的js版本 
 - 当我们使用了 配置文件的形式来编译我们的代码时 我们就不需要 tsc 后面带文件地址了如果带上了 文件名 则会忽略我们的配置文件 那么就会按照ts的原始配置来编译文件了 编译后的文件时按照es3的标准来编译文件了 
 - 当我们需要使用其他第三方库时 没有办法直接使用的 我们需要通过 @types/第三方库的名称 来使用ts给我们转化好的具有类型检查的第三方库代码 
 >npm i -D @types/node 
 - 这样就安装了一个node环境下的第三方库了 由于我们的代码全局环境没有办法设置为node环境所有我们需要使用@types这个官方提供的库来导入我们的node环境 
 - 当我们将ts代码中编写完成了 每次都需要自己手动tsc 命令来编译代码 这样一来我们编写就会很麻烦所以我们可以使用第三方库来完成
 - ts-node
 # 第三方库 ts-node 
 >npm i -g ts-node 
  - -g 代表全局安装 
  - 使用方法 
   - ts-node 加上文件名 
     - 但是依然没法监控我们文件的变化 还是需要我们每次都去输入我们的命令行来得到运行结果 所以我们可以使用下面这个插件 
>npm i -g nodemon 
  - 使用 nodemon 
   - nodemon 这个插件是用于监控我们文件的变化的 当文件变化后 就会之自动执行我们的代码 
   - 我们可以再配置文件中(package.json) 配置我们的启动命令 
   >npm run tset 或  
   >yarn tset
   ```json
     "tset":"nodemon  --exec ts-node utils/index.ts"
   ```
   - 当我们改变其他文件时或者其他文件夹下的ts文件发生变化了也会导致重新运行我们的代码所以我们可以配置启动命令 
    **-t ts** 表示只监控我们的ts 变化 
    **--watch utlis** 表示只监控我们utils文件夹下的ts文件变化时执行我们的热更新 
   ```json
     "tset":"nodemon --watch utils -e ts --exec ts-node utils/index.ts"
   ```
   - 当我们开发完成后可以使用我们的tsc 来进行打包
  > tsc 
  - 基本类型 
   - number 
   - string
   - boolean  
   - string[] //表示约束为我们字符串类型的数组 需要什么类型就再前面写什么类型
   - object //约束力不强 通常不适用 使用枚举 当我们一个函数接收的参数不知到该对象内具有什么类型的值时我们可以使用object
   - undefind / unll 空类型 
   **使用更加严格的空类型检查**
   ``` "strictNullChecks":true```
# 其他常用类型
 - 这是ts给我们的其他数据类型 
  - 联合类型 
    - 我们可以将一个变量或者 参数 设定为两个类型 再两个类型中只取其中一个 
    ```ts
    let str:string | nudefind = 'ssss';
    //当我们再使用str时不能直接使用 我们需要经过类型判断才能拿到我们的类型下对应的方法 
    // 因为这里我们会有类型保护 可以使用typeof来触发 单只能是基础类型 
    // 类型保护可以使我们的参数或变量在使用时明确知道我们的参数或者 变量的类型 
    if(type str === 'string'){
      //这里就可以使用我们的字符串的方法
    }else{
      //这里则为其他 
    }
    ```
  - void 
    - 表示函数不反回任何返回值 就可以标记为void 
  - never
    - 通常用来约束函数的返回值 
      - 表示该函数永远不会结束
  - 字面量类型 
    - 使用一个值来约束类型
    ```ts
    let str:"A" | "B";
    str = "A" 
    //我们再给他赋值的时候只能是其中的任意一个 不能为其他的值
    //这个可以约束对象和数组 
    let arr:[string,number,boolean]; //这样就表示该变量为一个数组 且长度为3每一项的类型必须对应 
    arr = ['ss',1,true] //这样都不行 因为会将其约束为一个空的数组 并且不带任何值 
    //为对象时 
    let obj :{ //表示该对象有三个属性 并且我们在给他赋值时没一个属性的值必须是对应的数据类型 
    name:string,
    age:number,
    sex:"男" | "女"
  }
  obj = {
    name:'dandan',
    age:18,
    sex:'男'
  }
    ```
  - 元祖类型 
    - 一个固定长度的数组 其中每一项的类型是确定的 
    ```ts
      let arr:[string,number,boolean]; //这样就表示该变量为一个数组 且长度为3每一项的类型必须对应 
      arr = ['ss',1,true] //这样都不行 因为会将其约束为一个空的数组 并且不带任何值 
    ```
  - any类型 
    - any类型可以绕过类型检查 可以将any类型的数据赋值给任何类型 
# 类型别名 
  - 将我们以知的类型做一个定义 
    - 作用 对已知的类型定义一个别名 
      - 使用type关键字即可创建一个类型别名 这里没有作用域关系 可以在使用之前定义也可以在使用之定义 但为了方便阅读我们需在使用前定义 
  ```ts
    type Gender = "男" | "女" | "其他"
  type user = {
     name:string,
    age:number,
    sex:Gender
  }
  // type Gender = "男" | "女" | "其他"
  ```
# 函数的类型约束 
  - 函数重载 
   - 定义 对函数调用时的多总情况进行声明 
   - 使用方法 在我们函数定义之前 创建一个或多个与函数同名的一个重载名称 并且确定每一个参数的类型 和返回值的类型 
   ```ts
   function tset(a:string,b:string):string;
  function tset(a:number,b:number):number
  function tset (a:string | number,b:number| string):string | number {
    if(typeof a === 'string' && typeof b === 'string'){
        console.log(a.substring(Math.ceil(Math.random()* a.length - 1),a.length-1));
      return   a + b
    }else if( typeof a === 'number' && typeof b === 'number' ){
      return a * b
    } 
    throw new TypeError('a和b必须为相同类型的参数 ')
   
  }
   ```
 - 可选参数和参数默认值 
   - 定义 当我们传递参数时我们有的参数可以不用传递 并且还具有默认值时可以使用这个
  ```ts
  function tset (a:string | number,b:number| string,c?:number|string):string | number{ //当参数为可选参数时我们必须将其反到最后一个参数 因为我们使用函数时我们的传递的第一个参数是必传的不能忽略的 如果放到第一位那么后面的必填参数则没有值 则会报错 当我们参数有默认值是和js书写方法一致 c:number = 10 
    if(c){
        if(typeof a === 'string' && typeof b === 'string' && typeof c === 'string'){ 
            console.log(a.substring(Math.ceil(Math.random()* a.length - 1),a.length-1));
          return   a + b + c
        }else if( typeof a === 'number' && typeof b === 'number'&& typeof c === 'number' ){
          return a * b + c
        } 
    }else{
        if(typeof a === 'string' && typeof b === 'string'){
            console.log(a.substring(Math.ceil(Math.random()* a.length - 1),a.length-1));
          return   a + b 
        }else if( typeof a === 'number' && typeof b === 'number' ){
          return a * b
        } 
    }
    
    throw new TypeError('a和b必须为相同类型的参数 ')
   
  }
  ```
# ts 类型之枚举 
 **使用枚举的意义** 枚举可以让我们在开发中能够很好的去改动我们项目中的值 能够将数据的逻辑含义所待变的值改变称为任一的真实值 而不需要去改动每一出数据 这样看起来枚举就很想我们对象 而且我们在使用时也和对象相识 我们使用的就是每个枚举对象的引用值 当我们的真实值发生了变化那么我们只需要取改变我们原来对象的值就好了 后面使用的人都是拿到的我的引用值 
 - 枚举出来的含义是什么 
   - 当我们使用 字面量类型时会发生一但我们的字面量类型的值需要修改那么我没在程序中使用的值就会需要依此修改 当项目过大且使用较多该字面量类型时 我们会很难维护 我们是不是可以使用 类型别名来代替呢 
   - 能用类型别面来代替吗 
        - 答案是不能的 因为我们的类型别名也就是向我们的程序中注入了一些字面量类型当我们需要更改时会发现该类型别名只能代表一些真实的值 当真实的值一旦修改则会造成大量的代码改动  不能转化位逻辑值 而且类型别名是不参与编译的当我们的ts代码编译过后则会丢失该类型别名  所以我们则需要使用枚举
  - 什么是枚举 
   - 定义 枚举是我们自定义的一个逻辑思路的类型别名 
     - 使用 我们可以使用enum 枚举名 {}这样的方式来创建一个枚举
    ```ts
    enum Gender {
      male = "男"，
      female = "女"
    }
    let sex:Gender = Gender.male //"男"
    // 编译后枚举在代码中得表现 
    var Gender;
    (function (Gender) {
    Gender["male"] = "\u7537";
    Gender["female"] = "\u5973";
    })(Gender || (Gender = {}));
    ```
   - 枚举创建出来的类型会出现在我们的编译结果当中 以一个对象的形式被创建出来 
    - 当我们的枚举值为数字时 我们在创建字段时可以给第一个字段定义一个初始值 后面的字段的值会更具当前第一项的值自增 是按照每一项自增不是根据我们得字段信息自增 
    ```ts
    enum laove {
    loave1 = 1,
    loave2,
    loave4  
    }
    let l:laove = laove.loave4 //这里并不是4 而是3 可以理解为我们给第一个字段赋值 那么我们后面字段的值就代表了我们枚举所有字段的索引 如果第一个字段不传值 那么就是从0开始的 这样一看是不是有点 类数组的意思了 
    ```
    - 当我们在使用值为数字的时候可以直接使用数字来代替字段名 这样时不推荐的 枚举出来的意义就是为了避免逻辑意思和真实意思的混淆 如果我们使用真实的数字来代替时 是可以的但不推荐 因为这样失去了枚举的意义 
    - 当我们使用数字为枚举值得时候可以不给值 那么他们对应得值就是从0开始得自增 
# 枚举的最佳实践 
 - 尽量不要在一个枚举中即出现字符串又出现数字
 - 使用枚举是 尽量使用枚举字段名称 而不是使用真实的值  
# 拓展 位枚举(枚举的位运算)
   - 实践 权限的增删改
```ts
  enum Permission {
    Read = 1 , // 0001
    Write = 2 , // 0010
    Create = 4 , // 0100
    Delete = 8  // 1000
}
// | 或运算 这个运算是将两个值转化位二进制码 然后进行或运算 
/**
 * 运算过程 
 * 0001
 *  |
 * 0010  
 * 他们会将每一位进行比较相同唯0不同为1 
 * 那么我们就能得到结果 0011 
 */
let p:Permission = Permission.Read | Permission.Create | Permission.Write | Permission.Delete
 function ckePer(p:Permission,per:Permission):boolean {
    /**
     * & 符为且运算符 且运算是将相同为1 不同为0 
     * 我们传入的p参数为0111 权限判断的参数为 1000 
     * 运算过程 
     * 0111
     * &
     * 1000
     * 结果就是 0000 那么就代表此用户没有该项操作权限 
     * 
     */
    return (p & per) === per
 }
 console.log(ckePer(p,Permission.Delete))
 //删除权限 
  /**
   * 使用 ^ 异或运算 异或运算 是将相同取0 不同取1
   *
   */
  p = p ^ Permission.Create
  /**
   * 执行过程 
   * 1111 
   * ^ 
   * 0100
   * 结果 
   * 1011
   */
  console.log(ckePer(p,Permission.Create))
```
# 如何在ts中使用 模块化 
  * 在ts中我们统一使用 es6的模块化标准 不管环境是什么 因为他最后都会编译 
 - 如何导入模块以及如何导出模块 
   - 上面我们说到了 我们ts中模块化都推荐使用es6的模块化导出标准 那么我们可以使用 export 来导出我们的模块 且这样写可以代开一些便利 我们在使用导出的模块时我们可以得到一个智能提示 可以自动导入 相应的模块 
     *并不是说不能是用export default而是这样写我们可以给我们的模块添加别名 但就不能得到自动导入的便利了*
# 编译结果中是什么模块化 
  * 我们可以在配置文件中配置我们的module配置中配置成我们需要的模块化标准(只是在编译结果中)
  - 如果我们的编译的结果标准时es6标准的化 那么我们的编译结果和我们的ts代码没有区别 
  - 如果我们的编译结果标准时commonjs那么我们使用的导出方式会变成 exports.xxx 我们的默认导出则会变成exports.default.xxx
    *因为我们默认导出的东西都会视作为一个对象 那么在我们的编译结果中就会使用default作为我们的对象名称*
# 导入模块报错时 
 - 当我们在使用es6模块化标准来导入node环境下的模块时 会发现导入不了 因为我们nodejs中的模块都是不是通过ts编译的 可能时使用的其他方式导出的 而且他们导出的模块都是一个对象 那么我们在编译时会发现 default对象下没有相应的函数或者方法 是找不到的
  - 解决办法一 
    - 我们可以使用结构的方式来导入我们需要用到的方法名 
  - 解决办法二 
   - 我们可以使用对象别名的方式来导入我们的模块 就是要通过*全部导入 然后定义别名
  - 解决办法三 
   - 我们在配置中添加一项配置```json "esModuleInterop": true```
  ```ts
  //方法一 
   import {access} from 'fs'
  //方法二
  import * as fsz from 'fs'
  //方法三
  import fs from 'fs' 
  ```
# 如何在ts使用commonjs模快 以及如何导入导出 
 - 导出 我们如果直接使用commonjs的方式来导出我们的模块 导入的时候也使用commonjs方式导入那么我们将得不到类型推导(必须配置了才不会报错)
  - 怎样得导出得到类型推导 
  ```ts
  // 使用这种方式导出的模块则具有类型推导 
  export = {}
  ```
 - 导入如何获得类型推导 
  ```ts
  // 我们只需要将我们的const 变成import
  import fs = require('fs')
  ```
# 模块解析 
  模块解析：因该从什么位置找到模块 
   - classic : 经典的解析策略
   - node : node解析策略 
     - 相对路径的解析策略 ```require('./xxx')``` 这样的话代表我们需要从当前文件夹下取找相应的模块 如果我们在package.json中配置了main 那么他会在根目录下取找寻我们的相关文件进行模块的入口解析 
     - 非相对路径```require('fs')``` 他会在node_modules文件夹下去寻找 
# ts类型之接口 
  * ts中的接口都是约束类,对象或着函数的锲约(标准)
  - 如何理解接口 
    - 我们ts中的接口也就是我们对于一个函数或者对象 我们需要的参数以及我们对象的值得类型是什么 就必须是这样的类型 属于强标准
     **和类型别名一样不会出现在编译结果中**
  - 接口如何约束对象 
   - 使用方法和类型别名一样 当时关键字不同 接口得关键字是 interface xxx {} 但是接口可以约束类 但类型别名不行 
   *** 代码来解释
  ```ts
  //约束对象
   interface User {
    name:string,
    age:number,
    sex:Gender
   }   
   //约束函数 当然函数也可以是对象得某个属性值 
   interface func {
    funscname:string,
    sayhaool:(a:string)=>void
   }  
  //当我们定义接口得时候我们只定义这个函数那么我们得接口中可以没有字段名 直接定义(只存在一个的情况) 
   interface func {(a:number):boolean}
   let obj:User = {
    name:"dandan",
    age:18,
    sex:Gender.male
   }
   let obj1 = {
    funscname:'function',
    sayhaool:(a)=>{
    }
   }
   function t(a:number[],cak:func){
      let num = 0 ;
      a.froEacth(n=>{
        if(cak(n)){
          num += n
        }
      })
   }
   t([1,3,5,7,8,9,10],n=> n % 2 === 0)
  ```
 **接口是可以继承的**
  - 接口的继承 
    - 当我们的接口继承了其他的接口时 我们的接口中就会具备其他接口的想过属性 并且当我们接口中的属性名以及属性对应的类型不同时会发生错误 
  - 类型别名也可以继承但不能称之为继承 我们称之为交叉类型 但接口的继承和我们的类型别名的继承会又差异 
    - 差异一 当我们的类型别名在交叉时 如果发现又同名的属性 则也会将其属性对应的类型进行交叉 那么我们的这个属性就不易赋值 并且会发生使用时能使用两个类型的所有方法 但编译结果运行时会报错 **而我们的接口在继承时则不允许出现两个相同的属性名**
 **readonly修饰符**
  - 这是一个ts中的修饰符 表示当前这个接口或类型别名 中的某些属性 只能被赋值一次 其他赋值会报错 这样保证了我们的一些数据只能设置为一个固定值而不能被后续操作修改 
  可以固定数组 固定之后这个数组的新增或者删除的方法都不能用了 ```let a:readonly number[] = [1,2,3,4,5] //2 let a:ReadonlyArray<number>``` 
# 类型兼容 
  * 当我们的类型里面有很多目标类型中没有的 但符合其中的某些特征 那么们就需要兼容的创建一些接口或者类型别名 
  - 鸭子辨型法(子结构辩型法)
    - 也就是说某个东西具有鸭子的特征那么他就属于鸭子这一类 也就是说我们可以创建一个类 例如水果这个类 苹果是水果 香蕉也是水果 我们分辨其是不是水果 是根据他的甜度或者其他特征来进行归类的 那么我们ts中的类型兼容也因该这样处理 满足特征即可
    - 也就是说我们定义的接口或者类型别名其中的属性作为特征 只要包含这些属性则可以使用这个接口或者类型别名 也就是属性可以多但不能少(但这样的赋值 只能是在得到或者已经定义好了的对象而不能是直接使用字面量的方式赋值因为这样会具有更加严格的类型判断)
  - 类型断言 通过 as string 
  ```ts
   enum Gender {
    male="帅哥",
    female = "美女", 
    nomale = "外星来的"
        }
   interface User {
    name:string,
    age:number,
   readonly sex:Gender
   }  
   let obj:User = {
        name:'dandan',
        age:18,
        sex:"男" as Gender.female         
    }
    console.log(obj.sex) //这里的值就不是美女 而是男
  ```
  - 对于函数来说我们参数我们可以只接收一个 但在传入参数时必须传入对应的参数 在返回结果这一块函数需要返回结果那么我们就必须给他返回结果 对于返回结果时比较严格的 
# ts中的类 
 - 类的书写以及类型
  - 我们在使用类时 我们其实时得到了一个对象 而在ts中我们的对象在初始化的时候就应该确定我们的属性 所以在类中我们需要在constrcrutor函数前将我们的属性的类型声明出来 相当于我们先确定好我们类的属性有那些 函数也可以先声明 
   - 属性如果是可选的 就不需要在constrcrutor中声明了 
   ```ts
   class User{
    readonly id:numbber
    name:string
    age:number
    constructor(name:string,age:number){
        this.id = Math.rendom()
        this.name = name
        this.age = age
    }
  }
   ```
   - 如果我们类中的某些属性不希望被外部访问那么我们可以给他添加一个访问修饰符 
     - public 默认的访问修饰符 指公开的所有代码均可访问 如果属性没有定义访问修饰符 那么 默认就是public
     - private 私有的 只能在类中被访问 
   - 在我们上面的那种属性 需要在使用前定义 我们用起来就很麻烦所以ts给我们提供了一个语法糖 那就是在constrcrutor函数的参数前面加上public 这个修饰符 代表他是一个属性且不需要经过其他操作在赋值 前提是他既要不是只读的也不要是不可访问的 那么都可以使用改语法糖
 **严格检查我们的类中的属性是否被赋值 或者constrcrutor中是否定义了该属性我们可以开启更加严格的判定在配置对象中配置strictPropertyInialization:true**
 # 类中的访问器  
   - 当我们在类中希望给某些私有属性赋值时 我们可以给外面提供一个访问器 也就是我们es6中类的访问器书写方式
   ```ts
      class User{
    readonly id:numbber
    name:string
    age:number
    constructor(name:string,private _age:number){
        this.id = Math.rendom()
        this.name = name
        this.age = age
    }
    set age(val){
      //这里我们可以控制这个值是否需要给我们的属性 
      this._age = val
    }
    get age(){
      return this._age
    }
  }
   ```
# ts中的泛型 
  - 泛型是什么 
   - 泛型指得是附属于函数,类,接口别名之上得类型 也就是说我们一个泛型定义了我们三者之上得另一只类型推断 
   - 泛型相当于时一个类型变量 在定义时并不知道他得具体类型时什么 他是依附于函数,类,接口的一个类型变量 我们再函数调用时或者接口使用时,类的创建时 才能确定泛型具体时什么样的类型 
  - 泛型解决了什么 
   - 当我们在某个函数或者其他接口,类中我们可能不知道他得具体类型是什么得时候 那么我们在定义时只能定义为any类型 然后再我们得到他得时候就会丢失掉一些类型检查 从而使得我们得结果难以预测 给其他函数或者类型推导带来麻烦 导致无法推导出类型 但我们使用泛型后就能得到我们想要的类型 保证不丢失 
  - 泛型在函数中怎么用 
   - 再函数名之后使用```<泛型名称>```
   - 当我们使用泛型时没有传递 泛型的类型但是我们的泛型再参数中使用了 那么我们最后函数推导出来的结果就是我们传入的参数的类型 如果无法推导出来 则默认为空对象类型
   - 泛型可以定义默认值 ```<泛型名称 = number>``` 
   **
   ```ts
    enum Live {
    B = "篮球",
    S = "排球",
    F = "足球"
  }
   enum Gender {
    male = "帅哥",
    female = "美女"
  }
    interface User {
    name:string,
    live:Live,
    age:number,
    sex:Gender
   }
   // 泛型是可以相互传递的 当我们再使用该名称的泛型时只需要声明一处的泛型类型 后面使用到该泛型名称的地方都自动的具备了该泛型所代表的类型
    function logUser<U>(arr:U[],num:number):U[] {
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
   ```
- 再类中使用我们的泛型 上面代码中说到我们的泛型可以相互传递那么当我们再使用类的时候就可以定义类型 和 当我们参数传递时通过类型推导也能完成我们的泛型赋值 在我们的接口 类型别名中也可以同理使用
 **泛型约束**用于约束泛型的取值 当我们传入的参数使用的是泛型时且为一个对象 所以当我们想要对某个对象进行操作时得不到该属性 那么这个时候就出现了 泛型的不确定 因为我们的泛型是在调用函数时传入的 而我们的代码需要在调用之前就完成相应的功能那么这个时候就不太方便我们操作 所以我们可以将函数后面或者接口 类后面使用泛型的继承 继承之后我们的泛型就有了基本的模型那么我们就能拿到我们想要操作的对象的属性的类型(虽然记忆好 但都是用了 ts为什么还要记呢 咱们不就是图个方便吗)```<泛型名 extends 接口 或 类型别名>```