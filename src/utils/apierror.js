class apierror extends Error{
    constructor(
        statuscode,
        
        errors=[],
        message="Something went wrong",
        statck=""

    ){
        super(message),
        this.statuscode=statuscode,
        this.data=null,
        this.errors=errors,
        this.success=false,
        this.message=message

        if(statck){
            this.statck=statck;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
        
    }
}
export{apierror}