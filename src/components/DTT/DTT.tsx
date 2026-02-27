import styles from './DTT.module.css'
import {useNavigate} from "react-router-dom";
const Contact = () => {

    const navigate = useNavigate();

    return (

        <section id="dtt" className={styles.section}>
            <h1 className={styles.title}>Developer Type Test</h1>

            <p className={styles.explain}>나의 개발자 유형은 무엇일까?</p>

            <div
                onClick={() => navigate(`/dtt/test`)}
                style={{cursor: 'pointer'}}
                className={styles.test_button}
            >확인하기</div>
        </section>
    );
};



export default Contact;

