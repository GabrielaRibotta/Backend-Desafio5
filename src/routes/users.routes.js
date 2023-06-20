import { Router } from "express";

const usersRouter = Router()

usersRouter.post('/signup', (req, res)=>{
    const {firstName, lastName, email, password} = req.body
    const user = users.findOne(e => e.email === email)
    if(user){
        return res.redirect('api/views/errorSignup')
    }
    users.push(req.body)
    res.redirect('/api/views/')
})

usersRouter.post('/login', (req, res)=>{
    const {email, password} = req.body
    const user = users.findOne(e => e.email === email && e.password === password)
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