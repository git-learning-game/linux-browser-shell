import {LinuxBrowserShell} from "linux-browser-shell"

const shell = new LinuxBrowserShell(
    {
        wasm: "./v86/v86.wasm",
        bios: "./v86/seabios.bin",
        vga_bios: "./v86/vgabios.bin",
        cdrom: "./v86/image.iso",
        initial_state: "./v86/initial-state.bin.zst",
        font: "monospace"
    },
    document.getElementById("screen"),
)

let tty0 = shell.getTerminal(0)
let tty1 = shell.getTerminal(1)

tty0.attach(document.getElementById("terminal0"))
tty1.attach(document.getElementById("terminal1"))

shell.boot().then(() => {
    console.log("Booted")
})

// Save state of the VM. You can then later load it using the `initial_state` setting.
document.getElementById("save").onclick = async function () {
    shell.downloadState()
}

// Demonstrate how to send commands to a Terminal.
// You can use this in the developer console, using `run("uname -a")` for example.
window.run = (cmd) => {
    tty0.run(cmd).then((res) => {
        console.log(res)
    })
}
