const postCategorySchema = (req, res)=>{
    const {name} = req.body
     
    if(!name){
        return res.sendStatus(400)
    }
}