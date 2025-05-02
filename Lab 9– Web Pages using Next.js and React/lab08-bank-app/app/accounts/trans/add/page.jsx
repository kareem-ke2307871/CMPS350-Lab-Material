import React from 'react'

export default function AddTransaction() {
  return (
    <>
    <h3>Add Transaction</h3>
<form id="trans-form">
    <label htmlFor="accountNo">Account No</label>
    <select name="accountNo" id="accountNo" required>
        <option></option>
    </select>
    
    <label htmlFor="type">Transaction Type</label>
    <select name="transType" id="transType" required>
        <option></option>
        <option value="Deposit">Deposit</option>
        <option value="Withdraw">Withdraw</option>
    </select>

    <label htmlFor="amount">Amount</label>
    <input type="number" id="amount" name="amount" required/>
    <button type="Submit">Submit</button>
</form>
</>
  )
}
