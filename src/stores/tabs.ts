import { map } from "nanostores";
import { TabsData } from "../lib/interfaces";
import { newTab, Tab } from "../lib/interfaces";
import { generateId, isValidUrl } from "../lib/utils";
import { invoke } from "@tauri-apps/api/tauri";
import { Client, HttpVerb, ResponseType, getClient, Response, fetch } from "@tauri-apps/api/http";

let client: Client | null = null;

export const tabsStore = map<TabsData>({
    current: '',
    tabs: new Map<string, Tab>()
})

export const closeTab = async (id: string): Promise<void> => {
    let newVal = new Map(tabsStore.get().tabs)
    newVal.delete(id)
    tabsStore.setKey('tabs', newVal)
    selectLastTab()
}

export const createTab = async (): Promise<void> => {
    tabsStore.setKey('tabs', tabsStore.get().tabs.set(await generateId(), newTab()))
    selectLastTab()
}

export const setCurrentTab = (id: string): void => {
    tabsStore.setKey('current', id)
}

export const updateTabUrl = (id: string, url: string): void => {
    invoke('parse_url', { url: url.trim() }).then(res => {
        res = JSON.parse(res as string)
        let newVal = new Map(tabsStore.get().tabs)
        newVal.get(id)!.url = url
        newVal.get(id)!.urlProcessed = res as any
        newVal.get(id)!.valid = isValidUrl(url)
        tabsStore.setKey('tabs', newVal)
    })
}

export const updateTabResponse = (id: string, response: Response<unknown> | null): void => {
    let newVal = new Map(tabsStore.get().tabs)
    newVal.get(id)!.response = response
    newVal.get(id)!.isLoading = false
    tabsStore.setKey('tabs', newVal)
}

export const updateTabMethod = (id: string, method: string): void => {
    let newVal = new Map(tabsStore.get().tabs)
    newVal.get(id)!.method = method
    tabsStore.setKey('tabs', newVal)
}

export const initClient = async () => {
    client = await getClient()
}

export const makeRequest = async (id: string) => {
    let tab = tabsStore.get().tabs.get(id)!
    if (tab.isLoading) return;
    let newVal = new Map(tabsStore.get().tabs)
    newVal.get(id)!.isLoading = true
    tabsStore.setKey('tabs', newVal)
    let resp = (await fetch(tab.url, { method: tab.method as HttpVerb, responseType: ResponseType.Text }))
    updateTabResponse(id, resp ? resp : null)
}

const selectLastTab = (): void => {
    let keys = Array.from(tabsStore.get().tabs.keys());
    tabsStore.setKey('current', keys[keys.length - 1])
}