const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateQuestionOfTheDay = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("America/Los_Angeles")
  .onRun((context) => {
    const firestore = admin.firestore();

    // Get the most recent question
    return firestore
      .collection("questions")
      .orderBy("timestamp", "asc")
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No questions found");
          return null;
        }
        const question = snapshot.docs[0].get("question");
        snapshot.docs[0].ref.delete();
        // Update the question of the day
        return firestore
          .collection("q2day")
          .doc("daily")
          .update({ question: question });
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  });

exports.addToHistory = functions.pubsub
  .schedule("10 22 * * *")
  .timeZone("America/Los_Angeles")
  .onRun((context) => {
    const firestore = admin.firestore();

    const timestamp = Date.now();

    const q2dayRef = firestore.collection("q2day").doc("daily");
    const historyRef = firestore.collection("history");

    q2dayRef
      .get()
      .then((snapshot) => {
        const answers = snapshot.get("responses");
        const question = snapshot.get("question");
        historyRef.add({
          answers: answers,
          timestamp: timestamp,
          question: question,
        });
      })
      .then(() => {
        firestore.collection("q2day").doc("daily").update({ responses: [] });
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  });
