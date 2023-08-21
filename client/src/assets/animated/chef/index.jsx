import React from 'react';
import { Helmet } from 'react-helmet';
import "./styles.css"
function AnimatedChef() {
    return (
        <div className='animated-chef'>
            <creattie-embed
                src="https://d1jj76g3lut4fe.cloudfront.net/saved_colors/15532/kqB6lrAJ1fnz57QA.json"
                delay="1"
                speed="100"
                frame_rate="24"
                trigger="loop"
                style={{width:'400px',height:'400px', backgroundColor: '#f0f0f0'}}
            ></creattie-embed>
            <Helmet>
                <script src="https://creattie.com/js/embed.js?id=adfc0335539d5f5148f7" defer />
            </Helmet>
        </div>
    );
}

export default AnimatedChef;
