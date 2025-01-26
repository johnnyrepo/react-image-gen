# React 19 + Vite + Node.JS + Tailwind 4.0 + AI Image Generator app

## AI Image Generator
Relies on the API provided by https://ai-girl.site/ and available under:<br>
https://ai-girl.site/api/workerai

To make a request one needs to send a POST request with a prompt data of type 'application/json', like:<br>
<code>
{prompt: "a cat in a hat"}
</code>

## Backend (Node.JS server)
Relies on Express.js

### Run
1. Navigate under <code>backend</code> folder
2. Type in a terminal: <code>npm run dev</code>
3. Server runs on port <code>3000</code>

### API
* http://localhost:3000/signup<br>
POST request of type <b>'application/json'</b><br>
<code>
{
    "email": "test3@example.com",
    "password": "test123"
}
</code>

* http://localhost:3000/login<br>
POST request of type <b>'application/json'</b><br>
<code>
{
    "email": "test3@example.com",
    "password": "test123"
}
</code>

* http://localhost:3000/generate-image<br>
POST request of type <b>'application/json'</b> with an auth token <b>'Authorization: Bearer {auth-token}'</b><br>
<code>
{
    "prompt": "A cat in a hat with a bat",
    "options": {
        "format": "jpg"
    }
}
</code>

## Frontend (Vite + Node.JS + Tailwind 4.0)
A React app with signup / login forms and an image generation form

### Run
1. In the root folder of the project type the following in a terminal: <code>npm run dev</code>
2. Visit following in a browser: http://localhost:5173/