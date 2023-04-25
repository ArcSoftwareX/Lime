import { map } from "nanostores";
import { Tab } from "../lib/interfaces";
import { generateId } from "../lib/utils";

export const appDataStore = map<{ collections: Map<String, { name: string, tabs: Tab[] }>, environment: Map<string, string> }>({
    collections: new Map(),
    environment: new Map()
})

export const createCollection = async () => {
    appDataStore.setKey('collections', appDataStore.get().collections.set(await generateId(), { name: 'New Collection', tabs: [] }))
}

// export const createTab = async (collectionId: string) => {
//     const newVal = appDataStore.get().collections
//     newVal.get(collectionId)?.tabs.push()
//     appDataStore.setKey('collections', newVal)
// }