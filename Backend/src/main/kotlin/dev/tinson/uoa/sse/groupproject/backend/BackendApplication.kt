@file:JvmName("Main")

package dev.tinson.uoa.sse.groupproject.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RequestMapping

@SpringBootApplication
class BackendApplication {
    @RequestMapping("/verify")
    fun verify(): Boolean = false
}

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args)
}
