import React from 'react'

export default function NavBar() {
    return (
        <nav>
            <ul className="navbar-nav">
                <li>Alpha Bank</li>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/accounts/upsert">Add Account</a>
                </li>
                <li>
                    <a href="/accounts/trans/add">Add Transaction</a>
                </li>
            </ul>
        </nav>
    )
}
