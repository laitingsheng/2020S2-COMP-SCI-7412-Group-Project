import { Verify } from "crypto"

export type Verifier = (fields: any) => Promise<boolean>

const verifierDummy: Verifier = (fields) => {
    return new Promise(() => { return true })
}

const verifierPassport: Verifier = verifierDummy
const verifierDriverLicence: Verifier = verifierDummy

const verifiers = {
    DUMMY: verifierDummy,
    PASSPORT: verifierPassport,
    DRIVER_LICENCE: verifierDriverLicence
}

export default verifiers
