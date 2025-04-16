'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import accountsRepo from '@/app/repo/accounts-repo';

export async function addOrEditAccountAction(formData) {
    const account = Object.fromEntries(formData);
    if (account.accountNo !== '') {
        await accountsRepo.updateAccount(account.accountNo, account);
    } else {
        await accountsRepo.addAccount(account);
    }


    redirect('/')
}