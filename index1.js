const express=require("express");

const mongoose = require("mongoose");


const app=express();
app.use(express.json());
const connect =()=>{
    return mongoose.connect(
        "mongodb+srv://kishore:kishore_1995@cluster0.hveie.mongodb.net/bankingSystem?retryWrites=true&w=majority"
    );
};

const usersSchema= new mongoose.Schema({
    firstName:{type:String,require:true},
    middelName:{type:String,require:false},
    lastName:{type:String,require:true},
    age:{type:Number,require:true},
    email:{type:String,require:true,unique:true},
    address:{type:String,require:true},
    type:{type:String,require:true},
    gender:{type:String,require:true},

},
{
    versionKey:false,
    timestamps:true,
}
);

const Users=mongoose.model("users",usersSchema);

const branchDetailSchema= new mongoose.Schema({
    name:{type:String,require:true,unique:true},
    address:{type:String,require:true},
    IFSC:{type:String,require:true},
    MICR:{type:String,require:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },
   

},
{
    versionKey:false,
    timestamps:true,
}
);

const BranchDetail=mongoose.model("branchDetail",branchDetailSchema);


const masterAccountSchema= new mongoose.Schema({
    balance:{type:String,require:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },
  
},
{
    versionKey:false,
    timestamps:true,
}
);

const MasterAccount=mongoose.model("masterAccount",masterAccountSchema);


const fixedAccountSchema= new mongoose.Schema({
    account_number:{type:String,require:true,unique:true},
    balance:{type:String,require:false},
    interestRate:{type:String,require:true},
    maturityDate:{type:String,require:true},
    startDate:{type:String,require:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },

},
{
    versionKey:false,
    timestamps:true,
}
);

const FixedAccount=mongoose.model("fixedAccount",fixedAccountSchema);

const savingsAccountSchema= new mongoose.Schema({
    account_number:{type:String,require:true,unique:true},
    balance:{type:String,require:false},
    interestRate:{type:String,require:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true,
    },

},
{
    versionKey:false,
    timestamps:true,
}
);

const SavingsAccount=mongoose.model("savingsAccount",savingsAccountSchema);

app.get("/users",async(req,res)=>{
    try {
        const users=await Users.find().lean().exex();

        return res
        .status(200)
        .send({users:users});
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});


app.post("/users",async(req,res)=>{
    try {
        const users=await Users.create(req.body);

        return res
        .status(201)
        .send(users);
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});


app.get("/branchDetail",async(req,res)=>{
    try {
        const branchDetail=await BranchDetail.find().lean().exex();

        return res
        .status(200)
        .send({branchDetail:branchDetail});
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});


app.post("/branchDetail",async(req,res)=>{
    try {
        const branchDetail=await BranchDetail.create(req.body);

        return res
        .status(201)
        .send(branchDetail);
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});

app.get("/masterAccount",async(req,res)=>{
    try {
        const masterAccount=await MasterAccount.find().lean().exex();

        return res
        .status(200)
        .send({masterAccount:masterAccount});
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});


app.post("/masterAccount",async(req,res)=>{
    try {
        const masterAccount=await MasterAccount.create(req.body);

        return res
        .status(201)
        .send(masterAccount);
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});

app.get("/fixedAccount",async(req,res)=>{
    try {
        const fixedAccount=await FixedAccount.find().lean().exex();

        return res
        .status(200)
        .send({fixedAccount:fixedAccount});
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});


app.post("/fixedAccount",async(req,res)=>{
    try {
        const fixedAccount=await FixedAccount.create(req.body);

        return res
        .status(201)
        .send(fixedAccount);
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});

app.get("/savingsAccount",async(req,res)=>{
    try {
        const savingsAccount=await SavingsAccount.find().lean().exex();

        return res
        .status(200)
        .send({savingsAccount:savingsAccount});
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});


app.post("/savingsAccount",async(req,res)=>{
    try {
        const savingsAccount=await SavingsAccount.create(req.body);

        return res
        .status(201)
        .send(savingsAccount);
    } catch (error) {
        return res
        .status(500)
        .send({message:err.message});
    }
});

app.listen(5000,async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error);
    }
    console.log("listining on port 5000");
})
 