import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
