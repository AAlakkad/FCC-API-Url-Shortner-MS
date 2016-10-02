# Url Shortner

[FreeCodeCamp](https://freecodecamp.com) - API Project


A microservice that take url and convert it to short url, or take short url and redirect it to the original url.

Example 1:
Go to [http://aalakkad-api-url-shortner.herokuapp.com/4](http://aalakkad-api-url-shortner.herokuapp.com/4) and you short be redirected to the original site which is [http://freecodecamp.com](http://freecodecamp.com).

Example 2:
Visting [https://aalakkad-api-url-shortner.herokuapp.com/new/http://freecodecamp.com](https://aalakkad-api-url-shortner.herokuapp.com/new/http://freecodecamp.com) will shorten the url and response with:

```json
{
	original_url: "http://freecodecamp.com",
	short_url: "http://aalakkad-api-url-shortner.herokuapp.com/4"
}
```