import { GT } from "../index"

const Coordinates = new GT.Object({
  name: "Coordinates",
  fields: () => ({
    longitude: {
      type: GT.NonNull(GT.Float),
    },
    latitude: {
      type: GT.NonNull(GT.Float),
    },
  }),
})

export default Coordinates
