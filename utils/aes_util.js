const CryptoJS = require('./aes.js'); // 引用AES源码js
const key = CryptoJS.enc.Utf8.parse("Sp5biS+gX+#CqAFF"); // 十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('ud2E8l6wchltwIDA'); // 十六位十六进制数作为秘钥偏移量

// aes解密方法
function AesDecrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
// aes加密方法
function AesEncrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase();
}
 
// base64加密方法
function Base64Encode(val) {
    let str = CryptoJS.enc.Utf8.parse(val);
    let base64 = CryptoJS.enc.Base64.stringify(str);
    return base64;
}
// base64解密方法
function Base64Decode(val) {
    let words = CryptoJS.enc.Base64.parse(val);
    return words.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    AesEncrypt,
    AesDecrypt,
    Base64Encode,
    Base64Decode
}
