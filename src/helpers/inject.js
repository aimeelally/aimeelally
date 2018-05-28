export const ERR_INVALID_CONTEXT = 'inject(context, $inject, args) context is not a valid object';
export const ERR_INVALID_INJECT = 'inject(context, $inject, args) $inject is not a valid array';
export const ERR_INVALID_ARGS = 'inject(context, $inject, args) args is not a valid arguments object';

function isArgumentsObject(args) {
  return typeof args === 'object'
    && args !== null
    && args.hasOwnProperty('length')
    && args.hasOwnProperty('callee');
}

/*
  @FUNCTION inject(context, $inject, args)

  Bind angular dependencies from static $inject arrays
  as properties of a class

  Example usage:

  class MyClass {
    static $inject = [
      '$rootScope',
      '$location'
    ];

    constructor() {
      inject(this, MyClass.$inject, arguments);
    }
  }
*/

export default function inject(context, $inject, args) {
  let name;

  if(typeof context !== 'object' || context === null || Array.isArray(context)) {
    throw ERR_INVALID_CONTEXT;
  }

  if(!Array.isArray($inject)) {
    throw ERR_INVALID_INJECT;
  }

  if(!args) {
    throw ERR_INVALID_ARGS;
  }

  // is first elelemt an arguments object
  if(args.length === 1 && isArgumentsObject(args[0])) {
    args = args[0];
  }

  if(!isArgumentsObject(args)) {
    throw ERR_INVALID_ARGS;
  }

  $inject.forEach((key, index) => context[key] = args[index]);
}

/*
  @FUNCTION merge(Array Parent.$inject, Array, Array, ...)

  Proper way of extending a class, which is using inject()
  to auto bind it's properties to the class

  class ExtendedMyClass extends MyClass {
    static $inject = merge(MyClass.$inject, [
      '$window',
      '$document'
    ]);

    constructor() {
      super(arguments);
      inject(this, ExtendedMyClass.$inject, arguments);
    }
  }
*/

export function merge() {
  let merged = [];
  for(let i in arguments) {
    if(!Array.isArray(arguments[i])) {
      throw `merge() argument ${i}: ${JSON.stringify(arguments[i])} is not an array`;
    }

    merged = merged.concat(arguments[i]);
  }

  return merged.filter((item, index) => merged.indexOf(item) === index);
};
