import React from "react";

import PropTypes from "prop-types";

const Footer = (props) => {
    return (
        <div className="container-fluid fixed-bottom text-light">
            {props.properties.map((item, index) => (
                <footer key={index} className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <span className="mb-3 mb-md-0 text-body-secondary">Made by{" "}
                        {item.name} © 2024</span>
                        <a class="text-body-secondary" href={item.githubURL}><i className="fab fa-github"></i></a>
                </footer>
            ))}
        </div>
    );
};


Footer.propTypes = {
    properties: PropTypes.arrayOf(PropTypes.shape({
        githubURL: PropTypes.string,
        name: PropTypes.string,
    }))
}

export default Footer;