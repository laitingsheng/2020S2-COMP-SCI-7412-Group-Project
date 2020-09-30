@file:JvmName("Main")

package dev.tinson.uoa.sse.groupproject.backend

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.springframework.boot.runApplication

fun main(args: Array<String>) {
    FirebaseApp.initializeApp(FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream("/firebase-admin.json".asResourceStream())).build())

    runApplication<BackendApplication>(*args)
}
