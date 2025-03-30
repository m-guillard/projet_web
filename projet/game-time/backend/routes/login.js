const express = require('express');

const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
    const data = req.body;
    console.log('Données reçues :', {data});

    res.status(200).json({message:'Login success'});

})
module.exports = router;