package dev.tinson.uoa.sse.groupproject.backend.verifier

import com.google.cloud.firestore.DocumentSnapshot

interface Verifier {
    val worth: Int
    operator fun invoke(fields: DocumentSnapshot): Boolean
}
