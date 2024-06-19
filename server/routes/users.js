const express = require('express');
const router = express.Router();
const pool = require('../db');
const cors = require('cors');

router.use(cors());
router.use(express.json());


router.post('/adding_users', async (res,req) => {
    const {id,name,code,active,email} = req.body 

    try {
        
    } 
    catch (error) {
        
    }
})