import { Inter } from 'next/font/google'
import AccountsTable from './components/AccountsTable'
const inter = Inter({ subsets: ['latin'] })

import accountsRepo from '@/app/repo/accounts-repo'

export default async function Home() {
  // we will fetch the data here
  const accounts = await accountsRepo.getAccounts("All")

  // we will get the data
  // const accounts = 
  return (
    <AccountsTable IntialAccounts={accounts}/>
  )
}

