package dev.tinson.uoa.sse.groupproject.backend.verifier

import com.google.cloud.firestore.DocumentSnapshot

enum class Verifiers : Verifier {
    DUMMY {
        override val worth = 0
        override fun invoke(fields: DocumentSnapshot): Boolean = true
    },
    PASSPORT {
        override val worth = 40
        override fun invoke(fields: DocumentSnapshot): Boolean = true
    },
    DRIVER_LICENCE {
        override val worth = 20
        override fun invoke(fields: DocumentSnapshot): Boolean = true
    }
}
