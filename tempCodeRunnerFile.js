 // if already available
  try{
    const user = await user_model.findOne({userId : 'admin'});
    if(user){
      console.log("admin is already present");
      console.log(user);
      return;
    }
  }
  catch(err){
    console.log("Error occured during the fetching of already availabe admin details from DB : ", err);
  }
