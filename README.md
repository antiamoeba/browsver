# browsver
##### Run Express in your browser

Your browser acts like a server using socket.io. Run `node index.js`, then connect to `http://localhost:3000/create`. 

There, you can write your vanilla Express code, and hit *start*. A code should appear in the box next to the button. Now your site is accessible to anyone at `http://localhost:3000/view/:code` (replace :code with the code).

#### To Do

* Unsketchify the request forwarding process
* Add file handling support
* Add some sort of database support