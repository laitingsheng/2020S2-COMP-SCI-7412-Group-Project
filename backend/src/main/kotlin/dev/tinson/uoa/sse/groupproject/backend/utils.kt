@file:JvmName("Utils")

package dev.tinson.uoa.sse.groupproject.backend

import java.io.InputStream

fun String.asResourceStream(): InputStream = javaClass.getResourceAsStream(this)
