
const { interval, timer, Subscription } = require('rxjs')

const { take, tap, map, concatAll} = require('rxjs/operators')
/*
const subscription = interval(300)
    .pipe(
        take(1),
        map(_ => interval(500)),
        concatAll()
        )
    .subscribe(console.log)
*/

const obs$ = timer(3000, 500)

const subscription1 = obs$.subscribe(num => {
    console.log(`#1 ${num}`)
})

const subscription2 = obs$.subscribe(num => {
    console.log(`#2 ${num}`)
})

//subscription1.add(subscription2)

const sub = new Subscription()
sub.add(subscription1)
sub.add(subscription2)

setTimeout(() => {
    sub.unsubscribe()
}, 10000)

