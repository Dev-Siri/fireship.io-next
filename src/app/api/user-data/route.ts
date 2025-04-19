import { doc, getFirestore, onSnapshot } from "firebase/firestore";

import type { UserData, UserProgress } from "@/store/globalData";
import type { Unsubscribe } from "firebase/auth";

import { firebaseApp } from "@/utils/firebase";
import getServerUser from "@/utils/user/server";

interface Data {
  userData: UserData | null;
  userProgress: UserProgress | null;
  seats: any | null;
}

export function GET() {
  const user = getServerUser();

  let unsubData: Unsubscribe | undefined;
  let unsubProgress: Unsubscribe | undefined;
  let unsubSeats: Unsubscribe | undefined;

  if (user) {
    const data: Data = {
      seats: null,
      userData: null,
      userProgress: null,
    };

    const firestore = getFirestore(firebaseApp);
    const userRef = doc(firestore, `users/${user.user_id}`);
    const progressRef = doc(firestore, `progress/${user.user_id}`);
    const seatsRef = doc(firestore, `seats/${user.user_id}`);

    unsubData = onSnapshot(userRef, snap => {
      data.userData = snap.data() as UserData;
      if (snap.data()?.enterprise) unsubSeats = onSnapshot(seatsRef, snap => (data.seats = snap.data()));
    });
    unsubProgress = onSnapshot(progressRef, snap => (data.userProgress = snap.data() as UserProgress));

    return new Response(JSON.stringify(data));
  } else {
    unsubData && unsubData();
    unsubProgress && unsubProgress();
    unsubSeats && unsubSeats();

    return new Response(
      JSON.stringify({
        seats: null,
        userData: null,
        userProgress: null,
      })
    );
  }
}
