package dev.tinson.uoa.sse.groupproject.backend

import com.google.firebase.cloud.FirestoreClient
import dev.tinson.uoa.sse.groupproject.backend.verifier.Verifiers
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.lang.IllegalArgumentException

@SpringBootApplication
@RestController
class BackendApplication {
    private val logger = LoggerFactory.getLogger(BackendApplication::class.java)
    private val users = FirestoreClient.getFirestore().collection("users")

    @PostMapping("/verify/{id}")
    fun verify(@PathVariable id: String) {
        val user = users.document(id)
        val snapshot = user.get().get()
        if (snapshot.exists()) {
            val score = user.collection("documents").listDocuments().fold(0) { acc, reference ->
                val document = reference.get().get()
                val verifier = Verifiers.values().find { it.name == document.id }
                if (verifier !== null && verifier(document))
                    acc + verifier.worth
                else {
                    if (verifier === null)
                        logger.info("$id contains unknown document type ${document.id}")
                    acc
                }
            }
            val oldScore = snapshot.get("score", Int::class.java)
            if (oldScore === null || oldScore != score)
                user.update("score", score)
        } else
            logger.info("$id not exists")
    }
}
