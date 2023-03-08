const toc = require('markdown-toc')
exports.getTocArr = (markdownContent)=>{
 
    /**
     * / 解析出来和h1-h6在markdown语法中对应 # AAA\n## BBB\n### CCC\nfoo -> ######
     * [ { content: 'AAA', slug: 'aaa', lvl: 1 },
        { content: 'BBB', slug: 'bbb', lvl: 2 },
        { content: 'CCC', slug: 'ccc', lvl: 3 } ]
     */
    const markArr = toc(markdownContent.markdownContent).json
    let mix = 6;
    for( item of markArr){
        if(item.lvl < mix){
            mix = item.lvl 
        }
    }
    function resItemObj(obj){
    
        return {
            name:obj.content,
            anchor:obj.slug,
            level:item.lvl,
            children:[]
        } 
    }
    function handleItem(obj,stack){
        let top = stack[stack.length - 1];
        if(!top){
            stack.push(obj)
        }else if(top.level < obj.level){
            top.children.push(item)
            stack.push(item)
        }else{
            // 当前传入进来的对象中的等级很高时 取出栈顶的一位 于倒数第二位的数组进行比较 
            stack.pop();
            handleItem(item,stack)
        }
    }
    function resArr(arr){
        let resArr = [];
        let stack = [] ;
        let tocItem ;
        for (const item of arr) {
            tocItem = resItemObj(item)
             if(tocItem.level  ===  mix)  {
                resArr.push(tocItem)
             } 
             handleItem(tocItem,stack)
        }
        return resArr
    }
    markdownContent.toc = JSON.stringify(resArr(markArr))
    delete markdownContent.markdownContent;
    for (const item of markArr) {
        switch (item.lvl) {
            case 1:{
                const newStr  = `<h1 id="${item.slug}">`;
                markdownContent.htmlContent =   markdownContent.htmlContent.replace('<h1>',newStr)
                break;

            }
            case 2:{
                const newStr  = `<h2 id="${item.slug}">`;
                markdownContent.htmlContent = markdownContent.htmlContent.replace('<h2>',newStr)
                break;

            }
            case 3:{
                const newStr  = `<h3 id="${item.slug}">`;
                markdownContent.htmlContent = markdownContent.htmlContent.replace('<h3>',newStr)
                break;

            }
            case 4:{
                const newStr  = `<h4 id="${item.slug}">`;
                markdownContent.htmlContent = markdownContent.htmlContent.replace('<h4>',newStr)
                break;

            }
            case 5:{
                const newStr  = `<h5 id="${item.slug}">`;
                markdownContent.htmlContent =  markdownContent.htmlContent.replace('<h5>',newStr)
                break;

            }
            case 6:{
                const newStr  = `<h6 id="${item.slug}">`;
                markdownContent.htmlContent =   markdownContent.htmlContent.replace('<h6>',newStr)
                break;

            }
            default:
                break;
        }
    }
    return markdownContent
}