//@ts-ignore
import V86Starter from "../v86/libv86.js"

import {Mutex} from "async-mutex"
import {Terminal as XTerm} from "xterm"

export class Terminal {
    private prompt = "# "
    private mutex = new Mutex()
    private mutex2 = new Mutex()

    constructor(
        private id: number,
        private emulator: any,
        private options: { font?: string }
    ) {}

    attach(div: HTMLElement) {
        let term = new XTerm({
            fontFamily: this.options.font || "monospace",
        })
        term.open(div)
        term.onKey((key) => {
            this.send(key.key)
        })
        this.emulator.add_listener(
            `serial${this.id}-output-char`,
            (char: string) => {
                term.write(char)
            },
        )
    }

    async send(chars: string): Promise<void> {
        let bytes = []
        for (var i = 0; i < chars.length; i++) {
            bytes.push(chars.charCodeAt(i))
        }
        this.emulator.serial_send_bytes(this.id, bytes)
    }

    waitFor(chars: string): Promise<void> {
        return new Promise((resolve, _) => {
            let output = ""
            let listener = (char: string) => {
                if (char !== "\r") {
                    output += char
                }
                if (output.endsWith(chars)) {
                    this.emulator.remove_listener(
                        `serial${this.id}-output-char`,
                        listener,
                    )
                    resolve()
                }
            }
            this.emulator.add_listener(`serial${this.id}-output-char`, listener)
        })
    }

    async run(cmd: string): Promise<string> {
        await this.mutex2.acquire()
        let output = await this.runUnsafe(cmd)
        let exit_code = await this.runUnsafe("echo $?")
        this.mutex2.release()

        if (exit_code != "0") {
            throw new Error(`Command '${cmd}' exited with code '${exit_code}'`)
        }
        return output
    }

    runUnsafe(
        cmd: string,
        skip_one_prompt = false,
        echo_on = true,
    ): Promise<string> {
        return new Promise(async (resolve, _) => {
            await this.mutex.acquire()
            let startTime = Date.now()

            this.send(cmd + "\n")

            var output = ""
            var listener = (char: string) => {
                if (char !== "\r") {
                    output += char
                }

                if (output.endsWith(this.prompt)) {
                    if (skip_one_prompt) {
                        skip_one_prompt = false
                        return
                    }
                    this.emulator.remove_listener(
                        `serial${this.id}-output-char`,
                        listener,
                    )

                    // Remove prompt.
                    output = output.slice(0, -this.prompt.length)

                    if (echo_on) {
                        // Remove entered command.
                        output = output.slice(cmd.length + 1)
                    }

                    if (output.endsWith("\n")) {
                        output = output.slice(0, -1)
                    }

                    // Add timing information.
                    let endTime = Date.now()
                    let duration = endTime - startTime

                    resolve(output)
                    this.mutex.release()
                }
            }
            this.emulator.add_listener(`serial${this.id}-output-char`, listener)
        })
    }

    async setPrompt(prompt: string): Promise<void> {
        this.prompt = prompt
        await this.runUnsafe(`export PS1='${this.prompt}'`, true, true)
    }

    async cd(path: string): Promise<void> {
        await this.run(`cd ${path}`)
    }

    async script(cmds: string[]): Promise<void> {
        for (let cmd of cmds) {
            await this.run(cmd)
        }
    }

    async putFile(path: string, lines: string[]): Promise<void> {
        let escapedContent = lines.join("\n").replace(/'/g, "'\\''")
        await this.run(`echo '${escapedContent}' > ${path}`)
        return
    }

    //setKeyboardActive(active: boolean): void {
    //    this.emulator.keyboard_set_status(active)
    //}
}

export class LinuxBrowserShell {
    private emulator: any
    private terminals: Terminal[] = []

    private config: any = {
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 2 * 1024 * 1024,
        disable_mouse: true,

        // enable ttyS1-ttyS3
        uart1: true,
        uart2: true,
        uart3: true,
    }

    constructor(
        settings: {
            wasm: string
            bios: string
            vga_bios: string
            cdrom: string
            initial_state?: string
            font?: string
        },
        screen?: HTMLDivElement,
    ) {
        this.config["wasm_path"] = settings.wasm
        this.config["bios"] = {url: settings.bios}
        this.config["vga_bios"] = {url: settings.vga_bios}
        this.config["cdrom"] = {url: settings.cdrom}

        if (typeof settings.initial_state !== "undefined") {
            this.config["initial_state"] = {url: settings.initial_state}
        }

        if (screen) {
            console.log("Using provided screen")
            console.log(screen)
            let screenDiv = screen
            screenDiv.style.whiteSpace = "pre"
            screenDiv.style.fontFamily = "monospace"
            screenDiv.style.fontSize = "18px"
            screenDiv.style.lineHeight = "20px"

            let innerDiv = document.createElement("div")
            let canvas = document.createElement("canvas")
            canvas.style.display = "none"

            screenDiv.appendChild(innerDiv)
            screenDiv.appendChild(canvas)

            this.config["screen_container"] = screenDiv
        }

        this.emulator = new V86Starter(this.config)

        this.terminals = [
            new Terminal(0, this.emulator, { font: settings.font}),
            new Terminal(1, this.emulator, { font: settings.font}),
            new Terminal(2, this.emulator, { font: settings.font}),
            new Terminal(3, this.emulator, { font: settings.font}),
        ]
    }

    getTerminal(id: number): Terminal {
        if (id < 0 || id > 3) {
            throw new Error(`Terminal ID must be between 0 and 3, got ${id}`)
        }
        return this.terminals[id]
    }

    downloadState(filename: string = "linux-browser-shell-state.bin"): void {
        this.emulator.save_state().then((state: any) => {
            var a = document.createElement("a")
            a.download = filename
            a.href = window.URL.createObjectURL(new Blob([state]))
            a.dataset.downloadurl =
                "application/octet-stream:" + a.download + ":" + a.href
            a.click()
        })
    }

    boot(): Promise<void> {
        return new Promise((resolve, _) => {
            console.log("Booting")

            this.emulator.add_listener("emulator-loaded", () => {
                this.emulator.run()

                // Wait for the emulator to start, then resolve the promise.
                var interval = setInterval(async () => {
                    if (this.emulator.is_running()) {
                        clearInterval(interval)

                        // Set terminal width so that input lines don't wrap.
                        //await this.run_unsafe("stty cols 1000", false, true)

                        // By default HOME seems to be set to "/"?
                        //await this.runUnsafe("export HOME=/root")

                        resolve()
                    }
                }, 100)
            })
        })
    }
}
