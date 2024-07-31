import * as yup from "yup";
import User from "../models/user";

class SessionController {

    async store(request, response) {
        const schema = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
        });

        const isValid = await schema.isValid(request.body);

        if (!isValid) {
            return  response.status(401).json({error: "Certifique que seu email e senha estão corretos"});
         }



        const {email, password} = request.body; 

        const user = await User.findOne({

            where: {
                email,
            },
        });
        
        if (!User) {
            return  response.status(401).json({error: "Certifique que seu email e senha estão corretos"});
        } 
            
      const isSamePassword = await user.checkPassword(password); 

       
        if (!isSamePassword) {
            return  response.status(401).json({error: "Certifique que seu email e senha estão corretos"});
        }

     
       return response.status(201).json({

            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
        }); 

      
       
    }
}

export default new SessionController();

