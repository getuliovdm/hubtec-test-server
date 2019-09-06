import model from '../models';
const moment = require('moment');

const { Tasks, User } = model;

class Task {
    static create(req, res) {
        return Tasks
             .create(req.body)
            .then(task => res.status(201).send({
                message: `Your task with the title ${req.body.title} has been created successfully `,
                task
            }))
    }
    static listAll( req, res){
        return Tasks
        .findAll({
            where: {userId : req.params.userId}
        })
        .then(tasks => res.status(201).send(tasks))
    }
    static updateTask(req, res) {
       let finalDate =  moment(req.body.finalDate, 'YYYY-MM-DD');
        return Tasks
            .findOne({
                where: { id: req.params.taskId }
            })
            .then(task => {
                task.update({
                    title: req.body.title || task.title,
                    author: req.body.author || task.author,
                    userId : req.body.userId || task.userId,
                    finalDate : finalDate || task.finalDate,
                    description: req.body.description || task.description,
                }).then( updateTask => {
                    res.status(200).send({
                        message: 'Task updated successfully',
                        data: {
                            title: req.body.title || updateTask.title,
                            author: req.body.author || updateTask.author,
                            userId: req.body.userId || updateTask.userId,
                            finalDate: finalDate || task.finalDate,
                            description: req.body.description || updateTask.description,
                        }
                    })
                }).catch(error => res.status(400).send(error));
            }).catch(error => res.status(400).send(error));
    }
    static deleteTask ( req, res ) {
        return Tasks
            .findOne({
                where: { id: req.params.taskId }
            })
            .then(task => {
                if (!task) {
                    return res.status(400).send({
                        message: 'Task Not Found',
                    });
                }
                return task
                    .destroy()
                    .then(() => res.status(200).send({
                        message: 'Task successfully deleted'
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error))
    }
}

export default Task