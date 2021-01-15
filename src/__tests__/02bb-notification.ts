import { sendBalanceToUser } from "../dailyBalanceNotification";
import { customerPath } from "../ledger";
import { quit } from "../lock";
import { MainBook, setupMongoConnection, User, Transaction } from "../mongodb";
import { Price } from "../priceImpl";
import { baseLogger } from "../utils";
import { WalletFactory, getFunderWallet } from "../walletFactory";
import { getUserWallet } from "../tests/helper";
jest.mock('../notification')
const { sendNotification } = require("../notification")
let price

beforeAll(async () => {
  await setupMongoConnection()
  price = await new Price({ logger: baseLogger }).lastPrice()
})


afterAll(async () => {
  await quit()
  jest.restoreAllMocks();
});

it('sends daily balance notification', async () => {
  await sendBalanceToUser()
  const numActiveUsers = (await getActiveUsers()).length
  expect(sendNotification.mock.calls.length).toBe(numActiveUsers)
  for (const [call] of sendNotification.mock.calls) {
    const { balance } = await MainBook.balance({ accounts: customerPath(call.uid) })
    expect(call.body).toBe(`Your balance is \$${price * -balance} (${-balance} sats)`)
  }
})

it('tests isUserActive', async () => {
  await getUserWallet(8)

  const initialActiveUsers = await getActiveUsers()
  const userWallet0AccountPath = (await getUserWallet(0)).accountPath
  const funderWalletAccountPath = (await getFunderWallet({ logger: baseLogger })).accountPath
  
  //user0 and funder wallet are active users
  expect(initialActiveUsers.length).toBe(2)
  expect(initialActiveUsers.indexOf(userWallet0AccountPath)).toBeGreaterThan(-1)
  expect(initialActiveUsers.indexOf(funderWalletAccountPath)).toBeGreaterThan(-1)

  for (const activeUserAccountPath of initialActiveUsers) {
    await Transaction.updateMany({ accounts: activeUserAccountPath }, { "$set": { "timestamp": new Date(Date.now() - (31 * 24 * 60 * 60 * 1000)) } })
  }
  const finalNumActiveUsers = (await getActiveUsers()).length
  expect(finalNumActiveUsers).toBe(0)
})

const getActiveUsers = async (): Promise<Array<string>> => {
  const users = await User.find({})
  const activeUsers: Array<string> = []
  for (const user of users) {
    const userWallet = await WalletFactory({ user, uid: user._id, currency: user.currency, logger: baseLogger })
    if (await userWallet.isUserActive()) {
      activeUsers.push(userWallet.accountPath)
    }
  }
  return activeUsers
}

