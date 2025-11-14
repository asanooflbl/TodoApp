import Todo from "../models/Todo.js";


export const addTodo = async(req,res)=>{
    try {
       const{title,description,status} = req.body;
       if(!title){
       return res.json({success:false,message:"Missing Title"})
       }
       const todo = await Todo.create({user:req.user,title,description,status})
       res.json({success:true,message:"Todo Added Successfully",todo})
    } catch (error) {
         res.json({ success: false, message: error.message });
    }
    
}

export const getTodos = async (req, res) => {
   try {
      const todos = await Todo.find({user:req.user})
      res.json({success:true,todos})
   } catch (error) {
      res.json({ success: false, message: error.message });
   }
};


export const updateTodo = async (req, res) => {
   try {
      const {id,title,description,status} = req.body;
      if(!id){
        return res.json({success:false,message:"Missing Todo ID"})
      }
      const todo = await Todo.findOne({_id : id,user:req.user})
      if(!todo){
       return res.json({success:false,message:"Todo Not Found"})
      }
      if(title !== undefined)todo.title = title;
      if(description !== undefined)todo.description = description;
      if(status !== undefined)todo.status = status;

      await todo.save();

      res.json({success:true,message:"Todo Updated successfully",todo});


   } catch (error) {
      res.json({ success: false, message: error.message });
   }
};

export const deleteTodo = async (req, res) => {
   try {
      const {id} = req.body;
       if(!id){
        return res.json({success:false,message:"Missing Todo Id"})
      }

      const todo = await Todo.findOne({_id:id,user:req.user})
     if(!todo){
        return res.json({success:false,message:"Todo Not Found"})
     }
        await Todo.deleteOne({_id:id})
        res.json({success:true,message:"Todo deleted"})
    
     
      
   } catch (error) {
      res.json({ success: false, message: error.message });
   }
};

export const toggleStatus = async (req, res) => {
   try {
      const {id} = req.body;
      if(!id){
        return res.json({success:false,message:"Missing Todo Id"})
      }
      const todo = await Todo.findOne({_id:id,user:req.user});
      todo.status = todo.status==="pending" ? "completed" : "pending";
      await todo.save();
      res.json({success:true,message:"Status is Updated"})

   } catch (error) {
      res.json({ success: false, message: error.message });
   }
};