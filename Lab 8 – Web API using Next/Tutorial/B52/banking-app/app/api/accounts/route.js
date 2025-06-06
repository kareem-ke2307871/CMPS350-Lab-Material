import accountRepo from '@/app/repo/account-repo'
export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')

    const accounts = await accountRepo.getAccounts(type)
    return Response.json(accounts, { status: 200 })
}

export async function POST(req) {
    const account = await req.json()
    const newAccount = await accountRepo.createAccount(account)
    return Response.json(newAccount, { status: 201 })
}
