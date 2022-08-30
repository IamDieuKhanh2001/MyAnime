import "./MessageModal.scss";

export default function MessageModal({ message, type, setModal }) {
  const chooseType = () => {
    if (type === "success") {
      return (
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      );
    } else if (type === "error") {
      return (
        <div className="error-banmark">
          <div className="ban-icon">
            <span className="icon-line line-long-invert"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      );
    } else return <div>Lỗi type</div>;
  };

  return (
    <div className="messageModal">
      <div className="modal">
        <div className="modalOverlay" onClick={() => setModal(false)}></div>
        <div className="modalBody">
          <div className="message">{message}</div>
          <div className="type">{chooseType()}</div>
        </div>
      </div>
    </div>
  );
}
