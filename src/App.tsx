import './App.module.css'
import Home from "./pages/Home/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import ProjectDetail from "./components/Project/ProjectDetail.tsx";
import DTTTest from "./components/DTT/DTTTest.tsx";
import BlogPost from "./components/Blog/BlogPost.tsx";
import DTTLogin from "./components/DTT/DTTLogin.tsx";
import DTTResult from "./components/DTT/DTTResult.tsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />}/>
                {/*상세페이지 아래에 추가*/}
                <Route path='/projects/:id' element={<ProjectDetail />}/>
                <Route path='/blogs/:slug' element={<BlogPost/>}/>
                <Route path='/dtt/login' element={<DTTLogin/>}/>
                <Route path='/dtt/test' element={<DTTTest/>}/>
                <Route path='/dtt/result/:nickname' element={<DTTResult/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
