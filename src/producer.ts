import { newEmitter, Notifier } from './emitter'
import { Source } from './source'
import { Env } from './clock'

export interface Producer<A> extends Source<A> {
	readonly next: (a: A) => void
}

export const newProducer = (env: Env) => <A>(initial: A): Producer<A> => {
	let last = initial
	const e = newEmitter()
	const next = (a: A): void => {
		if (last !== a) {
			last = a
			e.notify(env.clock.now())
		}
	}
	const getter = () => last
	const notifier: Notifier = (listener) => e.subscribe(listener)
	return {
		next,
		getter,
		notifier,
	}
}
