import { Link } from 'react-router-dom';
import "../styles/footer.css";

const Footer = ({genre}) => {
    return (
        <footer className={`${genre}`}>
            <p>Site créé par Anaïs D., Marion G. Alice I., Wassim J. et Robin J.</p>
        </footer>
    )
}

export default Footer;