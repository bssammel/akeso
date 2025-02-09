import { FaLinkedin, FaGithubSquare, FaReact, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { SiRedux } from "react-icons/si";
import './Footer.css'

function Footer() {
    return (
        <>
        <div id='footer'>
            <div className='footer-column' id='socials'>
              
                <a href='https://www.linkedin.com/in/simon-sammel/' target="_blank" rel="noopener noreferrer" className='link'>
                  {/* add linked in icon from reacticons */}
                  <FaLinkedin/> <p>LinkedIn Profile</p>
                </a>
                <a href="https://github.com/bssammel" target="_blank" rel="noopener noreferrer" className='link'>
                  {/* add ithub icon from react icons useportfolio */}
                  <FaGithubSquare /><p>GitHub Profile</p>
                </a>
                <p>Created by Simon Sammel-Krawa</p>
            </div>
            <div className='footer-column' id='stack'>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className='link'>
                {/* add ithub icon from react icons useportfolio */}
                <RiJavascriptFill size={28}/>
              </a>
              <a href='https://react.dev/' target="_blank" rel="noopener noreferrer" className='link'>
                <FaReact size={28}/>
              </a>
              <a href='https://redux.js.org/' target="_blank" rel="noopener noreferrer" className='link'>
                <SiRedux size={28}/>
              </a>
              <a href='https://developer.mozilla.org/en-US/docs/Web/HTML' target="_blank" rel="noopener noreferrer" className='link'>
                <FaHtml5 size={28}/>
              </a>
              <a href='https://www.w3.org/Style/CSS/Overview.en.html' target="_blank" rel="noopener noreferrer" className='link'>
                <FaCss3Alt size={28}/>
              </a>
            </div>
            {/* <div className='footer-column' id='docs'></div> */}
        </div>
        </>
    )
}

export default Footer;
