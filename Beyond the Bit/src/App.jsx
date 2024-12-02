import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from './store/appStore.js'
import Profile from "./components/Profile.jsx";
import Requests from "./components/Requests.jsx";
import Signup from "./components/Signup.jsx";
import PersonProfile from "./components/PersonProfile.jsx";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/personProfile" element={< PersonProfile /> } />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
