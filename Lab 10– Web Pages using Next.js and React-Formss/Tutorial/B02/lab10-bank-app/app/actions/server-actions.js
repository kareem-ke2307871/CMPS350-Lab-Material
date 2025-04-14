'use server'
import accountsRepo from "@/app/repo/accounts-repo"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleAddOrUpdateAccountAction = async (formData) => {
    const account = Object.fromEntries(formData)
    console.log(account);

}
