import React, { useState } from "react";
import "./CustomerTable.scss";

export default function CustomerTable() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <div className="customerTable">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-box no-header clearfix">
              <div className="main-box-body clearfix">
                <div className="table-responsive">
                  <table className="table user-list">
                    <thead>
                      <tr>
                        <th>
                          <span>User</span>
                        </th>
                        <th>
                          <span>Created</span>
                        </th>

                        <th>
                          <span>Email</span>
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src="https://bootdey.com/img/Content/user_1.jpg"
                            alt
                          />
                          <a href="" className="user-link">
                            Mai Trọng Khánh
                          </a>
                        </td>
                        <td className="dateCreated">2022/08/12</td>
                        <td className="email">trongkhanh@gmail.com</td>
                        <td style={{ width: "20%" }}>
                        <button
                        className={show?"buttonUnblock": "buttonBlock"}
                        onClick={() => setShow(!show)}
                    >
                      {show ?"Unblock":"Block"}
                    </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="https://bootdey.com/img/Content/user_3.jpg"
                            alt
                          />
                          <a href="" className="user-link">
                            Quách Diệu Khánh
                          </a>
                        </td>
                        <td className="dateCreated">2021/08/02</td>

                        <td className="email">trongkhanh@gmail.com</td>
                        <td style={{ width: "20%" }}>
                        <button
                        className={show1?"buttonUnblock": "buttonBlock"}
                        onClick={() => setShow1(!show1)}
                    >
                      {show1 ?"Unblock":"Block"}
                    </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="https://bootdey.com/img/Content/user_2.jpg"
                            alt
                          />
                          <a href="" className="user-link">
                            Nguyễn Thành Trung
                          </a>
                        </td>
                        <td className="dateCreated">2021/10/30</td>

                        <td className="email">trongkhanh@gmail.com</td>
                        <td style={{ width: "20%" }}>
                        <button
                        className={show2?"buttonUnblock": "buttonBlock"}
                        onClick={() => setShow2(!show2)}
                    >
                      {show2 ?"Unblock":"Block"}
                    </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
