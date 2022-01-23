const router =  require('express').Router();

router.get('/', (req, res)=>{
    res.json({
        error: null,
        data: {
            title: 'Bienvenido protegido!',
            user: req.user
        }
    })
})

module.exports = router;