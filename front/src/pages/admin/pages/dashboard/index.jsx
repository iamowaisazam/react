import { FaDesktop, FaPen, FaFileAlt, FaBriefcase } from "react-icons/fa";

const cardData = [
    { title: "MY NEW CLIENTS", value: 23, icon: <FaDesktop />, color: "#ff9b8a" },
    { title: "NEW PROJECTS", value: 169, icon: <FaPen />, color: "#00c5dc" },
    { title: "NEW INVOICES", value: 157, icon: <FaFileAlt />, color: "#a98eff" },
    { title: "ALL PROJECTS", value: 431, icon: <FaBriefcase />, color: "#0abb87" },
];

export default function Dashboard() {
    return (
        <main >
            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style={{ borderTop: "3px solid #03a9f4", background: "#fff" }}>
                <h5 className="fw-semibold mb-0" style={{ color: "#2c3e50" }}>
                    Dashboard
                </h5>

                <div className="d-flex align-items-center gap-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 small">
                            <li className="breadcrumb-item">
                                <a href="#" className="text-muted text-decoration-none">Home</a>
                            </li>
                            <li className="breadcrumb-item active text-primary" aria-current="page">
                                Dashboard
                            </li>
                        </ol>
                    </nav>


                </div>
            </div>
            <main className="flex-grow-1 p-4" style={{ background: "#f3f7fa", minHeight: "100vh" }}>
                <div className="row">
                    {cardData.map((card, idx) => (
                        <div key={idx} className="col-lg-3 col-md-6 col-12 mb-4">
                            <div
                                className="card shadow-sm h-100"
                                style={{
                                    border: "none",
                                    background: `linear-gradient(135deg, rgba(240,240,240,0.6), #ffffff)`,
                                    borderRadius: "12px"
                                }}
                            >
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="text-muted fs-5">{card.icon}</div>
                                            <h4 className="fw-bold mb-0" style={{ color: card.color }}>
                                                {card.value}
                                            </h4>
                                        </div>
                                        <div
                                            className="mt-2 text-uppercase fw-semibold"
                                            style={{ fontSize: "13px", color: "#6c757d" }}
                                        >
                                            {card.title}
                                        </div>
                                        <div
                                            className="progress mt-2"
                                            style={{ height: "5px", backgroundColor: "#f1f1f1", borderRadius: "3px" }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: "80%",
                                                    backgroundColor: card.color,
                                                    borderRadius: "3px"
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

        </main>
    );
}
