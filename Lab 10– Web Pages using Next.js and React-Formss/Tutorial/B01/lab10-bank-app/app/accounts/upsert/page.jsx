'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
// import accountsRepo from '@/app/repo/accounts-repo'

export default function AddOrEdit() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const accountToEdit = Object.fromEntries(searchParams.entries())

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const account = Object.fromEntries(formData)
        const url = `/api/accounts`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        }
        await fetch(url, options);
        // navigate to the home page
        router.push('/')

    }

    return (
        <>
            <h3>Add Account</h3>
            <form id="account-form" onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname"
                    defaultValue={accountToEdit.firstname} />

                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname" />

                <label htmlFor="acctType">Account Type</label>
                <select name="acctType" id="acctType" required>
                    <option value=""></option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                </select>

                <label htmlFor="balance">Balance</label>
                <input type="number" name="balance" id="balance" required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />

                <label htmlFor="dateOpened">Date Opened</label>
                <input type="date" name="dateOpened" id="dateOpened" />

                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" required>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>

                </select>

                <label htmlFor="profileImage">Profile Image URL</label>
                <input type="url" name="profileImage" id="profileImage" />

                <button type="Submit">Submit</button>
            </form>
        </>
    )
}