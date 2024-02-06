declare class LinuxBrowserShell {
    private mutex;
    private mutex2;
    private emulator;
    private config;
    private serialDiv?;
    private prompt;
    constructor(paths: {
        wasm: string;
        bios: string;
        vga_bios: string;
        cdrom: string;
        initial_state?: string;
    }, screen?: HTMLDivElement, serial?: HTMLDivElement);
    private appendToSerialDiv;
    send(chars: string): Promise<void>;
    wait_for(chars: string): Promise<void>;
    git(command: string): Promise<string>;
    cd(path: string): Promise<void>;
    run(cmd: string): Promise<string>;
    script(cmds: string[]): Promise<void>;
    run_unsafe(cmd: string, skip_one_prompt?: boolean, echo_on?: boolean): Promise<string>;
    boot(): Promise<void>;
    type(text: string): void;
    putFile(path: string, lines: string[]): Promise<void>;
    setKeyboardActive(active: boolean): void;
}
export default LinuxBrowserShell;
