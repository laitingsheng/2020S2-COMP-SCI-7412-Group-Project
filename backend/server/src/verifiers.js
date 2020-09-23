function verifierDummy(fields) {
    return new Promise(() => { return true })
}

const verifiers = {
    DUMMY: verifierDummy,
    PASSPORT: verifierDummy,
    DRIVER_LICENCE: verifierDummy
}

export default verifiers
