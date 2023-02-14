import {Pool, PoolConfig} from "pg"

function databaseConfig(node:string) { 

    let config:PoolConfig

    if (node == "production") {
        
        config = {

            connectionString: process.env.URL,
            ssl: false

        }

    } else {

        config = {

            host: "localhost",
            user: "postgres",
            database: "bandeiras",
            password: "postgres",
            port: 5432

        }

    }

    return config

}

export default new Pool(databaseConfig(process.env.NODE_ENV as string))