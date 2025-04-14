'use client'
import React, { useEffect, useState } from 'react'


export default function Transactions() {
    const [accounts, setAccounts] = useState([])
    // let accounts = []
    async function getAccounts() {
        const response = await fetch('/api/accounts')
        const data = await response.json()
        setAccounts(data)
    }

    useEffect(() => {
        getAccounts()
    }, [])


    return (
        <>
            <h3>Add Transaction</h3>
            <form id="trans-form">
                <label htmlFor="accountNo">Account No</label>
                <select name="accountNo" id="accountNo" required>
                    {accounts.map((acct, index) =>
                        <option key={index}
                            value={acct.accountNo}>
                            {acct.accountNo} - {acct.firstname} {acct.lastname} - {acct.balance} QR
                        </option>
                    )}

                </select>

                <label htmlFor="type">Transaction Type</label>
                <select name="transType" id="transType" required>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" required />
                <button type="Submit">Submit</button>
            </form>
        </>
    )
}
