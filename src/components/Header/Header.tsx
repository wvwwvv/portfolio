import {Link as ScrollLink} from "react-scroll";
import styles from './Header.module.css'
import {useLocation, useNavigate} from "react-router-dom";


const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";

    const handleClick = (to: String) => {
        if (!isHome) {
            navigate('/', {state: {scrollTo: to}});
        }
    };

    return (
        <header className={styles.header}>
            {isHome ? (
                <>
                    <nav className={styles.logo}>
                        <ScrollLink to="overview" spy={true} smooth={true} offset={-70} duration={500}>KSM's Portfolio</ScrollLink>
                    </nav>
                    <nav className={styles.nav}>
                        {/* offset : 헤더 크기만큼 미리 위쪽에서 빼놓기 */}
                        <ScrollLink to="about" spy={true} smooth={true} offset={-70} duration={400}>About</ScrollLink>
                        <ScrollLink to="skill" spy={true} smooth={true} offset={-70} duration={400}>Skills</ScrollLink>
                        <ScrollLink to="project" spy={true} smooth={true} offset={-70} duration={400}>Projects</ScrollLink>
                        <ScrollLink to="blog" spy={true} smooth={true} offset={-70} duration={400}>Blogs</ScrollLink>
                        <ScrollLink to="dtt" spy={true} smooth={true} offset={-70} duration={400}>DTT</ScrollLink>
                        <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={400}>Contact</ScrollLink>
                    </nav>
                </>
            ) : (
                <>
                    <nav className={styles.logo}>
                        <span onClick={() =>handleClick('overview')}>강상민의 포트폴리오</span>
                    </nav>
                    <nav className={styles.nav}>
                        <span onClick={() => handleClick('about')}>About</span>
                        <span onClick={() => handleClick('skill')}>Skills</span>
                        <span onClick={() => handleClick('project')}>Projects</span>
                        <span onClick={() => handleClick('blog')}>Blogs</span>
                        <span onClick={() => handleClick('dtt')}>DTT</span>
                        <span onClick={() => handleClick('contact')}>Contact</span>
                    </nav>
                </>
            )}
        </header>

    )
}

export default Header;