import {Link as ScrollLink} from "react-scroll";
import styles from './Header.module.css'


const Header = () => {


    return(
        <header className={styles.header}>
            <nav className={styles.logo}>
                <ScrollLink to="overview" spy={true} smooth={true} offset={-70} duration={500}>강상민의 포트폴리오</ScrollLink>
            </nav>
            <nav className={styles.nav}>
                {/* offset : 헤더 크기만큼 미리 위쪽에서 빼놓기 */}
                <ScrollLink to="about" spy={true} smooth={true} offset={-70} duration={500}>About</ScrollLink>
                <ScrollLink to="skill" spy={true} smooth={true} offset={-70} duration={500}>Skills</ScrollLink>
                <ScrollLink to="project" spy={true} smooth={true} offset={-70} duration={500}>Projects</ScrollLink>
                <ScrollLink to="blog" spy={true} smooth={true} offset={-70} duration={500}>Blogs</ScrollLink>
                <ScrollLink to="dtt" spy={true} smooth={true} offset={-70} duration={500}>DTT</ScrollLink>
                <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500}>Contact</ScrollLink>



            </nav>
        </header>
    )
}

export default Header;

