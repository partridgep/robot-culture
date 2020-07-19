import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandPage(props) {

    return (
        <div className='LandingPage'>
            <div className='LandingPage-title'>
                <div className='LandingPage-welcome'>
                    <h1 className='LandingPage-gradient'>ROBOT CULTURE</h1>
                    <h1 className='LandingPage-shadow'>ROBOT CULTURE</h1>
                    <h2>Meet every robot from pop-culture</h2>
                </div>
                <div className='LandingPage-robots'>
                    <Link to="/robots/1"><img className='LandingPage-img LandingPage-c3po'src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1dbc1935-6542-4ee3-822f-135cff4ba62c/ddqmntf-6f912701-c4d5-4e90-a8ce-552156dc02e7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMWRiYzE5MzUtNjU0Mi00ZWUzLTgyMmYtMTM1Y2ZmNGJhNjJjXC9kZHFtbnRmLTZmOTEyNzAxLWM0ZDUtNGU5MC1hOGNlLTU1MjE1NmRjMDJlNy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.F6zeThf2-pUSRD42EFlOl5GcwoFMIyzWHPrAsPou-rU'></img></Link>
                    <Link to="/robots/2"><img className='LandingPage-img LandingPage-terminator'src='https://vignette.wikia.nocookie.net/villains/images/b/b1/T800_endo.png/revision/latest?cb=20191027082942'></img></Link>
                    <Link to="/robots/3"><img className='LandingPage-img LandingPage-walle'src='https://vignette.wikia.nocookie.net/pixar/images/d/de/Wall%E2%80%A2e_clipped_rev_1.png/revision/latest?cb=20170807223723'></img></Link>
                    <Link to="/robots/4"><img className='LandingPage-img LandingPage-metropolis'src='https://i.pinimg.com/originals/ae/f1/b0/aef1b079bd39f3b6c98dc417e534fac1.jpg'></img></Link>
                </div>
            </div>
            <Link to="/robots" className='LandingPage-enter'>Enter Database</Link>
        </div>
    );
}

export default LandPage;