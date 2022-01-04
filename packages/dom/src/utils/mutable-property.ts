import { emitter, Property, Time } from '@frp-ts/core'

export interface MutableProperty<Value> extends Property<Value> {
	readonly next: (time: Time, value: Value) => void
}

export const newMutableProperty = <Value>(initial: Value): MutableProperty<Value> => {
	let currentValue = initial
	const e = emitter.newEmitter()
	return {
		get: () => currentValue,
		subscribe: e.subscribe,
		next: (time, value) => {
			if (value !== currentValue) {
				currentValue = value
				e.next(time)
			}
		},
	}
}
