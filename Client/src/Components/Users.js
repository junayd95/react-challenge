import React from 'react';
import UserCard from './UserCard'
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import TopMenu from '../Menu/TopMenu';
import { useState } from 'react';

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

function Users({searchValue}) {

    // all user are displaying from here

    //Passing query to useQuery hook to fetch data
    const { data, loading, error, networkStatus } = useQuery(ALL_USERS, { fetchPolicy: "cache-and-network" })
    const [detail, setDetail] = useState([])
        // console.log("data here in users.js : ", data);

    if (networkStatus === NetworkStatus['refetch'])
        return 'Refetching!';
    else if (loading)
        return 'Loading..';
    else if (error)
        {console.log("here after network error => ", error)
        return `Error! ${error}`;
}else if (data)
      { 
        return (

            <div className="is-scrollable-list">

                {data ? data.getAllUsers.map((item) =>{
                // console.log("item =>", item.firstName, searchValue, item.firstName.includes(searchValue))

                return (
                    item.firstName.toLowerCase().includes(searchValue) || item.lastName.toLowerCase().includes(searchValue) ? <UserCard
                        key={item.id}
                        item={item}
                    />: null
                )} ) : 'Users list undefined...'}
              
            </div>
        )
                }
}

export default Users;