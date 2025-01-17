import { GT } from "../index"

const AccountStatus = new GT.Enum({
  name: "AccountStatus",
  values: {
    LOCKED: { value: "locked" },
    ACTIVE: { value: "active" },
  },
})

export default AccountStatus
