import {expect, test} from "vitest"
import WebShell from "./index.ts"
let shell = new WebShell()

test("run a simple command", async () => {
    await shell.boot()

    const result = await shell.run("echo hello")
    expect(result).toBe("hello")
})

test("run two interleaved commands", async () => {
    await shell.boot()

    let commands = [shell.run("sleep 0.5; echo hello"), shell.run("echo world")]
    const result = await Promise.all(commands)
    expect(result).toEqual(["hello", "world"])
})

test("run a command with a long output", async () => {
    await shell.boot()

    const lorem =
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

    const result = await shell.run(`echo "${lorem}"`)

    expect(result).toBe(lorem)
})

test("send a file", async () => {
    await shell.boot()

    await shell.putFile("/tmp/test.txt", ["hello", "world"])
    const result = await shell.run("cat /tmp/test.txt")

    expect(result).toBe("hello\nworld")
})
