import About from "../../components/About/About.tsx";
import Blog from "../../components/Blog/Blog.tsx";
import Header from "../../components/Header/Header.tsx";
import Overview from "../../components/Overview/Overview.tsx";
import Skill from "../../components/Skill/Skill.tsx";
import Project from "../../components/Project/Project.tsx";
import DTT from "../../components/DTT/DTT.tsx";
import Contact from "../../components/Contact/Contact.tsx";

const Home = () => {
    return (
        <div style={{paddingTop : 70}}>
            <Header/>
            <Overview/>
            <About/>
            <Skill/>
            <Project/>
            <Blog/>
            <DTT/>
            <Contact/>
        </div>
    )
}

export default Home;