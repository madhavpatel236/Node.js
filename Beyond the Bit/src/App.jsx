import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from './store/appStore.js'

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
