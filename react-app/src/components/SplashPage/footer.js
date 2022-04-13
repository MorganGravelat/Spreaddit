const FooterComponent = () => {

    return(
        <footer className="footer">
            <div>
                <div className="creator-info-column">
                    <h3 className="creator-name">Author: Morgan Gravelat</h3>
                    <ul className="networking-links">
                        <li>
                            <a className="footer-link" href="https://github.com/MorganGravelat">
                                <ion-icon className="github-logo" name="github-logo"></ion-icon>
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="https://www.linkedin.com/in/morgan-gravelat-1927b4194/">
                                <ion-icon className="linkedIn-logo" name="linkedin-logo"></ion-icon>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="technology">
                    <ul className="technology-list">
                        <li className="bottom-link">Python</li>
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
