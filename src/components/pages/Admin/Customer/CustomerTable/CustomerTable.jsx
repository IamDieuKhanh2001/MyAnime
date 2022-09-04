import React from "react";
import "./CustomerTable.scss";

export default function CustomerTable() {
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
                        <th>&nbsp;</th>
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
                        <td>
                          <a href="">trongkhanh@gmail.com</a>
                        </td>
                        <td style={{ width: "20%" }}>
                          <a href="" className="table-link text-info">
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x" />
                              <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                            </span>
                          </a>
                          <a href="" className="table-link danger">
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x" />
                              <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                            </span>
                          </a>
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

                        <td>
                          <a href="">dieuquach@gmail.com</a>
                        </td>
                        <td style={{ width: "20%" }}>
                          <a href="" className="table-link  text-info">
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x" />
                              <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                            </span>
                          </a>
                          <a href="" className="table-link danger">
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x" />
                              <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                            </span>
                          </a>
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

                        <td>
                          <a href="">trung@yahoo.com</a>
                        </td>
                        <td style={{ width: "20%" }}>
                          <a href="" className="table-link  text-info">
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x" />
                              <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                            </span>
                          </a>
                          <a href="" className="table-link danger">
                            <span className="fa-stack">
                              <i className="fa fa-square fa-stack-2x" />
                              <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                            </span>
                          </a>
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
