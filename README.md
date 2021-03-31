# fivem-nui-react-lib

A set of tools NUI events in react

# usage

`npm install --save fivem-nui-react-lib`

Use Service
```js
import { useNuiService } from 'fivem-nui-react-lib'

function App() {
  // Call this in your top level app component
  // This is needed to use all the other hooks
  useNuiService();
}
```

Receive events from client and set your state
```js
import { useNuiEvent } from 'fivem-nui-react-lib'

function MyComponent() {
  const [myState, setMyState] = useState(null);
  useNuiEvent('MYAPP', 'MyMethod', setMyState);
}
```

Make callbacks for "myEvent" by sending back "myEventSuccess" or "myEventError" from the client
```js
import { useNuiEvent } from 'fivem-nui-react-lib'

function MyComponent() {
  const [myState, setMyState] = useState(null);
  const [error, setError] = useState(null);
  const [fetchMyMethod, { loading }] = useNuiEventCallback('MYAPP', 'myEvent', setMyState, setError);

  useEffect(() => {
    fetchMyMethod({ argument: 1 });
  }, [fetchMyMethod])
}
```

The example above will be in loading state until client sends back either myEventSuccess or myEventError.
After one of those are received, the handlers will be executed (setMyState if success, setError if errored).
If no event is received after the timeout time, it will throw as timeout error.

# license

fivem-nui-react-lib - A set of tools to handle NUI events in react

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
