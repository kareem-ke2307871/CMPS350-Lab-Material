'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddOrEdit() {
    const [account, setAccount] = useState({})
    const router = useRouter()
    function handleChange(e) {
        setAccount(
            { ...account, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const url = '/api/accounts'
        const method = 'POST'

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        }
        await fetch(url, options)
        router.push('/', undefined, { shallow: true })

    }

    return (
        <>
            <h3>Add Account</h3>
            {JSON.stringify(account)}
            <form id="account-form" onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname" onChange={handleChange} />

                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname" onChange={handleChange} />

                <label htmlFor="acctType">Account Type</label>
                <select name="acctType" id="acctType" required onChange={handleChange}>
                    <option value=""></option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <label htmlFor="balance">Balance</label>
                <input type="number" name="balance" id="balance" required onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} />

                <label for="dateOpened">Date Opened</label>
                <input type="date" name="dateOpened" id="dateOpened" onChange={handleChange} />

                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" required onChange={handleChange}>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="profileImage">Profile Image URL</label>
                <input type="url" name="profileImage" id="profileImage" onChange={handleChange} />

                <button type="Submit">Submit</button>
            </form>
        </>
    )
}