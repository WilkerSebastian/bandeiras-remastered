import { randomBytes } from "crypto";
import aesjs from "aes-js"

export default class Security {

    public static async decriptografar(cifra:string) {

        let key:aesjs.ByteSource
    
        let iv:aesjs.ByteSource

        if (process.env.KEY && process.env.IV) {
            
            key = aesjs.utils.hex.toBytes(process.env.KEY as string)
    
            iv = aesjs.utils.hex.toBytes(process.env.IV as string)

        } else {

            key = aesjs.utils.hex.toBytes(randomBytes(32).toString("hex"))
    
            iv = aesjs.utils.hex.toBytes(randomBytes(16).toString("hex"))

        }
    
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
    
        const cifraBytes = aesjs.utils.hex.toBytes(cifra)

        return aesjs.utils.utf8.fromBytes(aesCtr.decrypt(cifraBytes))

    }
 
    public static async criptografar(conteudo:string) {

        let key:aesjs.ByteSource
    
        let iv:aesjs.ByteSource

        if (process.env.KEY && process.env.IV) {
            
            key = aesjs.utils.hex.toBytes(process.env.KEY as string)
    
            iv = aesjs.utils.hex.toBytes(process.env.IV as string)

        } else {

            key = aesjs.utils.hex.toBytes(randomBytes(32).toString("hex"))
    
            iv = aesjs.utils.hex.toBytes(randomBytes(16).toString("hex"))

        }
    
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
    
        const countBytes = aesjs.utils.utf8.toBytes(conteudo)
    
        return aesjs.utils.hex.fromBytes(aesCtr.encrypt(countBytes))
    
    }

}