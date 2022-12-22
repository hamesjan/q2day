const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateQuestionOfTheDay = functions.pubsub
  .schedule("28 15 * * *")
  .timeZone("America/Los_Angeles")
  .onRun((context) => {
    const firestore = admin.firestore();

    // Get the most recent question
    return firestore
      .collection("questions")
      .orderBy("timestamp", "desc")
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No questions found");
          return null;
        }

        const question = snapshot.docs[0].get("question");

        // Update the question of the day
        return firestore
          .collection("q2day")
          .doc("daily")
          .update({ question: question });
      })
      .then(() => {
        // Store all answers in the history collection
        return firestore
          .collection("q2dayAnswers")
          .get()
          .then((snapshot) => {
            const answers = [];
            snapshot.forEach((doc) => {
              answers.push(doc.data());
            });

            return firestore.collection("history").add({ answers: answers });
          });
      })
      .then(() => {
        // const collectionRef = firebase.firestore().collection("q2dayanswers");

        // // Delete all documents in the collection
        // collectionRef.get().then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     doc.ref.delete();
        //   });
        // });

        console.log("Question of the day and history updated");
        return null;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  });
