import React from 'react';

const footerStyle={
    position: "fixed",
    bottom: '0',
    width: '100%',
    padding:'5px'
}

export function Footer(){
    
    return(
        <div className="footer bg-dark text-light" style={footerStyle}>
            footer works!
        </div>
    );
}