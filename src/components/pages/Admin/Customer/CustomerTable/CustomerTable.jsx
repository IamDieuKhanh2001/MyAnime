import React, { useEffect, useState } from "react";
import {
    APIBlockUser,
    APIGetAllUser,
    APIUnBlockUser,
} from "../../../../../api/axios/adminAPI";
import "./CustomerTable.scss";
import ReactPaginate from "react-paginate";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export default function CustomerTable() {
    const [users, setUsers] = useState([]);
    const [loadingAction, setLoadingAction] = useState({
        status: false,
        id: null,
    });
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const loadAllUsers = async () => {
        const res = await APIGetAllUser();
        console.log(res.data);
        setUsers(res.data);
    };
    useEffect(() => {
        loadAllUsers();
    }, []);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = users.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(users.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const blockUser = async (userId) => {
        try {
            setLoadingAction({
                id: userId,
                status: true,
            });
            const res = await APIBlockUser(userId);
            await loadAllUsers();
            console.log(res.data.message);
            toast.success("Block user success");
        } catch (e) {
            toast.error("Block user fail");
        } finally {
            setLoadingAction({
                id: null,
                status: false,
            });
        }
    };
    const unBlockUser = async (userId) => {
        try {
            setLoadingAction({
                id: userId,
                status: true,
            });
            const res = await APIUnBlockUser(userId);
            await loadAllUsers();
            console.log(res.data.message);
            toast.success("Unblock user success");
        } catch (e) {
            toast.error("Unblock user fail");
        } finally {
            setLoadingAction({
                id: null,
                status: false,
            });
        }
    };
    return (
        <div>
            <div className="customerTable">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="main-box no-header clearfix">
                                <div className="main-box-body clearfix">
                                    <div className="table-responsive">
                                        {users.length > 0 ? (
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
                                                    {currentItems?.map(
                                                        (user) => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <img
                                                                            src={
                                                                                user.avatar
                                                                                    ? user.avatar
                                                                                    : "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"
                                                                            }
                                                                            alt
                                                                        />
                                                                        <a
                                                                            href=""
                                                                            className="user-link"
                                                                        >
                                                                            {
                                                                                user.username
                                                                            }
                                                                        </a>
                                                                    </td>
                                                                    <td className="dateCreated">
                                                                        {
                                                                            user.createAt
                                                                        }
                                                                    </td>
                                                                    <td className="email">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </td>

                                                                    <td
                                                                        style={{
                                                                            width: "20%",
                                                                        }}
                                                                    >
                                                                        {loadingAction.status &&
                                                                        loadingAction.id ===
                                                                            user.id ? (
                                                                            <CircularProgress
                                                                                key={
                                                                                    user.id
                                                                                }
                                                                            />
                                                                        ) : user.enable ? (
                                                                            <button
                                                                                className="buttonBlock"
                                                                                onClick={() =>
                                                                                    blockUser(
                                                                                        user.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                Block
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                className="buttonUnblock"
                                                                                onClick={() =>
                                                                                    unBlockUser(
                                                                                        user.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                Unblock
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <LoadingAnimation />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="customerPagniate">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
}
