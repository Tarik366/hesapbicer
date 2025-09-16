import type { PageLoad } from "./$types";
import item from "./default.json";
export const prerender = true;
export const load: PageLoad = async ({ fetch }) => {


    let gridData: Map<string, number> = new Map<string, number>();

    for (const [key, value] of Object.entries(item)) {
        gridData.set(key, value as number);
    }

    return {
        post: {
            gridData: gridData
        }
    };
}