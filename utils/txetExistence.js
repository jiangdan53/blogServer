/**
 * 
 * @param {*} origObj 需要比较的文本对象
 * @param {*} obj  传入比较的文本对象
 */
exports.Texistence = ({dataValues},obj)=>{
    const arr = []
    for (const key in dataValues) {
        if(dataValues[key] !== obj[key]){
            arr.push(0)
        }
    }
   
    return arr
}