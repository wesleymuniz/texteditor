this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient) {

  Accounts.ui.config({
    extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
      },
      {
        fieldName: 'last-name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
      },
    ],
	  requestPermissions: {
	    facebook: ['user_likes'],
	    github: ['user', 'repo']
	  },
	  requestOfflineToken: {
	    google: true
	  },
	  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	});

// find the first document in the Documents colleciton and send back its id
  Template.editor.helpers({
    docid:function(){
      var doc = Documents.findOne();
      if (doc){
        return doc._id;
      }
      else {
        return undefined;
      }
    },
    // template helper that configures the CodeMirror editor
    // you might also want to experiment with the ACE editor
    config:function(){
      return function(editor){
        editor.setOption("mode", "html");
        editor.on("change", function(cm_editor, info){
          //console.log(cm_editor.getValue());
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
        });
      }
    },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // startup code that creates a document in case there isn't one yet.
    if (!Documents.findOne()){// no documents yet!
        Documents.insert({title:"my new document"});
    }
  });
}
