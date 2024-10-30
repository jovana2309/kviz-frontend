import React from "react";

function ErrorMessage ({children}) {
return (
    <div style= {{
        backgroundColor: "#b11dde",
        padding: "1rem",
        fontWeight: "bold",
        borderRadius: "20px",
        maxWidth: "fit-content",
        marginLeft: "2rem",
        top: "20px",
        left: "528px",
        position: "fixed",
        zIndex: 99999,
    }}
    > ERROR: {children}
    </div>
);
}

export default ErrorMessage;