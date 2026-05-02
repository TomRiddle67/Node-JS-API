import jwt from "jsonwebtoken";
import {prisma} from "../config/db.js";

// Read token from the request
// check if token is valid
export const authMiddleware = async (req, res, next) => {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('Auth header:', req.headers.authorization);
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) 
        {
        token = req.headers.authorization.split(" ") [1];
    }   else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401)
        .json({error: "Not authorized"});
    }
    try{
        // verify token and extract the user Id
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
        });

        if(!user) {
            return res.status(401).json({error: "User no longer exists"})
        }
        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({error: "Not authorized, token failed"});
    }
}