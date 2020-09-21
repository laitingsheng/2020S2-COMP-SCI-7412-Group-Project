const verifierDummy = (fields) => {
    return new Promise(() => { return true })
}

const verifierPassport = verifierDummy
const verifierDriverLicence = verifierDummy

const verifiers = {
    DUMMY: verifierDummy,
    PASSPORT: verifierPassport,
    DRIVER_LICENCE: verifierDriverLicence
}

export default verifiers
