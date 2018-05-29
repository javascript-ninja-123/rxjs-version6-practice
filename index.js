const {Observable,of,from,empty,interval,merge,combineLatest,zip }  = require('rxjs');
const {switchMap,map,mapTo,take,filter,skip,concat,startWith,withLatestFrom,scan,buffer,bufferCount,delay,delayWhen,retry,retryWhen}  = require('rxjs/operators');
const axios  = require('axios');


const fetch = async url => {
  const {data} = await axios.get(url)
  return data;
}

const a = Observable.create(observer => {
  observer.next('22')
})

const x = y => y;
console.log('start')
a.subscribe(x => console.log(x))
console.log('end')

//generator
function* bar() {
  console.log('hello');
  yield 42;
  yield 100;
  yield 200;
}

const iterator = bar();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);



const y = Observable.create(async observer => {
  try{
    const s = await fetch('https://jsonplaceholder.typicode.com/posts')
    observer.next(s)
    observer.next('break=======')
    const a = await fetch('https://jsonplaceholder.typicode.com/users')
    observer.next(a)
    observer.complete();
  }
  catch(err){
    observer.error(err)
  }
})

// y.subscribe(
//   x => console.log(x),
//   error => console.log(error.message),
//   () => console.log('complete')
// )




const wxy = of([1,2,3,4,5]);


wxy.subscribe(x => console.log(x))


const array = from([1,2,3,4,5,6]);


array.subscribe(x => console.log(x))



function* man(){
  yield 10;
  yield 20;
  yield 'I love you';
}


const w = from(man())

w.subscribe(a => console.log(a))

empty().subscribe(
  x => console.log(x),
  error => console.log(error.message),
  () => console.log('complete')
)




const foo = interval(1000);







// foo.subscribe(x => console.log(x))

// const subscribe = observer => {
//  const id = setInterval(() => {
//    observer.next(109);
//  }, 1000)
//  return function unsubscribe(){
//    clearInterval(id);
//  }
// }


const m = Observable.create(observer => {
 const id = setInterval(() => {
   observer.next(109);
 }, 1000)
 return function unsubscribe(){
   clearInterval(id);
 }
})



// const subscription = m.subscribe({
//   next(a){
//     console.log(a)
//   },
//   err(err){
//     console.log(err)
//   },
//   complete(){
//     console.log('done')
//   }
// });
// setTimeout(() => {
//   subscription.unsubscribe();
// },5000)



const last = Observable.create(observer => {
  try{
    var i = 0;
    const a = setInterval(async () => {
      i++;
      const b = await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
      observer.next(b)
    },1000)

    return function unsubscribe(){
      clearInterval(a)
    }
  }
  catch(err){
    observer.error(err)
  }
})



// const subscription2 = last.subscribe({
//   next(x){console.log(x)}
// })
//
// setTimeout(() => {
//   subscription2.unsubscribe();
// },5000)


console.log('=================')
const foos = interval(1000);


// const multiply = num => () => {
//
//   return Observable.create(observer => {
//     source.subscribe(
//       x => observer.next(x * num),
//       err => observer.error(err),
//       () => observer.complete('done')
//     )
//   })
// }


function calculate(transformationFn){
  const source = this;
  return Observable.create(observer => {
    source.subscribe(
      x => observer.next(transformationFn(x)),
      err => observer.error(err),
      () => observer.complete('done')
    )
  })
}



Observable.prototype.calculate = calculate;
const add = x => x + 1;
// const bar = foos.calculate(x => x + 10).pipe(
//   skip(5),
//   take(5),
//   map(add),
//   filter(x => x !== 12)
// )

// bar.subscribe(
//   x => console.log(x),
//   err => console.log(err),
//   () => console.log('done')
// )





const man2 = interval(500).pipe(take(5))
const man3 = from([5,6,7,8,9])



//
// man2.pipe(startWith(9,8,7,6)).subscribe(
//   x => console.log(x),
//   err => console.log(err),
//   () => console.log('done')
// )



const example1 = interval(500).pipe(take(5))
const example2 = interval(400).pipe(take(4));



const examplemerged = merge(
  example1,
  example2
)
// console.log('=========')
// examplemerged.subscribe(
//   x => console.log(x),
//    err => console.log(err),
//    () => console.log('done')
// )

console.log('=============')
const combined = combineLatest(
  example1,
  example2,
  (x,y) => x + y
)
//
// combined.subscribe(
//   x => console.log(x),
//    err => console.log(err),
//    () => console.log('done')
// )
console.log('===========================zip')
const zippedman = zip(
  example1,
  example2,
  (x,y) => x + y
)

// zippedman.subscribe(
//   x => console.log(x),
//    err => console.log(err),
//    () => console.log('done')
// )



console.log('=====zip pracitce====');


// const t = of('h','e','l','l','o');
// const sy = interval(500).pipe(take(5));
//
//
// const zippedY = zip(t,sy,(x,y) => x);
//
//
// // zippedY.subscribe(
// //   x => console.log(x),
// //    err => console.log(err),
// //    () => console.log('done')
// // )
//
// zippedY.pipe(scan((acc,value) => acc+value,'c'))
// .subscribe(
//    x => console.log(x),
//    err => console.log(err),
//    () => console.log('done')
// )
//
//
//
// constructor(props){
// 	super(props);
// 	this.state = {};
// }



const syncOf = of('h','e','l','l','o');
const asyncInterval = interval(300).pipe(take(5))
const scanFn = scan((acc,val) => acc+val,'!');


const zipppedFile =zip(
  syncOf,
  asyncInterval,
  (x,y) => x
).pipe(bufferCount(2))

//
// zipppedFile.subscribe(
// x => console.log(x),
//  err => console.log(err),
//  () => console.log('done')
// )


// const mea = interval(500).pipe(take(5),delay(1400));
//
//
// mea.subscribe(
//    x => console.log(x),
//    err => console.log(err),
//   () => console.log('done')
// )


const manMan = of('a','b','c','d','e',2);
const manManInterval = interval(500);
const zippedMan = zip(
  manMan,
  manManInterval,
  (x,y) => x
)

zippedMan.pipe(
  map(x => x.toUpperCase()),
  // retryWhen(errorObs => errorObs.pipe(delay(1000))),
  retry(1)
)
.subscribe(
      x => console.log(x),
      err => console.log(err),
    () => console.log('done')
)
