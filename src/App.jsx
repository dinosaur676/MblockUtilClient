import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import KaiaScan from "./components/kaiascan/KaiaScan.jsx";
import MblockReward from "./components/mblock_reward/MblockReward.jsx";
import Setting from "./components/setting/Setting.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <div style={{width: "1000px"}}>
                <nav className="navbar">
                    <ul className="navbar-menu">
                        <li><Link to={"/"}>엠블록 보상</Link></li>
                        <li><Link to="/kaiaScan">카이아 보상</Link></li>
                        <li><Link to="/setting">API 설정</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path={"/"} element={<MblockReward/>}/>
                    <Route path={"/kaiaScan"} element={<KaiaScan/>}/>
                    <Route path={"/setting"} element={<Setting/>}/>
                </Routes>
            </div>
        </BrowserRouter>


    );
}
export default App
