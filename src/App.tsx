import './App.module.css'
import Home from "./pages/Home/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import ProjectDetail from "./components/Project/ProjectDetail.tsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />}/>
                {/*상세페이지 아래에 추가*/}
                <Route path='/projects/:id' element={<ProjectDetail />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
