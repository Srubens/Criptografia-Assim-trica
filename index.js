const { readFile, writeFile } = require('./fs-promise')
const NodeRSA = require('node-rsa');
const CryptoJS = require("crypto-js");

// criar um novo par de chaves RSA com tamanho de 2048 bits
const key = new NodeRSA({b: 2048});

// obter a chave pública e privada em formato PEM
const publicKey = key.exportKey('pkcs8-public-pem');
const privateKey = key.exportKey('pkcs8-private-pem');

// imprimir as chaves na tela
// console.log('Chave pública:');
// console.log(publicKey);
// console.log('Chave privada:');
// console.log(privateKey);

let texto1 = "O semestre esta acabando!"
let encrypt = CryptoJS.AES.encrypt(texto1,'secret key 123').toString()
//TEXTO ENCRIPTADO
console.log('Texto encriptado: ')
console.log(encrypt)

//TEXTO DESCRIPTADO 
const descript = CryptoJS.AES.decrypt(encrypt, 'secret key 123')
const textDesc = descript.toString(CryptoJS.enc.Utf8)
console.log('Texto descriptado: ')
console.log(textDesc)

const read = async() => {
    try{
        await readFile('./texto1.txt')
            .then((data) =>{
                let encrypt = CryptoJS.AES.encrypt(texto1,publicKey).toString()
                data = writeFile('copy-texto1.txt', encrypt, data)
            })
            .then(() => console.log('Arquivo execultado com sucesso!'))
            .catch((e) => console.log('error: ', e))
        }catch(e){
            console.log(`Error: ${e}`)
        }
}

const read2 = async() => {
    try{
        await readFile('./copy-texto1.txt')
            .then((data) => {
                let texto1 = "Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.Diuretics paradis num copo é motivis de denguis.Suco de cevadiss deixa as pessoas mais interessantis."
                let encrypt = CryptoJS.AES.encrypt(texto1,publicKey).toString()
                console.log('texto dentro do copy-texto-1.txt')
                console.log(data)
                const descript = CryptoJS.AES.decrypt(encrypt, publicKey)
                const textDesc = descript.toString(CryptoJS.enc.Utf8)
                console.log(textDesc)
                let result = writeFile('copy-texto2.txt', textDesc, data)
                return result
            })
            .catch((e) => console.log('error: ', e))
        }catch(e){
            console.log(`Error: ${e}`)
        }
}

//Para testar
/*const copy = async() =>{
    try{
        const data = await readFile('./texto1.txt')
        await writeFile('texto1-copy.txt', data)
        console.log('Feito com sucesso!')
    }catch(e){
        console.log('error: ', e)
    }
}*/

//Para testar
// read().then(() => console.log('feito!'))
read2()