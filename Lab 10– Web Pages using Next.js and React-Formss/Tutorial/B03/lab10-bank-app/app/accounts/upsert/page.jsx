'use client'
import { useRouter } from 'next/navigation';
import React from 'react'



export default function AddOrEdit() {

    const router = useRouter();

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

        router.push('/')

    }


    return (
        <>
            <h3>Add Account</h3>
            <form id="account-form" onSubmit={handleSubmit}>
                <label for="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname" />

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
