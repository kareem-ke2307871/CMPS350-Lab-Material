'use client'
import { React, useState } from 'react'


export default function AccountsTable({ initialAccounts }) {

    const [accounts, setAccounts] = useState(initialAccounts)
    // localhost:3000/accounts/AC9mVA
    async function handleLoadAccounts(type) {
        const BASE_URL = `http://localhost:3000/api/accounts?type=${type}`;
        const response = await fetch(BASE_URL);
        const filteredAccounts = await response.json();
        console.log(filteredAccounts)
        setAccounts(filteredAccounts);
        // accounts = filteredAccounts

    }
    return (
        <>
            <label htmlFor="acctType">
                Account Type
            </label>
            <select id="acctType" onChange={e => handleLoadAccounts(e.target.value)} className={"filter-dropdown"}>
                <option value="All">All</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
            </select>
            <table id="accounts">
                <thead>
                    <tr>
                        <th>Profile Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Account No</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Email</th>
                        <th>Date Opened</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(acct => <tr id={"row-" + acct.accountNo}>
                        <td><img src={acct.profileImage} alt="Profile Image" class="profile-pic" /></td>
                        <td>{acct.firstname}</td>
                        <td>{acct.lastname}</td>
                        <td>{acct.gender}</td>
                        <td>{acct.accountNo}</td>
                        <td>{acct.acctType}</td>
                        <td>{acct.balance} QR</td>
                        <td>{acct.email}</td>
                        <td>{acct.dateOpened}</td>
                        <td>
                            {acct.balance >= 0 ?
                                <button onclick="handleDeleteAccount('${acct.accountNo}')" class="btn-delete">
                                    <i class="fas fa-trash">Delete</i>
                                </button> : ''}
                            <button onclick="handleEditAccount('${acct.accountNo}')" class="btn-edit">
                                <i class="fas fa-edit">Edit</i>
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
