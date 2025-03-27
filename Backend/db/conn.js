import mongoose from "mongoose";


// Connect with database
const connect = async ()=>{
    try{

        const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully" );
    }catch(err){
        console.error(`Error: ${err}`);
        process.exit(1);
    }
}


export default connect;