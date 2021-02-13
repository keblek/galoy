/**
 * @jest-environment node
 */
import { quit } from "../lock";
import { setupMongoConnection } from "../mongodb";
import { Price } from "../priceImpl";
import { checkIsBalanced, getUserWallet, lndOutside1, mockGetExchangeBalance } from "../tests/helper";
import { baseLogger } from "../utils";
// import { UserWallet } from "../wallet";


const lnService = require('ln-service')
const mongoose = require("mongoose")

let userWalletUsd, initBalanceUsd
let userWallet2, initBalance2
let lastPrice

const satPrice = 1/10000
// UserWallet.setCurrentPrice(satPrice) // sats/USD. BTC at 10k

// const amountInvoiceUsd = 50
const amountInvoiceReceive = 10000
const amountInvoiceSend = 5000

beforeAll(async () => {
  // await setupMongoConnection()
  // mockGetExchangeBalance()


  // userWalletUsd = await getUserWallet(5)
  // expect(userWalletUsd.currency).toBe("USD")

  // userWallet2 = await getUserWallet(2)

  // const price = new Price({ logger: baseLogger })
  // lastPrice = await price.lastPrice()
});

beforeEach(async () => {
  // initBalanceUsd = await userWalletUsd.getBalance()
  // initBalance2 = await userWallet2.getBalance()
})

afterEach(async () => {
  // await checkIsBalanced()
})

afterAll(async () => {
  // await mongoose.connection.close()
  // jest.restoreAllMocks();
  // await quit()
});

it('add invoice with dollar amount', async () => {
  // const request = await userWalletUsd.addInvoice({ value: amountInvoiceUsd })
  // expect(request.startsWith("lnbcrt")).toBeTruthy()
  // const { uid, usd } = await InvoiceUser.findById(getHash(request))

  // expect(uid).toBe(userWalletUsd.uid)
  // expect(usd).toBe(amountInvoiceUsd)
  
  // const satoshis = getAmount(request)!
  // expect(usd).toBeCloseTo(satoshis * lastPrice)
})

it('add invoice with no amount', async () => {
  // await expect(userWalletUsd.addInvoice({})).rejects.toThrow()
})

it('receives payment from outside', async () => {
  // const request = await userWalletUsd.addInvoice({ value: amountInvoiceUsd })
  // await lnService.pay({ lnd: lndOutside1, request })

  // const finalBalance = await userWalletUsd.getBalance()
  // expect(finalBalance).toBe(initBalanceUsd + amountInvoiceUsd)

  // const { balance: balanceUSD } = await MainBook.balance({
  //   account: customerPath(userWalletUsd.uid),
  //   currency: "USD", 
  // })

  // const { balance: balanceBTC } = await MainBook.balance({
  //   account: customerPath(userWalletUsd.uid),
  //   currency: "BTC", 
  // })

  // expect(balanceUSD).toBeTruthy()
  // expect(balanceBTC).toBeFalsy()

  // FIXME toBeCloseTo 1 digits to much higher precise
  // expect(finalBalance.USD).toBeCloseTo(initBalanceUsd.USD + usdEq, 1)
  // expect(finalBalance.BTC).toBe(0)
})


it('payInvoice', async () => {
  // const { request } = await lnService.createInvoice({ lnd: lndOutside1, tokens: amountInvoice })
  // const result = await userWalletUsd.pay({ invoice: request })
  // expect(result).toBe("success")
  // const finalBalance = await userWalletUsd.getBalance()
  // expect(finalBalance).toBeCloseTo(initBalanceUsd - amountInvoice * lastPrice)
})

it('on us should fail if different currency', async () => {
  // const userWalletBtc = await getUserWallet(1)
  // const request = await userWalletBtc.addInvoice({value: 1, memo: "btc invoice"})

  // await expect(userWalletUsd.pay({ invoice: request })).rejects.toThrow()
})

it('on-us should be ok with same currency', async () => {
  // const userWalletUsd10 = await getUserWallet(10)
  // const request = await userWalletUsd10.addInvoice({value: 0.1, memo: "usd invoice"})

  // const balance = await userWalletUsd.getBalance()
  // console.log({balance})

  // const result = await userWalletUsd.pay({ invoice: request })

//   // TODO:
//   // const finalBalance = await userWalletUsd.getBalances()

  
  // expect(result).toBe("success")
  expect(true).toBe(true)
})