import model from '../models';

const { User } = model;

class Users {
    static signUp(req, res) {
       return User
            .create(req.body)
            .then(userData => res.status(201).send({
                success: true,
                message: 'User successfully created',
                userData
            }))
    }
}

export default Users;