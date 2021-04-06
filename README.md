# fivem-nui-react-lib

A (very opinionated) set of tools for using FiveM NUI events in React

# usage

### install

`npm install --save fivem-nui-react-lib`

Use Provider
```js
import { NuiServiceProvider } from 'fivem-nui-react-lib';

function App() {
  return <NuiServiceProvider resource="my-resource-name">
    <div>This is my app</div>
  </NuiServiceProvider>
}
```

### useNuiEvent

This library receives the following schema on NUI events
```js
{
  app: 'app-name', // can be always the same or change to differenciate events better on the UI
  method: 'method-name', // the actual event name which is sent to NUI
  data: 'response' // the response which will be handled from the UI
}
```

Receive events from client and set your state
```js
// UI
import { useNuiEvent } from 'fivem-nui-react-lib';

function MyComponent() {
  const [myState, setMyState] = useState(false);
  useNuiEvent('app-name', 'method-name', setMyState);
}

// CLIENT
sendNuiMessage(JSON.stringify({
  app: 'app-name',
  method: 'method-name',
  data: true, // myState will be set as true in this example
}));
```
### useNuiRequest

Send requests to client
```js
// UI
import { useNuiRequest } from 'fivem-nui-react-lib';

function MyComponent() {
  const { send } = useNuiRequest();
  send('method-name', { myArgument: 'isAwesome' });
}

// CLIENT
RegisterNuiCallbackType(`__cfx_nui:myEvent`);
on(`__cfx_nui:myEvent`, (data, cb) => {
  // Use the arguments
  emitNet('myEvent', { input: data.myArgument });
  // Callback to prevent errors
  cb();
});
```

### useNuiEventCallback

Make a callback to "myEvent" by sending back "myEventSuccess" or "myEventError" from the client
```js
// UI
import { useNuiEventCallback } from 'fivem-nui-react-lib'

function MyComponent() {
  const [myState, setMyState] = useState(null);
  const [error, setError] = useState(null);
  const [fetchMyMethod, { loading }] = useNuiEventCallback('app-name', 'myEvent', setMyState, setError);

  useEffect(() => {
    fetchMyMethod({ argument: 1 });
  }, [fetchMyMethod])
}

// CLIENT
RegisterNuiCallbackType(`__cfx_nui:myEvent`);
on(`__cfx_nui:myEvent`, (data, cb) => {
  // emit some event to the server:
  emitNet('myEvent', { input: data });
  // callback so you prevent errors
  cb();
});

// ... on success
sendNuiMessage(JSON.stringify({
  app: 'app-name',
  method: 'myEventSuccess',
  data: true,
}))

// ... on error
sendNuiMessage(JSON.stringify({
  app: 'app-name',
  method: 'myEventError',
  data: true,
}))
```

The example above will request myEvent to the client and be in loading state until client sends back either myEventSuccess or myEventError.
After one of those are received, the handlers will be executed (setMyState if success, setError if errored).
If no event is received after the timeout time, it will throw as timeout error.

# contributions

Feel free to contribute and/or suggest changes.

# license

fivem-nui-react-lib - A set of tools for using FiveM NUI events in React

Copyright (C) 2021  J Francisco Rader <franciscorader@gmail.com> (kidz)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
