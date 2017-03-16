Meteor.methods({
  addDoc:function(){
    var doc;

    if(!this.userId){
      return;
    }

    user_id = this.userId;

    doc = {
      owner:user_id,
      createdOn: new Date(),
      title:"My new doc"
    }

    return Documents.insert(doc);
  },
  updateDocPrivacy:function(doc){
    var realDoc = Documents.findOne({_id:doc._id});
    if(realDoc){
      realDoc.isPrivate = doc.isPrivate;
      Documents.update({_id:realDoc._id}, realDoc);
    }
  },
  addEditingUser:function(){
    var doc, doc_id, user, user_id, eUsers;
    doc = Documents.findOne();
    console.log("Reading doc = " + doc);
    if(!doc){
      console("There is no doc");
      return;
    }

    doc_id = doc._id;

    user = Meteor.user();
    console.log("Reading user = " + doc);


    if(!user){
      console.log("There is no user_id");
      return;
    }

    user_id = user._id;

    eUsers = EditingUsers.findOne({doc_id:doc_id});

    if(!eUsers){
      console.log("Creating new editingUsers object");
      eUsers = {
        doc_id: doc_id,
        users: {},
      };
    }

    user_profile = Meteor.user().profile;
    user.lastEdit = new Date();
    eUsers.users[user_id] = user_profile;
    EditingUsers.upsert({_id:eUsers._id}, eUsers);
    console.log("Inserted");
  }
});