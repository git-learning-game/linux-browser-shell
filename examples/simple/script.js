import LinuxBrowserShell from "linux-browser-shell"

let screenDiv = document.getElementById("screen")
const shell = new LinuxBrowserShell(
    {
        wasm: "./v86/v86.wasm",
        bios: "./v86/seabios.bin",
        vga_bios: "./v86/vgabios.bin",
        cdrom: "./v86/image.iso",
        initial_state: "./v86/initial-state.bin.zst",
    },
    screenDiv,
)
shell.boot()

document.getElementById("save").onclick = async function () {
    shell.downloadState()
}
