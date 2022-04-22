import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";

import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import firebase from "../../lib/firebaseConfig";
import { signout } from "../../utils/auth";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";

const SessionTimeout = () => {
  const [events, setEvents] = useState(["click", "load", "scroll"]);
  const [second, setSecond] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const auth = getAuth(firebase);

  const [user] = useAuthState(auth);
  const userContext = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signout();

    setTimeout(() => {
      userContext?.setUser(null);
      router.push("/");
    }, 1000);
  };
  let timeStamp;
  let warningInactiveInterval = useRef();
  let startTimerInterval = useRef();

  // start inactive check
  let timeChecker = () => {
    startTimerInterval.current = setTimeout(() => {
      let storedTimeStamp = sessionStorage.getItem("lastTimeStamp");
      warningInactive(storedTimeStamp);
    }, 90000);
  };

  // warning timer
  let warningInactive = (timeString) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(() => {
      const maxTime = 4;
      const popTime = 2;

      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const leftSecond = 60 - diff.seconds();

      if (minPast === popTime) {
        setSecond(leftSecond);
        setOpen(true);
      }

      if (minPast === maxTime) {
        clearInterval(warningInactiveInterval.current);
        setOpen(false);
        sessionStorage.removeItem("lastTimeStamp");
        handleSignOut();
      }
    }, 20000);
  };

  // reset interval timer
  let resetTimer = useCallback(() => {
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);

    if (user) {
      timeStamp = moment();
      sessionStorage.setItem("lastTimeStamp", timeStamp);
    } else {
      clearInterval(warningInactiveInterval.current);
      sessionStorage.removeItem("lastTimeStamp");
    }
    timeChecker();
    setOpen(false);
  }, [user]);

  // handle close popup
  const handleClose = () => {
    setOpen(false);

    resetTimer();
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    timeChecker();

    return () => {
      clearTimeout(startTimerInterval.current);
      //   resetTimer();
    };
  }, [resetTimer, events, timeChecker]);

  if (!isOpen) {
    return null;
  }

  // change fragment to modal and handleclose func to close
  return <Fragment />;
};

export default SessionTimeout;
