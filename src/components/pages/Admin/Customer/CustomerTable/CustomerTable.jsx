import React, { useEffect, useState, useRef, useCallback } from "react";
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
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const observer = useRef();

    const lastItemRef = useCallback(
        (node) => {
            if (loading || isLastPage) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
            },
        [loading, isLastPage]
    );

    useEffect(() => {
        setLoading(true);
        APIGetAllUser(page)
        .then(res => {
            if(res.data.length === 0) {
                setIsLastPage(true)
            } else {
                setUsers((curUsers) => [...curUsers, ...res.data]);
            }
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
        })
    }, [page]);

    const [loadingAction, setLoadingAction] = useState({
        status: false,
        id: null,
    });

    const blockUser = async (userId) => {

        try {
            setLoadingAction({
                id: userId,
                status: true,
            });
            const res = await APIBlockUser(userId);

            const index = users.findIndex((user) => user.id === userId)
            if (index !== -1) {
                const newUsers = [...users];
                newUsers[index] = { ...users[index], enable: false };
                setUsers(newUsers);
            }

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

            const index = users.findIndex((user) => user.id === userId)
            if (index !== -1) {
                const newUsers = [...users];
                newUsers[index] = { ...users[index], enable: true };
                setUsers(newUsers);
            }

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
    <>
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
                                            {
                                                users.map((user, index) => {
                                                    if(users.length === index + 1) {
                                                        return <tr key={user.id} ref={lastItemRef}>
                                                                <td>
                                                                    <img
                                                                    className="rounded"
                                                                    src={user.avatar || '../img/avatar/default.jpg'}
                                                                    alt={user.username}
                                                                    style={{ width: 50, height: 50 }}
                                                                    />
                                                                    <a href className="user-link">
                                                                    {user.username}
                                                                    </a>
                                                                </td>
                                                                <td className="dateCreated">{user.createAt}</td>
                                                                <td className="email">{user.email}</td>
                                                                <td style={{ width: "20%" }}>
                                                                {
                                                                    user.enable ? (
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
                                                                        )
                                                                }
                                                                </td>
                                                            </tr>
                                                    } else {
                                                        return <tr key={user.id}>
                                                                <td>
                                                                    <img
                                                                    className="rounded"
                                                                    src={user.avatar || '../img/avatar/default.jpg'}
                                                                    alt={user.username}
                                                                    style={{ width: 50, height: 50 }}
                                                                    />
                                                                    <a href className="user-link">
                                                                    {user.username}
                                                                    </a>
                                                                </td>
                                                                <td className="dateCreated">{user.createAt}</td>
                                                                <td className="email">{user.email}</td>
                                                                <td style={{ width: "20%" }}>
                                                                {
                                                                    user.enable ? (
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
                                                                        )
                                                                }
                                                                </td>
                                                            </tr>
                                                    }
                                                })
                                            }

                                            {
                                                loading 
                                                && 
                                                <LoadingAnimation />
                                            }
                                            {error && <div>Error loading items.</div>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
