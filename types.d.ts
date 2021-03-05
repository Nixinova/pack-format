export type packType = 'resource' | 'data'

export type formatResult = number | undefined

export type versionsResult = Record<'releases' | 'snapshots', Record<'min' | 'max', string>>
