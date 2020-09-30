@file:JvmName("Main")

package dev.tinson.uoa.sse.groupproject.backend

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.springframework.boot.runApplication
import org.springframework.core.io.DefaultResourceLoader

fun main(args: Array<String>) {
    FirebaseApp.initializeApp(FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(DefaultResourceLoader().getResource("classpath:firebase-admin.json").inputStream)).build())

    runApplication<BackendApplication>(*args)
}
