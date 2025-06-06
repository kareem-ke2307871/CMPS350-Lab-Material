import Link from 'next/link'
import React from 'react'
import { deleteAccountAction } from '../actions/server-actions'

export default function AccountRow({ acct, onDeleteAccount }) {
    return (
        <tr id={"row-" + acct.accountNo}>
            <td><img
                src={acct.profileImage}
                alt="Profile Image"
                className="profile-pic" />
            </td>
            <td>{acct.firstname}</td>
            <td>{acct.lastname}</td>
            <td>{acct.gender}</td>
            <td>{acct.accountNo}</td>
            <td>{acct.acctType}</td>
            <td>{acct.balance} QR</td>
            <td>{acct.email}</td>
            <td>{acct.dateOpened}</td>
            <td>
                <form action={deleteAccountAction}>
                    <input type="text" name="accountNo" defaultValue={acct.accountNo} hidden />
                    {acct.balance >= 0 ?
                        <button className="btn-delete" type='submit'>
                            <i className="fas fa-trash">Delete</i>
                        </button> : ''}
                </form>

                <Link href={
                    {
                        pathname: '/accounts/upsert',
                        query: acct
                    }
                }>
                    <button className="btn-edit">
                        <i className="fas fa-edit">Edit</i>
                    </button>
                </Link>
            </td>
        </tr>
    )
}
