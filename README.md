# CachetHQ Status

> CachetHQ - an open source status page system, for everyone.  
> -- [cachethq.io](https://cachethq.io/)

`CachetStatus` uses CachetHQ API to get a list of system components and their
statuses.

You decide what to do with received information. On the demo page you could
find an example of a nice looking popover window with all GoHiring APIs and their current statuses.

`CachetStatus` does not have any external dependency, so you could use it with your favorite framework or as a standalone library.

## Usage

`CachetStatus` constructor received two parameters:

  - CachetHQ site base URL,
  - callback function that will be called when a response from CachetHQ API got received.

The callback function gets an array of objects where each object represents one system component and its status.

Example:

```javascript
var callback = function (components) {
  console.log(components);
};

new CachetStatus('https://status.gohiring.com', callback);
```  

## Credits

[CachetHQ](https://cachethq.io/) is awesome! You should try it when you need a status page.

## Copyright information

Copyright (c) 2015 [GoHiring GmbH](http://www.gohiring.com)
