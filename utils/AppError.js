class AppError extends Error{
    constructor(){
        super();
    }
    create(msg,code,txt){
        this.message=msg;
        this.statusCode=code;
        this.statusText=txt;
        return this;
    }
}

module.exports=new AppError();
