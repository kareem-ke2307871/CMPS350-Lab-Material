'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import accountsRepo from '@/app/repo/accounts-repo';

export async function addOrEditAccountAction(formData) {
    const account = Object.fromEntries(formData);
    await accountsRepo.addAccount(account);
    redirect('/')
}