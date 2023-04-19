import React from 'react'
import Navbar from '../components/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Links from '../components/Links';
import { Button } from '@mui/material';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2d3436',
        },
    },
});
const Contact = () => {
    const navigate = useNavigate();

    const externalLinks = (name) => {
        if (name === "mail")
            window.location.href = "mailto:adhikarysayandip@gmail.com";
        else if (name === "portfolio")
            window.location.href = "https://sayandip2.netlify.app";
        else if (name === "facebook")
            window.location.href = "https://www.facebook.com/sayandip.adhikary.96";
        else if (name === "github")
            window.location.href = "https://github.com/Sayandip0408";
        else if (name === "instagram")
            window.location.href = "https://www.instagram.com/sayan.dip7/";
        else navigate('/contact');
    }

    const mailText = 'Mail To: adhikarysayandip@gmail.com';
    const portfolioText = "SayanDip's Portfolio: https://sayandip2.netlify.app";
    const instagramText = "Instagram Profile: https://www.instagram.com/sayan.dip7/";
    const facebookText = "Facebook Profile: https://www.facebook.com/sayandip.adhikary.96";
    const githubText = "GitHub Profile: https://github.com/Sayandip0408";

    return (
        <div className='contactpage'>
            <Navbar />
            <ThemeProvider theme={theme}>
                <div className="container">
                    <Links />
                </div>
                <div className="container my-5 contactDiv">
                    <h4 className='text-center my-5'><AlternateEmailOutlinedIcon /> E-MAIL <SendOutlinedIcon /></h4>
                    <Tooltip title={mailText}>
                        <Button variant='outlined' className='col-12' onClick={() => { externalLinks("mail") }}>adhikarysayandip@gmail.com</Button>
                    </Tooltip>
                </div>
                <div className="container my-5 contactSocialDiv">
                    <h4 className='text-center my-4'>SOCIAL MEDIA</h4>
                    <div className="row">
                        <Tooltip title={portfolioText}>
                            <Button className='col-lg-3 col-md-6 col-12' onClick={() => { externalLinks("portfolio") }}><StarsOutlinedIcon className='fs-1' /> portfolio</Button>
                        </Tooltip>
                        <Tooltip title={instagramText}>
                            <Button className='col-lg-3 col-md-6 col-12' onClick={() => { externalLinks("instagram") }}><InstagramIcon className='fs-1' />Instagram</Button>
                        </Tooltip>
                        <Tooltip title={githubText}>
                            <Button className='col-lg-3 col-md-6 col-12' onClick={() => { externalLinks("github") }}><GitHubIcon className='fs-1' />github</Button>
                        </Tooltip>
                        <Tooltip title={facebookText}>
                            <Button className='col-lg-3 col-md-6 col-12' onClick={() => { externalLinks("facebook") }}><FacebookOutlinedIcon className='fs-1' />facebook</Button>
                        </Tooltip>
                    </div>
                </div>
            </ThemeProvider>
            <Footer />
        </div>
    )
}

export default Contact