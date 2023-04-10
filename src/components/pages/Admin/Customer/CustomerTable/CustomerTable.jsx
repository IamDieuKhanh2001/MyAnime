import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    APIBlockUser,
    APIGetAllUser,
    APIUnBlockUser,
} from "../../../../../api/axios/adminAPI";
import "./CustomerTable.scss";
import LoadingAnimation from "../../../../global/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { DropdownButton, Form, FormControl, InputGroup } from "react-bootstrap";
import Dropdown from "@restart/ui/esm/Dropdown";
import { debounce } from "lodash";

export default function CustomerTable() {
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    //sort user
    const [mode, setMode] = useState('FindAll') //FindAll, FindByUsername 
    const [searchUsername, setSearchUsername] = useState('');

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

    const handleSearchChange = (event) => {
        const newSearchText = event.target.value;
        setSearchUsername(newSearchText);
    };

    //Thay đổi chế độ dựa trên searchUsername có được gán giá trị chưa 
    useEffect(() => {
        if (searchUsername === '') {
            setUsers([])
            setMode('FindAll')
            console.log('empty name')
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            // Thực hiện tìm kiếm với searchText khi người dùng nhập vào usernmae
            toast.success(`Searching for ${searchUsername}...`)
            setUsers([])
            setPage(-1) //Khi TH đang trang 1 mà đổi mode, sẽ không thể gọi data do giá trị page = 1 vẫn giữ nguyên
            setMode('FindByUsername')
        }, 1500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchUsername]);

    // //Khi đã Thay đổi chế độ
    useEffect(() => {
        //Reset lại state
        setError(false)
        setPage(1)
        setLoading(false)
        setIsLastPage(false)
    }, [mode]);

    // //Thay đổi data khi page đổi
    useEffect(() => {
        setLoading(true);
        if (page > 0) {
            if (mode === 'FindByUsername') {
                APIGetAllUser(page, searchUsername)
                    .then(res => {
                        if (res.data.length === 0) {
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
            } else {
                APIGetAllUser(page)
                    .then(res => {
                        if (res.data.length === 0) {
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
            }
        }
    }, [page]);

    return (
        <>
            <div className="customerTable">
                <div className="container">
                    {/* sort user */}
                    <Form>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search users"
                                aria-label="Search users"
                                aria-describedby="basic-addon2"
                                value={searchUsername}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </Form>

                    {/* end sort user */}

                    {/* <CustomerRow
                        users={users}
                        setUsers={setUsers}
                        isLastPage={isLastPage}
                        setPage={setPage}
                        loading={loading}
                        error={error}
                    /> */}
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
                                                        if (users.length === index + 1) {             //Set watcher flag for last current page
                                                            return <tr key={user.id} ref={lastItemRef}>
                                                                <td>
                                                                    <img
                                                                        className="rounded"
                                                                        src={user.avatar || '../img/avatar/default.jpg'}
                                                                        alt={user.username}
                                                                        style={{ width: 50, height: 50 }}
                                                                    />
                                                                    <a className="user-link">
                                                                        {user.username}
                                                                    </a>
                                                                </td>
                                                                <td className="dateCreated">{user.createAt}</td>
                                                                <td className="email">{user.email}</td>
                                                                <td style={{ width: "20%" }}>
                                                                    {loadingAction.status && loadingAction.id === user.id ?
                                                                        (
                                                                            //Animation loading when click block
                                                                            <React.Fragment>
                                                                                <BeatLoader
                                                                                    speedMultiplier={0.8}
                                                                                    margin={0}
                                                                                    size={11}
                                                                                    color="#fff"
                                                                                />
                                                                            </React.Fragment>
                                                                        ) : (
                                                                            // Display button block
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
                                                                    <a className="user-link">
                                                                        {user.username}
                                                                    </a>
                                                                </td>
                                                                <td className="dateCreated">{user.createAt}</td>
                                                                <td className="email">{user.email}</td>
                                                                <td style={{ width: "20%" }}>
                                                                    {loadingAction.status && loadingAction.id === user.id ?
                                                                        (
                                                                            //Animation loading when click block
                                                                            <React.Fragment>
                                                                                <BeatLoader
                                                                                    speedMultiplier={0.8}
                                                                                    margin={0}
                                                                                    size={11}
                                                                                    color="#fff"
                                                                                />
                                                                            </React.Fragment>
                                                                        ) : (
                                                                            // Display button block
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
                                                                        )
                                                                    }
                                                                </td>
                                                            </tr>
                                                        }
                                                    })
                                                }

                                                {/* {
                                                    loading
                                                    &&
                                                    <LoadingAnimation />
                                                } */}
                                                {error &&
                                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong>Connection error!</strong>
                                                        <hr></hr>
                                                        Can not connect to server, check your connection and try again!!.
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                }
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
