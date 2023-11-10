export interface Address {
  streetName: string
  postalCode: string
  apartmentNumber: number
  state: string
  country: string
}

//Adds localId field to Address type. This field is used for rendering/editing the addresses.
export interface AddressWithId extends Address {
  localId?: string
}