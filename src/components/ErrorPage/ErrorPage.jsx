import { Link } from "react-router-dom";

import "./errorPage.css";

const ErrorPage = () => {
    return (
        <section className="page_404">
            <div className="page_container">
                <div className="page_404-header">
                    <h1>404</h1>
                </div>
                <div className="page_404-content">
                    <h3>Look like you're lost</h3>
                    <p>the page you are looking for not avaible!</p>
                    <Link to="/" className="link_404">
                        Go to Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
