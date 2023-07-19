import { Link } from "react-router-dom";

export function Menu() {
    return (
        <>
            <nav
                className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>Main</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to={"/"}>Товари</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to={"/category/all"}>Категорії</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}