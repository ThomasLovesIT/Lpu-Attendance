
import jwt  from 'jsonwebtoken'
import User from '../models/User.js';

const RequireAuth = async (req,res, next) => {


        // verify authentication
     const { authorization }  = req.headers;

     if (!authorization){
        return res.status(401).json({ error: 'Authorization token required' });
     }

     const token = authorization.split(' ')[1];

     try{
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id || decoded._id; // Handle both cases to be safe
        const user = await User.findOne({ _id: id}).select('_id');


        if (!user) {
     console.log("Token valid, but User ID not found in DB.");
            return res.status(401).json({ error: 'User does not exist.' });
      }  

        // 3. Only if user exists, attach and proceed
        req.user = user;
        next();
     }catch(error){
        console.log("error", error)
        return res.status(401).json({error: 'request is not authorized'})
     }


}

export default RequireAuth;