const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const{ handle, email, password, category} = req.body;
    console.log(req.body);
    try {
      const defaultLink = {url: 'https://github.com/Victorcardoso-GG23',  title: 'Git Creator', icon: ''};
      const user = await User.create({handle, email, password, role: category, links:[defaultLink]});
      const token = jwt.sign({email: email}, process.env.SECRET_JWT);
      console.log('user', user);
      return res.json({message: 'Usuario criado com Sucesso!', status: 'success', 'token': token, id: user._id}); 
    } catch (error) {
      if(err.code === '11000'){
        return res.json({message: "Email já cadastrado!", status: 'error'});
      }
      return res.json({message: err.message, status: 'error'}); 
    }
  }
  const loginUser = (req, res) => {
    const{email, password} = req.body;
    try{
      const user = User.findOne({email: email, password: password});
      console.log(user);
      if(!user){
        return res.json({status: 'not found', error: 'Dados Invalidos'});
      }
      const token = jwt.sign({email: email}, process.env.SECRET_JWT);
      return res.json({message: 'Usuario Encontrado!', status: 'success', 'token': token, id: user._id});
    } catch(err) {
      return res.json({message: err.message, status: 'error'}); 
    }
  }



  module.exports = {registerUser, loginUser};