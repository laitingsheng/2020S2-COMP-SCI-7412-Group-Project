async function verifierDummy(fields) {
    return true
}

const verifiers = {
    DUMMY: verifierDummy,
    PASSPORT: verifierDummy,
    DRIVER_LICENCE: verifierDummy
}

Object.freeze(verifiers)

export default verifiers
