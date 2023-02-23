import db from "../database/connection"
import bcrypt from "bcryptjs"

class Usuario {

  id: number = 0
  nome: string = ""
  email: string = ""
  senha: string = ""
  imagem: Buffer = Buffer.from("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", "base64")
  ativo: boolean = false


  public static async create(body: any) {

    const user = new Usuario()

    user.nome = body.nome
    user.email = body.email
    user.senha = body.senha

    return user

  }

  public static async save(user: Usuario): Promise<null | Usuario> {
    try {
      const hash = await bcrypt.hash(user.senha, await bcrypt.genSalt(10));

      const userNew = user
      userNew.senha = hash

      const result = await db.query(
        `INSERT INTO Usuario(nome,email,senha_hash,imagem,ativo) 
            VALUES ($1,$2,$3,$4,$5) RETURNING id;`,
        [userNew.nome, userNew.email, userNew.senha, userNew.imagem, userNew.ativo]
      );
      userNew.id = Number(result.rows[0].id);

      return userNew;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async ativar(nome: string) {

    let erro = false

    await db.query(`UPDATE Usuario 
                  SET ativo = true
                  WHERE nome = $1`, [nome])
      .catch((err) => { 

        erro = true
        console.log(err.toString());

      })

    return erro

  }

  public static async updateImage(id:number, imagem:Buffer) {

    return await db.query(`UPDATE Usuario SET imagem = $1 WHERE id = $2`,[
      imagem,
      id
    ])

  }

  public static async updateNomeAndEmail(id:number , user:Usuario) {

    return await db.query(`UPDATE Usuario SET nome = $1, email = $2 WHERE id = $3`,[
      user.nome,
      user.email,
      id
    ])

  }

  public static async listByID(id:number) {

    return (await db.query(`SELECT nome, encode(imagem, 'base64'), email FROM Usuario WHERE id = $1`, [id])).rows[0]

  }

  public static async delete(id:number) {

    await db.query(`DELETE FROM Usuario WHERE id = $1`, [id])
    .catch((err) => {

      console.log(err.toString());

    })

  }

  public static async listUser() {

    return (await db.query("SELECT id, nome, encode(imagem, 'base64') , ativo , email FROM Usuario")).rows

  }

  public static async countByNome(nome: string): Promise<any[] | null> {

    let result: any[] | null = null

    await db.query(`SELECT COUNT(id) FROM Usuario WHERE nome = $1`, [nome])
      .then((rs) => {

        result = rs.rows

      })
      .catch(err => {

        console.log(err.toString());

        result = null

      })

    return result

  }

  public static async listNameAndImgByID(id: number): Promise<{nome:string,encode:string} | null>{

    let result: any[] | null = null

    await db.query(`SELECT nome, encode(imagem, 'base64') FROM Usuario WHERE id = $1`, [id])
      .then((rs) => {

        result = rs.rows

      })
      .catch(err => {

        console.log(err.toString());

        result = null

      })

    if (result != null) {
      
      return result[0]

    }

    return result

  }

}

export default Usuario