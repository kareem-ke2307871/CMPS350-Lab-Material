// npm i fs-extra
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


class AccountsRepo {
    constructor() {
        this.accountsFilePath = path.join(process.cwd(), 'app/data/accounts.json')
        this.transFilePath = path.join(process.cwd(), 'app/data/transactions.json')
    }

    async getAccounts(type) {
        // console.log('account type is', type.toLowerCase());


        let accounts = []
        if (type && (type.toLowerCase() == 'saving' || type.toLowerCase() == 'current')) {
            console.log('getting accounts of type', type);

            accounts = await prisma.account.findMany({
                where: {
                    acctType: type
                }
            })

        }
        else
            accounts = await prisma.account.findMany()
        // console.log('the accounts are', accounts)
        return accounts;

    }
    async addAccount(account) {


        return prisma.account.create({
            data: account
        })
        // update the missing information of the account object
    }

    async updateAccount(accountNo, account) {
        console.log(account);

        await prisma.account.update({
            where: { accountNo },
            data: account
        })

        const accounts = await fs.readJson(this.accountsFilePath)
        const index = accounts.findIndex(acc => acc.accountNo == accountNo)
        if (index >= 0) {
            accounts[index] = account
            await fs.writeJson(this.accountsFilePath, accounts)
            return "updated successfully"
        }
        return "Unable to update account because it does not exist"
    }

    async getAccount(accountNo) {
        return prisma.account.findUnique({
            where: { accountNo }
        })
    }

    async deleteAccount(accountNo) {
        const count = await prisma.account.delete({
            where: { accountNo }
        })
        console.log(count);

        if (count <= 0) return "Account not found"
        return "Deleted successfully"
    }

    async getTransactions(accountNo) {
        return prisma.transaction.findMany({
            where: { accountNo }
        })
    }

    async addTransaction(accountNo, transaction) {
        // accountNo = transaction.accountNo
        // update the missing information of the transaction object
        transaction.accountNo = accountNo
        transaction.amount = parseInt(transaction.amount.toString());

        try {
            const accounts = await this.getAccounts();
            const account = accounts.find(account => account.accountNo == accountNo);
            if (transaction.transType == 'Deposit')
                account.balance += transaction.amount;
            else if (transaction.transType == 'Withdraw')
                if (account.balance < transaction.amount)
                    return "Insufficient balance";
                else
                    account.balance -= transaction.amount;

            // update the account
            this.updateAccount(account.accountNo, account)

            // update the transaction file
            transaction.accountBalance = account.balance

            await prisma.transaction.create({
                data: transaction
            })

            return { message: 'transaction successful' }
        } catch (err) {
            throw err;
        }
    }

}

export default new AccountsRepo()