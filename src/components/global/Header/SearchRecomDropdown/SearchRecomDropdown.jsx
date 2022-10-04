import React from 'react'
import { Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function SearchRecomDropdown({ searchRecom, setSearchRecom }) {
    const navigate = useNavigate();

    const SearchDropdownClick = (seriesId) => {
        setSearchRecom([]);
        navigate(
            `/details/${seriesId}`
        );
    };

    return (
        <div className="hearder__search__recom_dropdown">
            <Table responsive="xl" borderless='false' hover>
                <tbody>
                    {searchRecom.map((recomItem, index) => {
                        return (
                            <tr key={index} onClick={() => SearchDropdownClick(recomItem.id)}>
                                <td><span className="icon_search" /></td>
                                <td>{recomItem.seriesName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default SearchRecomDropdown
