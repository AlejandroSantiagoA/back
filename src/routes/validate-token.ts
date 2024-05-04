import { Request, Response, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']
    

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        //tiene token
        try {
            const bearerToken = headerToken.slice(7);
             Jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123')
             next()
        } catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            })
        }



        
    } else{
        res.status(401).json({
            msg: 'Acceso denegeado'
        })
    }
    
}

export default validateToken;