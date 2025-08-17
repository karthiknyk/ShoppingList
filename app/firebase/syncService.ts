// syncService.ts
import { db } from "./firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { store } from "../store/store";  // your redux store

export const syncDataToFirebase = async () => {
    try {
        const state = store.getState();

        // Example: syncing lists
        const userId = "demo-user"; // use auth later
        const ref = doc(collection(db, "users"), userId);

        await setDoc(ref, { lists: state.lists, updatedAt: Date.now() }, { merge: true });

        console.log("✅ Data synced to Firebase");
    } catch (err) {
        console.error("❌ Sync failed", err);
    }
};
