const { of, interval } = require('rxjs');
const { switchMap, switchAll, map } = require('rxjs/operators');

const switched = of(1, 2, 3).pipe(switchMap(x => [x, x ** 2, x ** 3]));
//const switched = of(1, 2, 3).pipe(map(x => interval(500)),switchAll());
switched.subscribe(x => console.log(x));