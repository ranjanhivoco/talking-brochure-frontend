import React  from "react"

import Home from "./pages/Home";
// import Test from "./components/Test";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import Test from "./components/Test";
import NoPage from "./components/NoPage";
import Splash from "./pages/Splash";
import Location from "./pages/Location";
import DelearDetails from "./pages/DelearDetails";
import PainterLocation from "./pages/PainterLocation";
import PainterDetails from "./pages/PainterDetails";
import Quiz from "./pages/Quiz";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import Survey from "./pages/Survey";
import DisplayPdf from "./pages/DisplayPdf";
import PlateformWisePages from "./pages/PlateformWisePages";

function App() {
  const [lastUuId, setLastUuId] = useState(null);

  const postData = async (uuId = "empty uuid") => {
    try {
      const res = await fetch(
        "https://cruncha.querease.ai/api/interactivedemos/save_date",
        // "http://192.168.1.9:8502/api/interactivedemos/save_date",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: uuId }),
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const uuId = sessionStorage.getItem("uuId");
      if (uuId && uuId !== lastUuId) {
        postData(uuId);
        setLastUuId(uuId);
      }
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/interaction" element={<PlateformWisePages />} />
          <Route path="/explore-your-experience" element={<Splash />} />
          <Route path="/enter-your-location" element={<Location />} />
          <Route path="/get-your-nearest-dealers" element={<DelearDetails />} />
          <Route path="/servey" element={<Survey />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/get-painter-using-location"
            element={<PainterLocation />}
          />
          <Route
            path="/get-your-nearest-painters"
            element={<PainterDetails />}
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/download" element={<DisplayPdf />} />

          <Route path="*" element={<NoPage />} />

          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
