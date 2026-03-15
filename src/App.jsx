import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./utils/store";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Feed from "./pages/Feed";

function App() {
    return (
        <>
            <Provider store={store}>
                <Toaster position="top-center" />
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" element={<Body />}>
                            <Route index element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="edit-profile" element={<EditProfile />} />
                            <Route path="feed" element={<Feed />} />
                            <Route path="*" element={<div className="text-center py-10">404 Not Found</div>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
