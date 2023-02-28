import {Pool, PoolConfig} from "pg"
import * as dotenv from 'dotenv'
dotenv.config()

function databaseConfig(node:string) { 

    let config:PoolConfig
    
    if (node == "production") {
        
        config = {

            connectionString: process.env.URL,
            ssl:{
                rejectUnauthorized:false,
                requestCert: true
            }

        }
        
    } else {

        config = {

            host: "localhost",
            user: "postgres",
            database: "bandeira",
            password: "postgres",
            port: 5432

        }

    }

    return config

}

export default new Pool(databaseConfig(process.env.NODE_ENV as string))