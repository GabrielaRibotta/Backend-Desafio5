import { Router } from 'express';
import { usersModel } from '../persistence/models/users.model.js'

const usersRouter = Router()

usersRouter.post('/signup', async (req, res)=>{
    const {firstName, lastName, email, age, password} = req.body
    const user = await usersModel.findOne(e => e.email === email);
    if(user){
        return res.redirect('api/views/errorSignup')
    }
    await usersModel.create(req.body)
    res.redirect('/api/views/')
})

usersRouter.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const user = await usersModel.findOne(e => e.email === email && e.password === password);
    if(!user){
        return res.redirect('api/views/errorLogin')
    }
    req.session.email = email
    res.redirect('/api/views/products')
})

usersRouter.get('/logout', (req, res)=>{
    req.session.destroy(error =>{
        if(error){
            console.log(error)
            res.send(error)
        } else{
            res.redirect('/api/views')
        }
    })
})

export default usersRouter