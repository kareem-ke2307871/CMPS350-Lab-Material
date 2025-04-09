'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'




export default function AddOrEdit() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [account, setAccount] = useState(Object.fromEntries(searchParams.entries() || {}))


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        // http://localhost:3000
        let url = '/api/accounts';
        let method = 'POST';

        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        router.push('/', undefined, { shallow: true });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
        console.log({ ...account, [name]: value });

    }

    return (
        <>
            {account.accountNo ? <h3>Edit Account</h3> : <h3>Add Account</h3>}


            <form id="account-form" onSubmit={handleSubmit}>
                <label for="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname" value={account.firstname} onChange={handleChange} />

                <label for="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname" />

                <label for="acctType">Account Type</label>
                <select name="acctType" id="acctType" required>
                    <option value=""></option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <label for="balance">Balance</label>
                <input type="number" name="balance" id="balance" required />

                <label for="email">Email</label>
                <input type="email" name="email" id="email" />

                <label for="dateOpened">Date Opened</label>
                <input type="date" name="dateOpened" id="dateOpened" />

                <label for="gender">Gender</label>
                <select name="gender" id="gender" required>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label for="profileImage">Profile Image URL</label>
                <input type="url" name="profileImage" id="profileImage" />

                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
