# 链表逆置  
 简单算法   
```js 
class Node{ 
    constructor(value){ 
        this.value = value 
        this.next  = null 
    } 
} 
let node1 = new Node(1); 
let node2 = new Node(2); 
let node3 = new Node(3); 
let node4 = new Node(4); 
let node5 = new Node(5); 
node1.next = node2; 
node2.next = node3; 
node3.next = node4; 
node4.next = node5; 
// 执行栈 ①lizhi ②lizhi ③lizhi ④lizhi
// 正在执行的 lizhi-> 向执行栈添加一个并执行lizhi -> 向执行栈添加一个并执行lizhi
// 执行完成的 
// 各个函数执行分析
/**
 * 当函数第一次执行的时候在else中传入的参数时2这个对象 不满足next.next === null 所以继续向执行栈添加一个函数 并且后面的代码继续等待执行 
 * 当 参数为2这个对象传入给函数时 任然不满足 next.next === null 所以这个时候继续向执行栈中添加一个函数参数为3这个对象 并阻断当前函数继续执行 
 * 当 参数为3这个对象传入函数时依旧不满足 next.next === null  所以继续传入4这个对象 并阻断函数的执行 
 * 当 参数为4这个对象传到函数中时 满足next.next === null 此时跳出递归 并将4的next.next 也就是5这个对象的next设置为4这个对象 函数执行完成 从执行栈中消失
 * 当4为参数执行完成后 我们得到了这样的一个链表 4->5 5<-4 然后函数完成 参数为3的函数继续执行剩余代码 也就是将3这个参数的next.next 也就是4这个对象 这个对象的next依旧时5这个对象 所以我们将4的next设置为当前的对象3 然后将当前3的next指向空
 * 并返回3这个函数之行完成后的节点5 3这个函数执行完成 
 * 继续执行2着函数 这个时候4的next指向的是null 而3这个对象指向的是4 所哟剩余的代码就是将2.next.next 也就是3的next指向2 让2的next指向null 函数执行完毕 
 * 因为2的时候函数执行时的结果依旧时当参数为4的时候的结果 所以后面的函数执行的结果依旧时5这个对象不同的是3为参数时 3的next指向空 当2这个函数执行完成后 3就指向2了 那么 当2执行完成后也就指向了null 
 * 当2执行完成后继续执行1这个函数 此时1这个对象的next.next 指向的null 我们将他设置为1 然后将参数1这个自身的next指向空 这个时候我们就完成了 链表的逆置 
 * 从 1 > 2 > 3 > 4 > 5 > null 
 * 到 5 > 4 > 3 > 2 > 1 > null
 */
function lizhi(node){
    // console.log(node.value,'start')
    if(node.next.next === null){
        // console.log(node.next,'stadown')
        node.next.next = node
        return node.next
    }else{
        // console.log(node.value,'eles')
      const resul =  lizhi(node.next) 
        node.next.next = node
        // console.log('向',node.next.next.value);
        node.next = null
        return resul
    }
}
lizhi(node1);
function xunhaun(node){
    if(node === null){ 
        return  
    }
    console.log(node.value) 
    xunhaun(node.next) 
} 
xunhaun(node5) 
```

