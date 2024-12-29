---
title: Optimizing Database Queries for High Performance
description: Learn how to optimize your database queries for maximum performance and reduced response times.
slug: building-restful-apis-node-express
tags: ["Node.js", "Express", "RESTful API", "backend"]
readingTime: 11
published: false
publishedAt: 2023/11/2
updatedAt: 2023/11/2
---

# Authorization

REST APIs use authorization to ensure that a client has secure access only to the resources permitted by their roles. If
you are building or integrating with a 3rd party API, you can choose between Basic Auth, Bearer Tokens, and OAuth2.0.

Auth details can be added to a header, body, or as parameters to a request. However, if you enter your auth details in
the Authorization Tab, Hoppscotch will automatically modify the relevant parts of the request based on your
chosen `Auth` type. Storing Auth Credentials or Bearer Tokens as environment variables, lets you re-use these more
safely and efficiently.

## Basic Auth

If the API supports basic Auth, you will have to add a verified username and password to your request. In the
authorization tab, select basic auth and add your credentials.

## Bearer Tokens

Bearer tokens allow for request authentication using an access key, such as an opaque string or JWT. In the
Authorization Tab, select Basic Auth and add your token, or for added security store it in a variable and reference it
by name.

Hoppscotch will append the API key value to the text 'Bearer' and add it to the request authorization header.

```bash
Bearer <Your API key>
```

## OAuth 2.0

In this Authentication Model, you first retrieve an access token for the API and then use that token to authenticate
future requests.

An example OAuth 2.0 flow could run as follows:

<div class="text-red-400 p-4 mb-4">
  This is HTML inside markdown that has a class of note
</div>

[//]: # "![my image](/img/image.jpg)"

::InfoBox
#info-box
This is a vue component inside markdown using slots
::

::hero
Default slot text

#description
This will be rendered inside the `description` slot.
::

::the-title
A [rich text](/) will be **rendered** by the component.
::

::alert{type="info"}
<span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
::

![my image](/img/image.jpg)

::alert{:type="type"}
Your warning
::

## ::icon-card

icon: IconNuxt
description: Harness the full power of Nuxt and the Nuxt ecosystem.
title: Nuxt Architecture.

---

::

Hello [World]{style="color: green;" .custom-class #custom-id}!

Attributes work on:

- [link](#attributes){style="background-color: pink;"}, `code`{style="color: cyan;"},
- _italic_{style="background-color: yellow; color:black;"} and **bold**{style="background-color: lightgreen;"} texts.

> Block quote

```js
export default () => {
  console.log("Code block");
};
```

`code inline`.

`const codeInline: string = 'highlighted code inline'`

Divider under.

---

Divider above.
