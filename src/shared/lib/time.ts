import {TimeStamp} from "@/shared/lib/types.ts"

export async function delay(ms: TimeStamp = 2_000 as TimeStamp) {
    await new Promise(resolve => setTimeout(resolve, ms))
}