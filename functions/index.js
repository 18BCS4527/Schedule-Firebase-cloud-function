const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.scheduledFunction = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  var db=admin.firestore();
  const ref=await db.collection('User').get();
  try{
    ref.forEach((value)=>{
      if(value.data()['cycle']>=value.data()['count']+1){
      return  db.collection('User').doc(''+value.id).set({
          'count':value.data()['count']+1,
      },{merge:true}).catch((e)=>console.log('Check ERROR'+e));
      }
      else{
        return  db.collection('User').doc(''+value.id).set({
          'count':1,
      },{merge:true}).catch((e)=>console.log('Check ERROR'+e));
      }
    });
  }catch(e){
    return console.log(e);
  }

  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
