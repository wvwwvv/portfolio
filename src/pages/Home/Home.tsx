import About from "../../components/About/About.tsx";
import Blog from "../../components/Blog/Blog.tsx";
import Overview from "../../components/Overview/Overview.tsx";
import Skill from "../../components/Skill/Skill.tsx";
import Project from "../../components/Project/Project.tsx";
import DTT from "../../components/DTT/DTT.tsx";
import Contact from "../../components/Contact/Contact.tsx";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {scroller} from "react-scroll";

const Home = () => {

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const target = location.state.scrollTo;

            setTimeout(() => {
                scroller.scrollTo(target, {
                    duration: 500,
                    smooth: true,
                    offset: -70
                });
            }, 100);

            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div style={{paddingTop : 70}}>
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