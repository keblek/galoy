import { LightningMixin } from "./Lightning";
import { disposer } from "./lock";
import { Faucet, User } from "./mongodb";
import { OnChainMixin } from "./OnChain";
import { ILightningWalletUser, OnboardingEarn } from "./types";
import { UserWallet } from "./wallet";
import { getFunderWallet } from "./walletFactory";
const using = require('bluebird').using

/**
 * this represents a user wallet
 */
export class LightningUserWallet extends OnChainMixin(LightningMixin(UserWallet)) {
  
  constructor(args: ILightningWalletUser) {
    super({ ...args })
  }

  async addEarn(ids) {

    const lightningFundingWallet = await getFunderWallet({ logger: this.logger })
    const result: object[] = []

    return await using(disposer(this.user._id), async (lock) => {

      for (const id of ids) {
        const amount = OnboardingEarn[id]

        const userPastState = await User.findOneAndUpdate(
          { _id: this.user._id },
          { $push: { earn: id } },
          { upsert: true }
        )

        if (userPastState.earn.findIndex(item => item === id) === -1) {

          const invoice = await this.addInvoice({memo: id, value: amount})
          await lightningFundingWallet.pay({invoice, isReward: true})
        }

        result.push({ id, value: amount, completed: true })
      }

      return result
    })
  }

  async faucet(hash) {
    let success, message

    const faucetPastState = await Faucet.findOneAndUpdate(
      { hash },
      { used: true },
    )

    if (!faucetPastState) {
      success = false 
    } else {
      if (faucetPastState.used === false) {
        const lightningFundingWallet = await getFunderWallet({ logger: this.logger })

        // TODO: currency conversion if faucetPastState.currency === "USD"

        const invoice = await this.addInvoice({memo: `faucet-${hash}`, value: faucetPastState.amount})
        await lightningFundingWallet.pay({invoice, isReward: true})
        
        success = true
        message = faucetPastState.message
      } else {
        success = false
      }
    }

    return {success, message}
  }

}