import {
    Link
  } from "react-router-dom";
const Sidebar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <h1 className="navbar-brand">Trà sữa otaku</h1>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/home">Trang chủ</Link>
                    <Link className="nav-link" to="/menu">Order - Toco</Link>
                    <Link className="nav-link" to="/order">Thông báo</Link>
                    <Link className="nav-link" to="/payment">Thanh toán</Link>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar;