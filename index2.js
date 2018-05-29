const { Observable, Subject, ReplaySubject, from, of, range,fromEvent,interval,empty,defer } = rxjs;
const { map, filter, switchMap,mergeMap,concatMap,take,delay,groupBy,toArray,skip } = rxjs.operators;

const subscribe = {
  next: function(r){console.log(r)},
  error:function(error){console.log(error)},
  complete:function(){console.log('complete')}
}

const fetchCall = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

const clickObservable = fromEvent(document,'click')


clickObservable
.pipe(
  concatMap(() => defer(() => fetchCall('https://jsonplaceholder.typicode.com/users'))),
  concatMap(data => defer(() => fetchCall(`https://jsonplaceholder.typicode.com/posts/${data.length}`)),
  (outer,{userId}) => userId
  ),
  concatMap(data => defer(() => fetchCall(`https://jsonplaceholder.typicode.com/posts/${data}`)))
)
.subscribe(subscribe)

//
// const clickObservable = fromEvent(document,'click')
// clickObservable
// .pipe(
//   mergeMap(x => interval(500).pipe(map(x => `hello,${x}`))),
//   map(x => `1111, ${x}`)
// )
//
//
//
// clickObservable
// .pipe(
//   concatMap(
//     x => interval(500).pipe(take(5))
//   ),
//   map(x => `hello,${x}`)
// )
//
//
//
//
// // clickObservable
// // .pipe(
// //   switchMap(() => from(fetchCall())),
// //   map(({title}) => title)
// // )
// // .pipe(
// //   mergeMap(() => fetchCall(),(outer,{title}) => title,2),
// // )
// // .pipe(
// //   concatMap(() => fetchCall(),(outer,{title}) => title),
// // )
// // .subscribe(subscribe)
//
//
// const soucreObservable  = interval(500).pipe(take(5),delay(1000))
//
// const resultObs = soucreObservable
// .pipe(
//   mergeMap(x => {
//     if(x % 2 === 0){
//       return of(x * 10)
//     }else{
//       return empty()
//     }
//   })
// )
//
// const language = [
//   {code: 'en-us', value: '-TEST-'},
//   {code: 'en-us', value: 'hello'},
//   {code: 'es', value: '-TEST-'},
//   {code: 'en-us', value: 'amazing'},
//   {code: 'pt-br', value: '-TEST-'},
//   {code: 'pt-br', value: 'olá'},
//   {code: 'es', value: 'hola'},
//   {code: 'es', value: 'mundo'},
//   {code: 'en-us', value: 'world'},
//   {code: 'pt-br', value: 'mundo'},
//   {code: 'es', value: 'asombroso'},
//   {code: 'pt-br', value: 'maravilhoso'}
// ];
//
// const newPromise = new Promise(resolve => {
//   console.log('promise')
//   resolve(language);
// })
//
// from(language)
// .pipe(
//   groupBy(obj => obj.code),
//   mergeMap(innerObs => {
//     return innerObs
//     .pipe(
//       skip(1),
//       map(obj => obj.value),
//       toArray()
//     )
//   })
// )
// .subscribe(subscribe)
//
// const groupBy2 = Observable.create(async observer => {
//   console.log('lazy')
//   const res = await fetch('https://jsonplaceholder.typicode.com/albums')
//   const result = await res.json();
//   return from(result)
//   .pipe(
//     groupBy(obj => obj.userId),
//     mergeMap(innerObs => {
//       return innerObs
//       .pipe(
//         toArray()
//       )
//     })
//   )
//   .subscribe(
//     (x) => observer.next(x),
//     error => observer.error(error),
//     () => observer.complete('done')
//   )
// })
//
// // fromEvent(document,'click')
// // .pipe(
// //   switchMap(() => defer(() => from(newPromise))
// // ))
// // .subscribe(subscribe)
//
// // fetchCall('https://jsonplaceholder.typicode.com/albums')
// // .then(data => {
// //   from(data)
// //   .pipe(
// //     groupBy(obj => obj.userId),
// //     mergeMap(innerObs => {
// //       return innerObs
// //       .pipe(
// //         toArray()
// //       )
// //     })
// //   )
// //   .subscribe(subscribe)
// // })
//
//
//
// fromEvent(document,'click')
// .pipe(
//   switchMap(() => defer(() => groupBy2))
// )
// .subscribe(subscribe)
//
//
//
// // from(language)
// // .subscribe(subscribe)
// //
// // from([1,2,3,4,5])
// // .subscribe(subscribe)
//
//
// // .pipe(
// //   groupBy(obj => obj.userId),
// //   mergeMap(innerObs => {
// //     return innerObs
// //     .pipe(
// //       toArray()
// //     )
// //   })
// // )
// // .subscribe(subscribe)
