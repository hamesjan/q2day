const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateQuestionOfTheDay = functions.pubsub
  .schedule("59 22 * * *")
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

        // Update the question of the day
        return firestore
          .collection("q2day")
          .doc("daily")
          .update({ question: question });
      })
      .then(() => {
        // Store all answers in the history collection
        const timestamp = Date.now();
        timestamp.setHours(0);
        timestamp.setMinutes(0);
        timestamp.setSeconds(0);
        timestamp.setMilliseconds(0);
        const q2dayRef = firestore.collection("q2day").doc("daily");
        const historyRef = firestore.collection("history");

        return q2dayRef.get().then((snapshot) => {
          const answers = snapshot.get("responses");
          historyRef.add({ answers: answers, timestamp: timestamp });
        });
      })
      .then(() => {
        return firestore
          .collection("q2day")
          .doc("daily")
          .update({ responses: [] });
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  });
