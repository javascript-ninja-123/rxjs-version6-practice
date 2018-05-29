const {Observable,of,from,empty,interval,merge,combineLatest,zip,Subject,BehaviorSubject,ReplaySubject,defer }  = require('rxjs');
const {switchMap,map,mapTo,take,filter,skip,concat,startWith,withLatestFrom,scan,buffer,bufferCount,delay,delayWhen,retry,retryWhen,publish,tap,concatMap}  = require('rxjs/operators');
const axios  = require('axios');


const fetchCall = async (url) => {
  const {data} = await axios.get(url)
  return data
}

const subscribe = {
  next: function(r){console.log(JSON.stringify(r,undefined,2))},
  error:function(error){console.log(error)},
  complete:function(){console.log('complete')}
}
const subscribeA = {
  next: function(r){console.log(`A ${r}`)},
  error:function(error){console.log(error)},
  complete:function(){console.log('complete')}
}
const subscribeB = {
  next: function(r){console.log(`B ${r}`)},
  error:function(error){console.log(error)},
  complete:function(){console.log('complete')}
}

const clock = interval(500).pipe(
  take(5),
  publish()
)

// clock.subscribe(subscribeA)
//
// setTimeout(() => {
//   clock.subscribe(subscribeB)
// },2000)
//
// clock.connect();
//


// const subscribeA = {
//   next: function(r){console.log(`A next ${r}`)},
//   error:function(error){console.log(error)},
//   complete:function(){console.log('complete')}
// }
//
// const subscribeB = {
//   next: function(r){console.log(`B next ${r}`)},
//   error:function(error){console.log(error)},
//   complete:function(){console.log('complete')}
// }
//
//
// const subject = new ReplaySubject(Number.POSITIVE_INFINITY);
//
//
// subject.subscribe(subscribeA)
//
// subject.next(1);
// subject.next(2);
// subject.next(3);
//
// setTimeout(() => {
//   subject.subscribe(subscribeB)
// },1000)
