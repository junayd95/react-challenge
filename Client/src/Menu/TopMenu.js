import React from 'react'
import logohere from '../Images/logohere.png'
import { useState } from 'react';

//search bar is placed here

import { useQuery, gql, NetworkStatus } from '@apollo/client';

const ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      email
      password
    }
  }
`;


function TopMenu({setSearchValue}) {
    const { data, loading, error, networkStatus } = useQuery(ALL_USERS, { fetchPolicy: "cache-and-network" })
    const [searchTerm, setSearchTerm] = useState('')

    if (networkStatus === NetworkStatus['refetch'])
        return 'Refetching!';
    else if (loading)
        return 'Loading..';
    else if (error)
        return `Error! ${error}`;
    else if (data)
    return (
        <div className="top-menu is-shadow-2">
            <div className="menu-logo-container">
                <img className="menu-logo" src={logohere} alt="Logo" />
            </div>
            <div>
                <input
                    className="search-field"
                    placeholder="Search here...."
                    autoComplete="off"
                    onChange={event => {
                        setSearchValue(event.target.value);
                    }}
                />

                {data.getAllUsers.filter((val) => {
                    if (searchTerm == "") {
                        return val
                    } else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || val.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        // console.log(val) to check search bar is working or not
                        return val
                    }
                })
                .map((val) => {
                    // console.log(val.firstName + " " + val.lastName)
                    // this.props.parentCallback(val.firstName,val.lastName)
                    // const TopMenu = (props) => {
                    //     return (
                    //         <div onClick={() => props.handleClick(props.val)}>
                    //             <p> {props.val.firstName} </p>
                    //             <p> {props.val.lastName} </p>
                    //         </div>
                    //     );
                    // }

                    // sendData = () =>{
                    //     this.props.parentCallback(val.firstName)
                    //     this.props.parentCallback(val.lastName)
                    // }
                   
                    // first_name = val.firstName
                    // last_name = val.lastName
                    // console.log(first_name + " " + last_name)
                    // first name and last name received here , now values will be sent from here to app js
                })}

            </div>
        </div>
    );
}

export default TopMenu;