const FooterComponent = () => {

    return(
        <footer className="footer">
            <div className="info-div-container">
                <div className="creator-info-column">
                    <h3 className="creator-name">Author: Morgan Gravelat</h3>
                    <ul className="networking-links">
                        <li>
                            <a className="footer-link" href="https://github.com/MorganGravelat">
                            <p>My Github</p>
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="https://www.linkedin.com/in/morgan-gravelat-1927b4194/">
                                <p>My Linked In</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <h3>Technologies Used:</h3>
                <div className="technology">
                    <ul className="technology-list">
                        <li className="bottom-link first-item">Python</li>
                        <li className="bottom-link">Javascript</li>
                        <li className="bottom-link">HTML</li>
                        <li className="bottom-link">CSS</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent;
