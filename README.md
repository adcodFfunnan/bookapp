<h2>Heroku</h2>
<a href="https://adnanbookapp.herokuapp.com">https://adnanbookapp.herokuapp.com/books</a><br/>

<h2>About</h2>
<p>
It is a web application in which the user can keep records of books and writers. 
Only logged-in users can add and modify book and writer information. 
Guests (not logged-in users) can view the data. It is possible to connect books with the writers.
</p>

<h2>Cloning and Running the app in Local</h2>
<p>Clone the project into local</p>

<pre>
	<code class="language-bash">git clone https://github.com/adcodFfunnan/bookapp.git</code>
</pre>

<p>next, navigate to the client folder and install dependencies</p>
<pre>
	<code class="language-bash"> cd bookapp/client</code>
    <code class="language-bash">     npm install</code>
</pre>

<p>next, navigate to the server folder and install dependencies</p>
<pre>
	<code class="language-bash"> cd bookapp/server</code>
    <code class="language-bash">     npm install</code>
</pre>

<p>next, configure your MySQL server according to .env file in the server folder </p>
<p>it is not necessary to manually create a database and tables, it will be created in the next step</p>

<p>next, navigate to the server folder and type</p>
<pre>
	<code class="language-bash"> npm run config</code>
</pre>
<p>this command will create a database and tables on your server</p>

<p>if all went well, go to the client and the server and type</p>
<pre>
	<code class="language-bash"> npm start</code>
</pre>