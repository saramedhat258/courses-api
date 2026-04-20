//to handle exeption from async functions
module.exports=(asynfn)=>{
    return (req,res,next)=>{
        asynfn(req,res,next).catch((err)=>{
            next(err)
        })
    }
}