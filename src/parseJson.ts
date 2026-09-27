/** Parse a JSON file, removing comments. */
export default function parseJson<T>(jsonContents: object): T {
    for (const key in jsonContents) {
        if (key.startsWith('//')) {
            delete jsonContents[key as keyof typeof jsonContents]
        }
    }
    return jsonContents as T
}
