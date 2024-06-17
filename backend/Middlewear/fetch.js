const jwt = require ("jsonwebtoken")
const jwtSecret = "123456"

const fetchUser = (req,res,next)=>{
    const token = req.header("auth-token")
    if(!token){
        res.status(401).json({error:"please authenticate a valid value"})
    }
    try {
        const data = jwt.verify(token,jwtSecret)
        req.user = data.user
    next()
    } catch (error) {
        res.status(401).json({error:"please authenticate a valid value"})
    }
    
}

module.exports = fetchUser