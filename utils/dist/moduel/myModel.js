Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = exports.name = void 0;
var Gender;
(function (Gender) {
    Gender["male"] = "\u5E05\u54E5";
    Gender["female"] = "\u7F8E\u5973";
    Gender["nomale"] = "\u5916\u661F\u6765\u7684";
})(Gender || (Gender = {}));
exports.name = Gender.male;
const sum = (a, b) => {
    return a * b;
};
exports.sum = sum;
