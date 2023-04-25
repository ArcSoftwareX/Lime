import { invoke } from "@tauri-apps/api";

export function isValidUrl(url :string) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

export async function generateId(): Promise<string> {
    return await invoke('generate_id')
}