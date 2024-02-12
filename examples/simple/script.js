import LinuxBrowserShell from "linux-browser-shell"

const shell = new LinuxBrowserShell(
    {
        wasm: "./v86/v86.wasm",
        bios: "./v86/seabios.bin",
        vga_bios: "./v86/vgabios.bin",
        cdrom: "./v86/image.iso",
        initial_state: "./v86/initial-state.bin.zst",
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

document.getElementById("save").onclick = async function () {
    shell.downloadState()
}
