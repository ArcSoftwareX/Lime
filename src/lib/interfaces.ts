import { invoke } from "@tauri-apps/api/tauri"
import { Response } from "@tauri-apps/api/http"

export const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'WS', 'WSS']

export interface TabsData {
    tabs: Map<string, Tab>,
    current: string
}

export interface Tab {
    method: string,
    url: string,
    valid: boolean,
    name: string,
    response: Response<unknown> | null,
    urlProcessed?: {
        scheme: string,
        username: string | null,
        password: string | null,
        host: string | null,
        port: number,
        path: string,
        query: string | null,
            ragment: string | null
    }
    isLoading: boolean
}

export const newTab = (): Tab => {
    return {
        method: 'GET',
        url: '',
        valid: false,
        name: 'New Tab',
        response: null,
        isLoading: false
    }
}