import React from 'react'
import Navbar from '../components/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Links from '../components/Links';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
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
            window.location.href = "mailto:trainman@gmail.com";
        
        else if (name === "github")
            window.location.href = "https://github.com/amanverma21/TrainMan";
        
        
        else navigate('/contact');
    }

    const mailText = '';
    const githubText = "";

    return (
        <div className='contactpage'>
            <Navbar />
            <ThemeProvider theme={theme}>
                <div className="container">
                    {/* <Links /> */}
                </div>
                <div className="container my-5 contactDiv">
                    <h4 className='text-center my-5'> Contact Us </h4>
                    <Tooltip title={mailText}>
                        <Button variant='outlined' className='col-12' onClick={() => { externalLinks("mail") }}>trainman@gmail.com</Button>
                    </Tooltip>
                    
                </div>
                <div className="container my-2 contactSocialDiv">
                    <h4 className='text-center my-2'></h4>
                    <div className="row">
                   
                    <Tooltip title={githubText}>
                            <Button className='col-lg-2 col-md-1 col-2' class="d-flex justify-content-center" onClick={() => { externalLinks("github") }}><GitHubIcon className='fs-1' />Github</Button>
                        </Tooltip>
                       
                       
                        
                    </div>
                </div>
            </ThemeProvider>
            <Footer />
        </div>
    )
}

export default Contact