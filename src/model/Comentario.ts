import Security from "../assets/Security"
import db from "../database/connection"

class Comentario {

    id: number = 0
    texto: string = ""
    data_pub: string = ""
    id_user: number = 0

  public static async create(body: any , id:number) {

    const comentario = new Comentario()

    comentario.texto = body.texto
    comentario.data_pub = new Date().toLocaleString()
    comentario.id_user = id

    return comentario

  }

  public static async save(comentario:Comentario) {

    await db.query(`INSERT INTO Comentario(texto, data_pub, id_user) 
                    VALUES ($1, $2, $3)`,
    [ comentario.texto, comentario.data_pub, comentario.id_user ])
    
  }

  public static async listAllCrypto() {

    const comentarios = await db.query(`
    SELECT u.nome, u.imagem,c.id ,c.id_user ,c.texto, c.data_pub
    FROM Usuario u
    INNER JOIN Comentario c ON u.id = c.id_user`)

    let comentarios_crypto:any[] = []

    for (let i = 0; i < comentarios.rows.length; i++) {

      let c = comentarios.rows[i]

      c.id = await Security.criptografar(c.id.toString()) 
      c.id_user = await Security.criptografar(c.id_user.toString()) 

      comentarios_crypto.push(c)
      
    }

    return comentarios_crypto

  }

  public static async deletar(id:number) {

    await db.query(`DELETE FROM Comentario WHERE id = $1`, [id])

  }

}

export default Comentario