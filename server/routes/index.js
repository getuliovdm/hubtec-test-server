import Users from '../controllers/user';
import Task from '../controllers/tasks';

export default (app) => {
    const Router = '/api';
    app.get(`${Router}`, (req, res) => res.status(200).send({
        message: 'Welcome to the TodoList API!',
    }));

    const User = `${Router}/users`;
    app.post(`${User}`, Users.signUp); // API route for user to signup

    const Tasks = `${User}/tasks`;
    app.post(`${Tasks}`, Task.create); // API route for user to create a book
    app.get(`${Tasks}/:userId`, Task.listAll); // API route for user to get all Tasks in the database
    app.put(`${Tasks}/:taskId`, Task.updateTask); // API route for user to edit a book
    app.delete(`${Tasks}/:taskId`, Task.deleteTask);

};