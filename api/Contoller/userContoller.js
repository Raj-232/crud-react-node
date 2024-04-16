const User=require('../Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cretaeUser=async (req, res) =>{
    try {
        const { name,email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name,email, password: hashedPassword });
        res.status(201).json({
            status: 201,
            message: "user created successfully",
            data: user
        });
      } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
      }
}
const userLogin=async (req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.userID }, process.env.JWT_SECRET,{
            expiresIn: '8h' 
       });
        res.status(200).json({
            status: 200,
            message: "user login successfully",
            token:token,
            data: user
        });
      } catch (error) {
        res.status(500).json({ error: error.name });
      }
}
module.exports={
    cretaeUser,
    userLogin
}