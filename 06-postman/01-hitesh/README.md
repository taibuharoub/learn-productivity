# What is Postman and why everyone use it ?

## Variables

You can add your own variables:

- Select what you want to add, then click on `set as variable`

## Scripts

### 1. Pre-Request Script (Pre-req)

This is all the scripts that run before you send your request

Note:

To access the set variables:

1. `$` sign is reserved for the postman variables(the ones that come with postman itself) e.g `"{{$randomEmail}}"`
2. For your own variables just use the variable names you used to to set them up without the `$` sign e.g `"{{randomRole}}"`

## Generate Tests

Click on the collection and the select `generate tests`

Resources:

[Postman Learning Center](https://learning.postman.com/)
