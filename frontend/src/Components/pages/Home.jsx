import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-sec sec">
            <h1 className="head-1 home-h1">Utility Bill Explainer</h1>
            <div className="buttons">
                <button
                    className="home-btn "
                    onClick={() => navigate("/ManualEnter")}
                >
                    Manual Input
                </button>
                <button
                    className="home-btn"
                    onClick={() => navigate("/AddImage")}
                >

                    Upload Image
                </button>
            </div>
        </div>
    );
}
export default Home