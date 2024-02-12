import LinuxBrowserShell from "linux-browser-shell"

const shell = new LinuxBrowserShell(
    {
        wasm: "./v86/v86.wasm",
        bios: "./v86/seabios.bin",
        vga_bios: "./v86/vgabios.bin",
        cdrom: "./v86/image.iso",
        //initial_state: "./v86/initial-state.bin.zst",
    },
    document.getElementById("screen"),
    document.getElementById("serial"),
)
shell.boot()

document.getElementById("save").onclick = async function () {
    shell.downloadState()
}
