import Logo from "../assets/logo.jpg";

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={Logo} alt="" />
                <h1>ReactFood</h1>
            </div>
            <button className="text-button">Cart (#)</button>
        </header>
    );
}
