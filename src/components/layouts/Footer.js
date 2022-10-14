import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

function Footer() {
    return (
        <footer>

            <div>

                <a  href='https://www.linkedin.com/in/jeandson-barros-1aa133221/' target="_blank" rel="noreferrer" >
                    <BsLinkedin />
                </a>

                <a href='https://github.com/JeandsonBarros' target="_blank" rel="noreferrer" >
                    <BsGithub />
                </a>

                <a href='https://www.instagram.com/jeandsonbarros/' target="_blank" rel="noreferrer">
                    <BsInstagram />
                </a>

            </div>

            <p>Created by Jeandson Barros. &copy; 2022</p>
            
        </footer>
    );
}

export default Footer;